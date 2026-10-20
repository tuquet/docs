# Cloud Center & Enterprise Control Plane

The Tuquet platform operates on a **Single-Source, Dual-Platform Architecture**: a unified modern Vue 3 / Tuquet 5 control interface deployed concurrently as:
1. **Central Web Admin (Cloud)**: Distributed SaaS control plane for multi-tenant organizations, licensing, subscription billing, and fleet orchestration.
2. **Native Desktop Application (Tauri Shell)**: A lightweight native desktop client directly embedding this exact frontend code, bridging directly into local workstation runners, hardware-accelerated stealth browsers, and the local SSOT root (`~/.tuquet/`).

```text
┌────────────────────────────────────────────────────────────────────────┐
│             UNIFIED FRONTEND CONTROL PLANE (Vue 3 / Tuquet 5)           │
│                                                                        │
│   [Tenancy Hub]   [Automation Suite]   [Commerce & Wallet]   [System]  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌───────────────────────────────────┐       ┌───────────────────────────────────┐
│     TARGET A: CLOUD WEB ADMIN     │       │    TARGET B: TAURI DESKTOP APP    │
│     (Hosted SaaS Control Plane)   │       │    (Native Operator Workstation)  │
├───────────────────────────────────┤       ├───────────────────────────────────┤
│ • PostgreSQL 15+ & Row-Level Sec  │       │ • Rust Native Host Process        │
│ • Central Multi-Tenant RBAC       │       │ • Direct IPC to Local Runner CLI  │
│ • Subscription Plans & Billing    │       │ • Direct FS: ~/.tuquet/          │
│ • Global Fleet & Device Telemetry │       │ • Hardware Stealth Chromium C++   │
│ • OAuth & SSO Desktop Bridge      │       │ • Local SOCKS5 Mesh & Proxies     │
└─────────────────┬─────────────────┘       └─────────────────┬─────────────────┘
                  │                                           │
                  │   Desktop Bridge SSO (tuquet://auth)      │
                  └───────────────────►◄──────────────────────┘
```

---

## 1. Zero-Trust Multi-Tenant Architecture & RLS

Every tenant organization in Tuquet Cloud operates inside a cryptographically isolated silo protected by PostgreSQL **Row-Level Security (RLS)** and dynamic JWT claims.

### Security Guarantees
- **Tenant Cryptographic Boundary**: No query can read or write data across organizations (`tenant_id = auth.jwt() ->> 'tenant_id'`).
- **Dynamic Plugin Gating**: Access to sub-systems is gated per-tenant by active licenses:
  - `core-iam`: Multi-tenant organization identity and user RBAC.
  - `automa`: DAG workflow builder and batch execution logs.
  - `runners`: Device registry, remote workstation workers, and browser profile pools.
  - `commerce`: Storefront, marketplace templates, and orders.
  - `subscriptions`: Tier plans, credit wallets, and usage metering.

---

## 2. Route Specifications & Portal Capabilities

The frontend routing hierarchy is dynamically filtered at runtime based on the authenticated operator's permissions and installed plugins:

### A. Tenancy Management (`/tenants`)
- **Route**: `/tenants` (`TenantsRoot`)
- **Required Plugin**: `core-iam` | **Authority**: `superadmin`, `tenants:read`
- **Capabilities**:
  - Organization catalog, workspace quotas (maximum profiles, concurrent runner limits).
  - `/tenants/:id`: Detailed quota allocation, member seat assignments, and active plugin toggles.

### B. Automation & Fleet Suite (`/automation`)
Unifies remote cloud fleets and local Tauri-connected workstation daemons.

