# Workstation Worker & Bare-Metal Daemon

An unshielded workstation will choke when running mass automation. Detached scrapers spawn rogue child processes, leak gigabytes of LevelDB memory, and freeze the operating system under concurrent load.

**Workstation Worker** transforms raw developer hardware into a disciplined execution node. Powered by the pure-Rust worker daemon (`tq worker`), it runs as an autonomous local supervisor on port 8765. It enforces OS-level process containment via Windows Job Objects and POSIX groups, caps hardware quotas, and shields workstation iron from runaway automation tasks.

::: tip Standalone Workstation Node & Tauri Desktop Host
`tq worker` runs directly on the local machine. It exposes a lightweight HTTP/WebSocket control plane (`localhost:8765`), allowing external scripts, remote fleet controllers, or the **Tauri Desktop Client** to dispatch jobs and inspect real-time telemetry with zero zombie process risk.
:::

<HairlineFigure name="cabinet" />

---

## 1. Zero-Zombie Guarantee: Native Process Sandbox & Auto-Cleanup

Traditional automation libraries (Playwright, Puppeteer, Selenium) spawn browser processes as detached child processes. If the parent script crashes abruptly or is killed, child browser processes linger and become persistent zombies.

The Worker engine eliminates this failure mode natively using operating system process sandboxing (`command_group`):

```text
 ┌─────────────────────────────────────────────────────────────┐
 │             NATIVE PROCESS ISOLATION BOUNDARY               │
 │                                                             │
 │  ┌───────────────────────────────────────────────────────┐  │
 │  │          Native Process Supervision Sandbox           │  │
 │  │                                                       │  │
 │  │   ┌──────────────────┐       ┌────────────────────┐   │  │
 │  │   │  Runner Engine  │ ────► │ Chromium (Parent)  │   │  │
 │  │   │  Daemon (8765)   │       └─────────┬──────────┘   │  │
 │  │   └──────────────────┘                 │              │  │
 │  │                                        ▼              │  │
 │  │                              ┌────────────────────┐   │  │
 │  │                              │ Renderer Workers   │   │  │
 │  │                              └────────────────────┘   │  │
 │  └───────────────────────────────────────────────────────┘  │
 │     ▲                                                       │
 │     └──── When Daemon Terminates: Native OS Sandbox         │
 │           Cleans up 100% of Sub-Processes Automatically     │
 └─────────────────────────────────────────────────────────────┘
```

1. **Native Process Containment (Windows & Linux)**:
   - Binds all spawned child browser processes and workers directly to the Worker supervisor lifecycle.
   - When the Worker terminates or exits, the native sandbox terminates every child process within <0.1ms.
2. **Hard Crash Resilience**:
   - Even in sudden power-loss, kill signals, or unexpected crashes, the operating system cleans up and reclaims all RAM, file handles, and child sockets cleanly.

---

## 2. Daemon Architecture & HTTP API (Port 8765)

The runner operates as a local HTTP daemon worker running on port `8765` by default (`AUTOMA_PORT`):

| Endpoint | Method | Purpose |
| :--- | :---: | :--- |
| `GET /api/v1/health` | `HTTP` | Instant readiness & liveness probe returning JSON status (`200 OK`). |
| `GET /api/v1/telemetry` | `HTTP` | Stream CPU, memory usage (RSS), and active browser profile counts. |
| `POST /api/v1/jobs` | `HTTP` | Enqueue a headless browser automation task payload. |
| `GET /api/v1/jobs/{id}` | `HTTP` | Query status, output, and execution logs of a specific job. |
| `WS /api/v1/live` | `WebSocket` | Real-time CDP event stream and Bézier mouse coordinates. |

---

## 3. Universal Contract Schema: Automa & Browser Convergence

`worker` standardizes job execution payloads across ecosystem pillars, seamlessly uniting **Automation** (workflow execution) with **Browser** (Antidetect Chromium, deterministic PRNG fingerprint spoofing, proxy routing, and profile sandboxing):

### 1. Automa Workflow Execution with Dedicated Browser Config (`driver: "automa"`)

```json
{
  "id": "job-automa-stealth-001",
  "driver": "automa",
  "payload": {
    "workflow": {
      "id": "scrape-catalog",
      "variables": {
        "target_domain": "example.com",
        "max_retries": 3
      }
    },
    "debug": true,
    "browser": {
      "type": "chromium",
      "version": "148.0.7778.215",
      "profileId": "sandbox_worker_01",
      "headless": true,
      "proxy": {
        "server": "socks5://127.0.0.1:1080",
        "disableUdp": true
      },
      "fingerprint": {
        "seed": 133742,
        "platform": "windows",
        "brand": "Chrome",
        "hardwareConcurrency": 8,
        "timezone": "Asia/Ho_Chi_Minh",
        "lang": "vi-VN"
      },
      "windowSize": { "width": 1920, "height": 1080 },
      "closeBrowserOnFinish": true
    }
  },
  "timeout_ms": 120000
}
```

