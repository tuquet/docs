# Isolated Browser Profiles & Lifecycle Management

Managing multi-account operations requires total data segregation. Commercial browsers share cached storage, DNS tables, and GPU contexts across tabs and windows, allowing anti-fraud trackers to correlate identities and execute portfolio-wide bans.

**Specter** provides strict filesystem, memory, and network isolation through its **Isolated Browser Profile Sandbox**, managed natively by the [`tuquet-browser`](https://github.com/tuquet/browser) microservice.

<HairlineFigure name="drawer" />

---

## 1. Sandbox Filesystem Isolation

Every browser profile created in Specter resides in its own sandboxed directory under SSOT Pillar 3 (`~/.specter/browser/profiles/<profile_id>/`).

```text
~/.specter/browser/profiles/Facebook-Ad-VN-01/
├── profile.json              # Deterministic hardware seeds & metadata
├── Default/                  # Isolated Chromium user data
│   ├── Cookies               # SQLite session cookie jar
│   ├── Local Storage/        # LevelDB persistent web storage
│   ├── IndexedDB/            # Client-side document databases
│   └── Network/              # HTTP credentials, token caches
└── extensions/               # Dedicated profile extension sandbox
```

- **Zero Cache Cross-Pollination**: Profile cookies, `localStorage`, `IndexedDB`, and session tokens are 100% physically separated.
- **Dedicated Network Sockets**: SOCKS5 and HTTP proxy configurations bind directly to individual profile launch flags, guaranteeing that no traffic from Profile B leaks through the proxy of Profile A.

---

## 2. Deterministic PRNG Hardware Specification (`profile.json`)

When creating a profile, Specter uses a 32-bit pseudorandom seed (`--seed <u32>`) to derive all hardware and environment attributes deterministically. Once generated, this digital signature remains immutable across reboots:

```json
{
  "id": "facebook-ad-vn-01",
  "name": "Facebook-Ad-VN-01",
  "fingerprint_seed": 849201,
  "os_platform": "windows",
  "os_version": "10.0.0",
  "browser_brand": "Chrome",
  "hardware_concurrency": 8,
  "device_memory_gb": 16,
  "lang": "vi-VN",
  "accept_lang": "vi-VN,vi,en-US,en",
  "webrtc_mode": "disabled",
  "proxy": "socks5://127.0.0.1:1080",
  "timezone": "Asia/Ho_Chi_Minh",
  "extensions": ["automa", "ublock"],
  "created_at": "2026-10-07T12:00:00.000Z"
}
```

---

## 3. Command Reference

All profile operations are exposed via `specter browser profile`:

### Creating and Inspecting Profiles

```bash
# Create a profile with deterministic PRNG seed and custom hardware parameters
specter browser profile create "TikTok-Agency-01" \
  --seed 94102 \
  --os windows \
  --cores 8 \
  --ram 16 \
  --proxy socks5://127.0.0.1:1080 \
  --timezone "Asia/Ho_Chi_Minh" \
  --locale "vi-VN"

# Inspect detailed hardware parameters and disk footprint
specter browser profile inspect "TikTok-Agency-01"

# List all local profiles with fingerprint summary table
specter browser profile list
```

### Pre-Flight Proxy Connectivity Check

Before launching critical ad accounts or banking portals, verify proxy latency and public egress IP:

```bash
# Run a pre-flight probe against target profile's configured proxy
specter browser profile test-proxy "TikTok-Agency-01" --timeout 5

# Output diagnostic results in raw JSON format for CI/CD pipelines
specter browser profile test-proxy "TikTok-Agency-01" --json
```

### Exporting & Archiving Profiles (Pack / Unpack)

Specter incorporates a high-efficiency archive engine powered by **Zstandard (zstd)** with intelligent cache filtering. When archiving a profile, it strips disposable disk bloat (`Cache`, `Code Cache`, `GPUCache`, `Service Worker/CacheStorage`), reducing 500MB+ user directories to lightweight ~15MB portable snapshots:

```bash
# Pack profile into a lightweight .tar.zst archive (Zstd level 3)
specter browser profile pack "TikTok-Agency-01" -o ./TikTok-Agency-01.tar.zst

# Restore profile from archive on another workstation or VPS
specter browser profile unpack ./TikTok-Agency-01.tar.zst
```

### Deleting Profiles

```bash
# Permanently delete profile and purge all sandboxed data
specter browser profile delete "TikTok-Agency-01" --force
```

---

## 4. Distributed Cloud Profile Synchronization

In multi-node teams, profiles are stored centrally in **Tuquet Cloud** and synchronized across workstations with distributed lease locks:

```bash
# List central cloud browser profiles available to your organization
specter browser profile cloud list

# Acquire exclusive lease lock (prevents team members from opening simultaneously)
specter browser profile cloud acquire "TikTok-Agency-01"

# Launch session, execute automation, or perform manual work
specter browser launch "TikTok-Agency-01"

# Release distributed lease lock and synchronize cookie delta back to cloud
specter browser profile cloud release "TikTok-Agency-01"
```