| Route Path | Module Name | Plugin Required | Capabilities |
| :--- | :--- | :--- | :--- |
| `/automation/overview` | `AutomationOverview` | `automa`, `runners` | Global overview of connected workers, active browser sessions, and workflow statistics. |
| `/automation/workflows` | `AutomationWorkflows` | `automa` | Visual DAG workflow builder, kịch bản kéo thả, trigger schedules. |
| `/automation/runs` | `AutomationRuns` | `automa` | Batch campaign runs, execution status, and task dispatching. |
| `/automation/runs/:id` | `AutomationRunDetail` | `automa` | Detailed timeline, step-by-step CDP logs, and captured artifact downloads. |
| `/automation/devices` | `AutomationDevices` | `runners` | Registered desktop workstations and remote VPS nodes connected to the mesh. |
| `/automation/browsers` | `AutomationBrowsers` | `runners` | Central anti-detect browser profile vaults with fingerprint seeds. |
| `/automation/proxies` | `AutomationProxies` | `runners` | Proxy pools, auto-healing SOCKS5 nodes, and health diagnostics. |

### C. Commerce & Credit Wallet (`/commerce`)
Built for monetization, template sharing, and pay-as-you-go automation runs.

- **`/commerce/store`**: Internal catalog offering automation workflows, custom plugin extensions, and managed proxy packs.
- **`/store` (`PublicStorefront`)**: Public unauthenticated storefront (`ignoreAccess: true`) enabling external customers to browse plans and scripts.
- **`/commerce/orders`**: Purchase history, invoice receipts, and provisioning status.
- **`/commerce/wallet`**: Credit balance, automated recharge rules, and real-time execution cost consumption.
- **`/commerce/admin`**: Administrator-only catalog manager, pricing tier setup, and billing controls.

### D. System & Security (`/system`)
- **`/system/overview`**: Platform health metrics, active microservices, and cluster status.
- **`/system/plugins`**: Dynamic plugin manager to enable/disable microservices across tenants.
- **`/system/plans` & `/system/subscriptions`**: Manage SaaS subscription tiers (Free, Pro, Enterprise) and active tenant subscriptions.
- **`/system/users` & `/system/roles`**: Enterprise IAM with fine-grained permission matrices.
- **`/system/audit-logs`**: Immutable audit logs capturing every configuration change, lease checkout, and security event.

---

## 3. Desktop Bridge & Tauri Native Protocol

When operating the desktop app or the Tuquet CLI, operators log in seamlessly via the **Desktop Bridge Protocol**:

```text
 1. Operator runs: tuquet cloud login
 2. CLI spins local HTTP listener on 127.0.0.1:8765
 3. CLI opens browser to: https://admin.tuquet.com/auth/desktop?port=8765&machine_name=MyWorkstation
 4. Operator authorizes tenant workspace
 5. Frontend dispatches deep-link:
    tuquet://auth/callback?token=<JWT>&refresh_token=<REFRESH>&tenant_id=<TENANT>
    (Fallback: POSTs credentials directly to http://127.0.0.1:8765/callback)
 6. Local workstation saves identity to ~/.tuquet/system/.identity.json
```

In the upcoming **Tauri release**, the native window directly wraps this router. The bridge executes in-memory via Tauri's native IPC channels (`invoke`), eliminating the need for local browser redirect loops while keeping 100% of the UI components identical.

---

## 4. Distributed Lease Locks & Concurrency Protection

The central table `runners.browsers` guards against concurrent execution collisions. Before any runner (cloud or local Tauri node) launches a profile, it must acquire an exclusive lease lock:

```sql
-- Atomic Lease Acquisition Procedure
SELECT runners.acquire_browser(
    p_browser_id => 'c8a30d9e-5e74-4b52-b141-f76159c946e3'::uuid,
    p_device_id  => 'a0b1c2d3-e4f5-6789-0123-456789abcdef'::uuid
);

-- Atomic Lease Release & Session Snapshot Sync
SELECT runners.release_browser(
    p_browser_id         => 'c8a30d9e-5e74-4b52-b141-f76159c946e3'::uuid,
    p_device_id          => 'a0b1c2d3-e4f5-6789-0123-456789abcdef'::uuid,
    p_storage_path       => 'tenant-01/c8a30d9e.tar.zst',
    p_storage_size_bytes => 14208512,
    p_storage_hash       => 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    p_cookies_count      => 42
);
```

If another node attempts to check out the same profile, the control plane immediately rejects with `409 LOCKED`, guaranteeing zero session bans due to simultaneous logins.
