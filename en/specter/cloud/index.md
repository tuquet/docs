# Supabase Cloud Fleet & Multi-Tenant Control Plane

Managing large fleets of antidetect browser profiles across multiple physical workstations, virtual private servers (VPS), and remote team members introduces severe operational risks: profile cookie overwrites, race conditions, and credentials leakage.

**Specter Cloud** is an enterprise-grade multi-tenant synchronization and fleet management control plane powered by the [`tuquet-cloud`](https://github.com/tuquet/cloud) microservice, built upon **Supabase** and **PostgreSQL 15+** with strict Row-Level Security (RLS).

<HairlineFigure name="vault" />

---

## 1. Zero-Trust Multi-Tenant Isolation with Row Level Security (RLS)

Every database table, browser profile record, and telemetry metric in Specter Cloud is protected by PostgreSQL **Row-Level Security (RLS)** policies. 

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                SUPABASE POSTGRESQL 15+ ENGINE               │
 │                                                             │
 │   ┌───────────────────────┐       ┌───────────────────────┐ │
 │   │  Tenant Organization  │       │  Tenant Organization  │ │
 │   │        Alpha          │       │         Beta          │ │
 │   ├───────────────────────┤       ├───────────────────────┤ │
 │   │ 🔒 Profiles (1..N)    │       │ 🔒 Profiles (1..N)    │ │
 │   │ 🔒 Enrolled Devices   │       │ 🔒 Enrolled Devices   │ │
 │   │ 🔒 Automation Logs    │       │ 🔒 Automation Logs    │ │
 │   └───────────────────────┘       └───────────────────────┘ │
 │               ▲                               ▲             │
 │               │                               │             │
 │     [RLS Policy: Tenant A]          [RLS Policy: Tenant B]  │
 │               │                               │             │
 └───────────────┼───────────────────────────────┼─────────────┘
                 │                               │
        Workstation Node A              Workstation Node B
```

- **Cryptographic Tenant Isolation**: Workstations authenticate via signed JWT tokens carrying organization and device claims. No query can leak or read data belonging to another organization (`tenant_id = auth.jwt() ->> 'tenant_id'`).
- **Role-Based Access Control (RBAC)**: Distinguish between Team Admins (profile creation, proxy assignment) and Operator nodes (read-only lease checkout).

---

## 2. Central Schema: `runners.browsers` Database Model

The central table `runners.browsers` stores virtual antidetect profiles and hardware fingerprint specifications:

```sql
CREATE TABLE IF NOT EXISTS runners.browsers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    browser_type VARCHAR(64) NOT NULL DEFAULT 'chromium',
    engine_version VARCHAR(32) NOT NULL DEFAULT '148.0.7778.215',

    -- Deterministic C++ Native Fingerprint Specifications
    fingerprint_seed BIGINT NOT NULL DEFAULT floor(random() * 2147483647)::bigint,
    os_platform VARCHAR(32) NOT NULL DEFAULT 'windows',
    os_version VARCHAR(64) NOT NULL DEFAULT '10.0.0',
    browser_brand VARCHAR(64) NOT NULL DEFAULT 'Chrome',
    cpu_cores INT NOT NULL DEFAULT 8 CHECK (cpu_cores >= 1),
    ram_gb INT NOT NULL DEFAULT 16 CHECK (ram_gb >= 1),
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    locale TEXT NOT NULL DEFAULT 'vi-VN',
    accept_languages TEXT NOT NULL DEFAULT 'vi-VN,vi,en-US,en',

    -- Network, Proxy & WebRTC STUN Shielding
    proxy_id UUID REFERENCES runners.proxies(id) ON DELETE SET NULL,
    custom_proxy TEXT,
    webrtc_mode VARCHAR(32) NOT NULL DEFAULT 'proxy_shielded',

    -- Session Snapshot & Supabase Storage Synchronisation (.zip / .tar.zst)
    storage_path TEXT,
    storage_size_bytes BIGINT NOT NULL DEFAULT 0,
    storage_hash VARCHAR(64),
    cookies_count INT NOT NULL DEFAULT 0,
    last_synced_at TIMESTAMPTZ,

    -- Distributed Lease Lock & Execution State
    status VARCHAR(32) NOT NULL DEFAULT 'idle',
    locked_by_device_id UUID REFERENCES runners.devices(id) ON DELETE SET NULL,
    locked_at TIMESTAMPTZ,
    last_launched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    CONSTRAINT chk_runners_browsers_status CHECK (status IN ('idle', 'running', 'syncing', 'error'))
);
```

---

## 3. Distributed Profile Lease Locks

The primary failure mode in distributed browser automation is **concurrent profile execution**: two nodes opening the same profile simultaneously, triggering immediate security checkpoints and session invalidation on platforms like Google, Facebook, or Amazon.

Specter Cloud implements **Distributed Lease Locks** via atomic PostgreSQL RPC stored procedures:

```text
 Workstation A                     Cloud Control Plane              Workstation B
      │                                    │                              │
      │ ── 1. Acquire Lease (ID: 01) ────► │                              │
      │    Status: LEASE_GRANTED           │                              │
      │ ◄─ 2. Download Session Delta ───── │                              │
      │                                    │ ◄── 3. Acquire Lease ────────│
      │                                    │     Status: 409 LOCKED       │
      │                                    │ ──► 4. Lease Denied ────────►│
      │                                    │                              │
      │ ── 5. Release Lease + Delta ─────► │                              │
      │    Status: LEASE_RELEASED          │                              │
      │                                    │ ──► 6. Lock Available ──────►│