### 2. Standalone Browser Runtime & Profile Probe (`driver: "browser"`)

```json
{
  "id": "job-browser-probe-001",
  "driver": "browser",
  "payload": {
    "action": "status",
    "browser": {
      "type": "chromium",
      "version": "148.0.7778.215",
      "headless": true
    }
  },
  "timeout_ms": 30000
}
```

---

## 4. Autonomous Cloud Fleet Worker Mode

In distributed scraping fleets, edge nodes and cloud VPS instances operate as headless execution workers enrolled with **Cloud**.

When running in worker mode:

```bash
tq worker start --interval 15 --headless
```

The daemon automatically executes an autonomous 5-stage lifecycle:
1. **Poll Cloud Queue**: Polls pending automation tasks from the Cloud Center central control plane.
2. **Lease Acquisition**: Claims an exclusive profile lock (`acquire_browser`) to prevent concurrent session conflicts.
3. **Snapshot Unpacking**: Downloads and unpacks the profile session delta (`.tar.zst`).
4. **Execution & Telemetry**: Executes the automation workflow via native CDP.
5. **Delta Sync & Release**: Packs updated session cookies, syncs back to cloud storage, and releases the lease lock (`release_browser`).

---

## 5. Master CLI Command Reference

All worker operations can be managed via the unified Master CLI:

### Starting the Worker Daemon

```bash
# Start worker daemon on default port 8765
tq worker start

# Start in background as a detached supervisor daemon
tq worker start --detach

# Custom host, port, and log verbosity
tq worker start --host 0.0.0.0 --port 9000 --log-level debug

# Enable Autonomous Cloud Fleet Mesh worker mode
tq worker start --detach --cloud
```

### Cloud Fleet Worker

```bash
# Start polling and executing cloud workflows every 15 seconds
tq worker start --interval 15 --headless
```

### Inspecting Status & Logs

```bash
# Check daemon health and active worker threads
tq worker status

# Output status in raw JSON format for machine monitoring
tq worker status --json

# Follow and tail live daemon execution logs
tq worker logs --follow --lines 100
```

### Lifecycle Control

```bash
# Restart the running worker daemon
tq worker restart --detach

# Gracefully stop the worker daemon
tq worker stop

# Force terminate active jobs without waiting
tq worker stop --force
```

### Active Probe & OpenAPI Specification

```bash
# Active capability negotiation probe returning manifest JSON
tq worker probe

# Export OpenAPI v3 JSON specification to file
tq worker export-openapi --output ./openapi.json
```

---

## 6. Standalone Worker Daemon Reference (`tq worker`)

For lightweight edge nodes, VPS instances, or Docker containers, the standalone pure-Rust worker supervisor can be operated via `tq worker`:

```bash
# Start worker supervisor daemon on default port 8765
tq worker start --port 8765

# Enroll workstation with Cloud (zero-touch device registration)
tq worker enroll --env prod --token <ENROLLMENT_TOKEN>

# Manage and switch cloud environments (dev, local, prod)
tq worker env list
tq worker env switch prod

# Connect outbound worker to central WebSocket control plane
tq worker start --server wss://hub.tuquet.dev/api/v1/worker/ws --token <TOKEN>

# Display system information, hardware fingerprint, and enrollment status
tq worker info

# Reset local device enrollment credentials by deleting .identity.json
tq worker purge
```

---

## 7. SSOT Storage & Configuration (Pillar 2)

In strict adherence to Tuquet's SSOT architecture, all Worker runtime configuration and execution logs resolve under `~/.tq/worker/`:

```text
~/.tq/worker/
├── worker.json               # Worker daemon configuration (port, concurrency)
└── logs/                     # Process logs and supervisor telemetry
```

### `worker.json` Configuration File

```json
{
  "$schema": "https://tuquet.com/schema/config/worker.schema.json",
  "server_host": "127.0.0.1",
  "server_port": 8765,
  "max_concurrent_jobs": 4,
  "cloud_sync_interval_secs": 30
}
```

Manage configuration directly from the CLI:

```bash
tq worker config --show
tq worker config --edit
```

---

## 8. AI Agent Integration (MCP Protocol)

AI agents query and orchestrate the local worker through the native MCP tool **`worker_probe`**:

### Tool Call

```json
{
  "name": "worker_probe",
  "arguments": {}
}
```

### Probe Manifest Output

```json
{
  "protocol": "tuquet.automa.v1",
  "name": "automa-runner",
  "version": "0.1.0",
  "engine": "chromium-extension-worker",
  "status": "ready",
  "capabilities": [
    "browser:chromium",
    "mv3_extension_worker",
    "isolation:profile_sandbox",
    "headless",
    "automation:workflow_graph"
  ],
  "plugin_type": "runner_driver"
}
```

