# Dedicated Browser Runtime & Profile Sandbox

Standard commercial browsers (Google Chrome, Microsoft Edge) maintain pervasive diagnostic telemetry, hardware fingerprint queries, background update daemons, and shared session caches that expose user identity across multiple accounts.

**Specter Browser** is a specialized C++ Antidetect Chromium runtime and multi-profile sandbox subsystem powered by the [`tuquet-browser`](https://github.com/tuquet/browser) microservice. It provides deterministic hardware emulation seeds, memory-level canvas/WebGL protection, Bézier mouse trajectory spoofing, process tree group containment, and strict profile filesystem sandboxing.

---

## 1. Core Architectural Pillars

```text
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                      SPECTER BROWSER SUBSYSTEM                          │
 │                                                                         │
 │   ┌──────────────────────────┐       ┌──────────────────────────────┐   │
 │   │ C++ Chromium LTS Engine  │       │ Deterministic PRNG Spoofing  │   │
 │   │ (v148.0.7778.215)        │       │ (Seed: u32)                  │   │
 │   ├──────────────────────────┤       ├──────────────────────────────┤   │
 │   │ • Zero Google Telemetry  │       │ • Canvas 2D Math Jitter      │   │
 │   │ • No Background Updates  │       │ • WebGL Vendor / GPU Model   │   │
 │   │ • DevToolsActivePort SSOT│       │ • AudioContext SNR > 99.4dB  │   │
 │   │ • Shadow DOM Piercing    │       │ • Modulo-derived Cores & RAM │   │
 │   └──────────────────────────┘       └──────────────────────────────┘   │
 │                 │                                   │                   │
 │                 ▼                                   ▼                   │
 │   ┌─────────────────────────────────────────────────────────────────┐   │
 │   │                   Isolated Profile Sandboxes                    │   │
 │   │               (~/.specter/browser/profiles/<id>/)                │   │
 │   │ • Segregated Cookies, LocalStorage, IndexedDB, LevelDB          │   │
 │   │ • Dedicated Proxy Tunnel (SOCKS5 / HTTP Adapter)                │   │
 │   │ • WebRTC STUN Protection (proxy_shielded | disabled | real)     │   │
 │   │ • Zstandard (.tar.zst) Fast Archival with Cache Exclusion       │   │
 │   └─────────────────────────────────────────────────────────────────┘   │
 └─────────────────────────────────────────────────────────────────────────┘
```

1. **Dedicated Runtime Engine**:
   - Compiles and provisions pinned C++ Antidetect Chromium LTS builds (`PINNED_STEALTH_CHROMIUM_VERSION = "148.0.7778.215"`, fallback standard Chromium `131.0.6778.33`).
   - Completely removes background Google services, crashpad reporters, safe-browsing telemetry, and automatic component updater hooks (`--disable-component-update`, `--disable-domain-reliability`).
2. **Deterministic PRNG Hardware Seeds**:
   - Every profile is bound to an immutable 32-bit unsigned integer seed (`--seed <u32>`).
   - All hardware attributes (CPU cores, RAM size, GPU vendor strings, audio frequency noise, canvas micro-variations) derive deterministically from this seed, guaranteeing 100% cross-session consistency.
3. **Full Lifecycle Profile Sandbox**:
   - Profiles live in isolated directories under `~/.specter/browser/profiles/<id>/`.
   - Never shares cache, cookies, WebSQL, or local storage between profiles.
4. **Zstandard Session Compression & Cloud Sync**:
   - High-speed Zstandard level-3 compression (`.tar.zst`) with intelligent cache filtering for cloud sync and team hand-offs.

---

## 2. Deterministic Hardware Fingerprint Generation

When a new profile is initialized without explicit hardware arguments, `tuquet-browser` applies deterministic PRNG derivation from the 32-bit seed:

### Mathematical Derivation Model

```rust
// Core derivation logic from tuquet-browser/src/profile.rs
let cores = match seed % 3 {
    0 => 8,
    1 => 12,
    _ => 16,
};

let ram = match seed % 3 {
    0 => 16,
    1 => 32,
    _ => 16,
};

let slug = slugify(&name);
let id = if slug.is_empty() {
    format!("prf_{:08x}", seed)
} else {
    format!("{}-{:06x}", slug, seed & 0xFFFFFF)
};
```

### Deterministic Spoofing Vectors

| Hardware Attribute | Emulation Mechanism | Default / Derivation |
| :--- | :--- | :--- |
| **Fingerprint Seed** | Immutable 32-bit PRNG seed | Random `u32` if omitted |
| **CPU Concurrency** | Injected via Blink C++ internals | `8`, `12`, or `16` cores (`seed % 3`) |
| **Device Memory** | `navigator.deviceMemory` C++ override | `16GB` or `32GB` (`seed % 3`) |
| **OS Platform** | Platform headers & user-agent | `windows` (Windows 10.0.0) |
| **Browser Brand** | Chromium engine brand string | `Chrome` (LTS v148) |
| **Timezone** | V8 Internationalization API | `Asia/Ho_Chi_Minh` (configurable) |
| **Locale & Lang** | `navigator.languages` & `Accept-Language` | `vi-VN` (`vi-VN,vi,en-US,en`) |
| **WebRTC Mode** | UDP STUN packet filtering | `proxy_shielded` (or `disabled`, `real`) |

---

## 3. Chromium Launcher & Flag Generation

The launcher (`BrowserLauncher::build_args` in `browser/src/launcher.rs`) dynamically generates secure command-line arguments to enforce stealth and stability:

```bash
# Core Arguments Generated by Specter Launcher
--remote-debugging-port=9222
--user-data-dir=~/.specter/browser/profiles/<id>
--no-first-run
--password-store=basic
--log-level=3
--test-type
--disable-component-update
--disable-domain-reliability
--disable-blink-features=AutomationControlled
--window-size=1280,720
```

### Headless & Extension Guardrails

1. **Headless Execution**:
   - Injects `--disable-gpu` and `--disable-software-rasterizer`.
   - Generates authentic operating-system-specific User-Agent matching the active Chromium version (e.g. `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36`).
2. **Extensions with Headless**:
   - Automatically promotes `--headless` to `--headless=new` whenever unpacked extensions are loaded, preventing silent extension loading failures in Chromium headless mode.
3. **Container & Root Environment Guardrails**:
   - Automatically detects containerized Linux environments (UID 0 / root or `TUQUET_FORCE_NO_SANDBOX=1`) and adds `--no-sandbox` and `--disable-setuid-sandbox` to prevent crashes.

---

## 4. SSOT Storage & Configuration (Pillar 3)

All browser files strictly adhere to SSOT Pillar 3 under `~/.specter/browser/`:

```text
~/.specter/browser/
├── browser.json              # Active engine settings and manifest channel
├── runtimes/                 # Dedicated Chromium execution binaries
│   └── 148.0.7778.215/       # Pinned LTS Antidetect Chromium
├── profiles/                 # Sandboxed profile data directories
│   └── Facebook-Ad-US-01/
│       ├── profile.json      # Profile hardware fingerprint manifest
│       └── Default/          # Chromium LevelDB, cookies, storage
└── extensions/               # Registered browser extensions (Automa, uBlock)
    ├── automa/
    └── ublock/
```

### Complete `profile.json` Schema

Each profile contains a canonical manifest matching the Rust `BrowserProfile` struct:

```json
{
  "id": "facebook-ad-us-01-849201",
  "name": "Facebook-Ad-US-01",
  "fingerprint_seed": 849201,
  "os_platform": "windows",
  "os_version": "10.0.0",
  "browser_brand": "Chrome",
  "hardware_concurrency": 8,
  "device_memory_gb": 16,
  "lang": "vi-VN",
  "accept_lang": "vi-VN,vi,en-US,en",
  "timezone": "Asia/Ho_Chi_Minh",
  "proxy": "socks5://127.0.0.1:1080",
  "webrtc_mode": "proxy_shielded",
  "extensions": [
    "automa"
  ],
  "cloud_id": null,
  "cloud_synced_at": null,
  "storage_path": null,
  "storage_hash": null,
  "storage_size_bytes": null,
  "cookies_count": null,
  "created_at": "1791386000"
}
```

---

## 5. Zstandard Profile Archival (`.tar.zst`)

When packing or syncing profiles, `tuquet-browser` uses Zstandard compression (level 3 by default) paired with strict cache exclusion rules (`DEFAULT_PROFILE_IGNORE`):

```text
Excluded from Profile Archives:
• Cache/ & Media Cache/
• Code Cache/ (V8 bytecode)
• GPUCache/ & DawnCache/
• GrShaderCache/ & ShaderCache/
• Crashpad/ & Crash Reports/
• OptimizationGuidePredictionModels/
• Singleton* lock files & *.tmp logs
```

Preserves all essential session data: **Cookies, IndexedDB, LevelDB, LocalStorage, and Extensions**, reducing archive size from ~500MB down to <15MB.

---

## 6. Command Reference

All browser and profile operations are exposed via `specter browser` and shorthand aliases:

### Runtime Management

```bash
# Display installation status, executable path, and disk usage
specter browser status

# Download and provision dedicated Antidetect Chromium LTS
specter browser install

# Force re-download specific version or channel
specter browser install 148 --force

# List locally installed engine versions
specter browser list

# Clean and reclaim disk space
specter browser clean
```

### Launching Profiles

```bash
# Launch default profile with CDP DevTools bridge on port 9222
specter browser launch default --port 9222

# Launch in ultra-stealth headless mode with proxy
specter browser launch "Store-US" --headless --proxy socks5://127.0.0.1:1080

# Zero-port ultra-stealth mode (no remote debugging port open)
specter browser launch "Store-US" --no-cdp

# Launch detached in background without keeping terminal attached
specter browser launch "Store-US" --detach

# Skip pre-flight proxy probe and launch immediately
specter browser launch "Store-US" --skip-proxy-check
```

### Profile Management

```bash
# List all local profiles with hardware fingerprint summary
specter browser profile list

# Create a new profile with deterministic seed and custom hardware
specter browser profile create "Campaign-01" \
  --seed 849201 \
  --os windows \
  --cores 8 \
  --ram 16 \
  --proxy socks5://127.0.0.1:1080 \
  --timezone "America/New_York" \
  --locale "en-US"

# Inspect detailed hardware fingerprint parameters
specter browser profile inspect "Campaign-01"

# Pre-flight proxy probe before opening browser
specter browser profile test-proxy "Campaign-01" --timeout 5

# Pack profile into a lightweight portable archive (.tar.zst)
specter browser profile pack "Campaign-01" -o ./backup.tar.zst --level 3

# Restore profile from archive
specter browser profile unpack ./backup.tar.zst

# Delete profile and remove its sandbox directory
specter browser profile delete "Campaign-01" --force
```

### Configuration

```bash
# Display active browser engine settings
specter browser config --show

# Edit browser.json in default system editor
specter browser config --edit
```

---

## 7. AI Agent Native Integration (MCP Protocol)

AI agents inspect and verify dedicated browser readiness through the native MCP tool **`tuquet_browser_status`**:

### Tool Call

```json
{
  "name": "tuquet_browser_status",
  "arguments": {}
}
```

### Response Schema

```json
{
  "installed": true,
  "platform": "windows",
  "executable_path": "C:\\Users\\<username>\\.specter\\browser\\runtimes\\148.0.7778.215\\chrome.exe",
  "directory": "C:\\Users\\<username>\\.specter\\browser\\runtimes\\148.0.7778.215",
  "pinned_version": "148.0.7778.215",
  "size_mb": 214.5
}
```