```

### Lease RPC Stored Procedures

```sql
-- Atomic Lease Acquisition
SELECT runners.acquire_browser(
    p_browser_id => 'c8a30d9e-5e74-4b52-b141-f76159c946e3'::uuid,
    p_device_id  => 'a0b1c2d3-e4f5-6789-0123-456789abcdef'::uuid
);

-- Atomic Lease Release & Session Snapshot Sync
SELECT runners.release_browser(
    p_browser_id        => 'c8a30d9e-5e74-4b52-b141-f76159c946e3'::uuid,
    p_device_id         => 'a0b1c2d3-e4f5-6789-0123-456789abcdef'::uuid,
    p_storage_path      => 'tenant-01/c8a30d9e.tar.zst',
    p_storage_size_bytes=> 14208512,
    p_storage_hash      => 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    p_cookies_count     => 42
);
```

---

## 4. Workstation Device Enrollment & Machine Identity

When onboarding a machine, Specter anchors identity in SSOT Pillar 1 (`~/.specter/system/`):

- `~/.specter/system/.machine_id`: Unique cryptographic hardware identifier generated from BIOS/UUID.
- `~/.specter/system/.identity.json`: Active cloud enrollment claims, tenant ID, and workstation name.
- `~/.specter/system/system.json`: Central cloud endpoint configuration and active environment.

```text
~/.specter/system/
├── .machine_id               # Cryptographic hardware signature
├── .identity.json            # Enrolled device credentials & JWT token
└── system.json               # Environment endpoint and tenant mappings
```

---

## 5. Master CLI Command Reference

### Workstation Authentication & Pairing

```bash
# Authenticate and enroll workstation with cloud endpoint
specter cloud login --url https://cloud.specter.dev --token <TENANT_ENROLLMENT_TOKEN>

# Custom workstation display name
specter cloud login --token <TOKEN> --name "Frankfurt-VPS-Worker-01"

# Verify active workstation enrollment and tenant status
specter cloud whoami

# Disconnect workstation from cloud and purge identity token
specter cloud logout
```

### Managing Cloud Profiles & Leases

```bash
# List all central cloud browser profiles available to your organization
specter browser profile cloud list

# Output cloud profiles list in raw JSON format
specter browser profile cloud list --json

# Acquire exclusive lease lock on a profile
specter browser profile cloud acquire "Facebook-Ad-VN"

# Release lease lock and sync cookies back to cloud
specter browser profile cloud release "Facebook-Ad-VN"
```

### System Configuration

```bash
# Display system and cloud configuration
specter cloud config --show

# Open system.json in default system editor
specter cloud config --edit
```

---

## 6. AI Agent Integration (MCP Protocol)

AI agents query enrollment identity and organization context via the native MCP tool **`specter_cloud_whoami`**:

### Tool Call

```json
{
  "name": "specter_cloud_whoami",
  "arguments": {}
}
```

### Response Schema

```json
{
  "authenticated": true,
  "device_id": "a0b1c2d3-e4f5-6789-0123-456789abcdef",
  "device_name": "Frankfurt-VPS-Worker-01",
  "tenant_id": "tenant-enterprise-alpha",
  "cloud_endpoint": "https://cloud.specter.dev",
  "status": "enrolled",
  "assigned_profiles_count": 8
}
```

