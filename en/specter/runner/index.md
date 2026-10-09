# Runner Daemon & Native Process Supervisor

Enterprise-scale browser automation suites frequently encounter orphan processes, resource exhaustion, and "zombie" browser instances that continue consuming RAM and CPU long after their parent script terminates. 

**Specter Runner** is an ultra-high performance universal distributed execution engine and supervisor daemon engineered natively in pure Rust, powered by the [`tuquet-runner`](https://github.com/tuquet/runner) microservice.

<HairlineFigure name="cabinet" />

---

## 1. Zero-Zombie Guarantee: Native Process Sandbox & Auto-Cleanup

Traditional automation libraries (Playwright, Puppeteer, Selenium) spawn browser processes as detached child processes. If the parent script crashes abruptly or is killed, child browser processes linger and become persistent zombies.

Specter Runner eliminates this failure mode natively using operating system process sandboxing (`command_group`):

```text
 ┌─────────────────────────────────────────────────────────────┐
 │             NATIVE PROCESS ISOLATION BOUNDARY               │
 │                                                             │
 │  ┌───────────────────────────────────────────────────────┐  │
 │  │          Native Process Supervision Sandbox           │  │
 │  │                                                       │  │
 │  │   ┌──────────────────┐       ┌────────────────────┐   │  │
 │  │   │  Specter Runner  │ ────► │ Chromium (Parent)  │   │  │
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
   - Binds all spawned child browser processes and workers directly to the Runner supervisor lifecycle.
   - When the Runner terminates or exits, the native sandbox terminates every child process within <0.1ms.
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

`runner` standardizes job execution payloads across ecosystem pillars, seamlessly uniting **Automa** (workflow DAG execution) with **Browser** (Antidetect Chromium, deterministic PRNG fingerprint spoofing, proxy routing, and profile sandboxing):

### 1. Automa Workflow Execution with Dedicated Browser Config (`driver: "automa"`)

```json
{
  "id": "job-automa-stealth-001",
  "driver": "automa",
  "payload": {
    "workflow": {
      "path": "./workflows/scrape-catalog.json",
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

In distributed scraping fleets, edge nodes and cloud VPS instances operate as headless execution workers enrolled with **Tuquet Cloud**.

When running in worker mode:

```bash
specter runner worker --interval 15 --headless
```

The daemon automatically executes an autonomous 5-stage lifecycle:
1. **Poll Cloud Queue**: Polls pending automation tasks from the Supabase central control plane.
2. **Lease Acquisition**: Claims an exclusive profile lock (`acquire_browser`) to prevent concurrent session conflicts.
3. **Snapshot Unpacking**: Downloads and unpacks the profile session delta (`.tar.zst`).
4. **Execution & Telemetry**: Executes the Automa workflow DAG via native CDP.
5. **Delta Sync & Release**: Packs updated session cookies, syncs back to cloud storage, and releases the lease lock (`release_browser`).

---

## 5. Master CLI Command Reference

All runner operations can be managed via the unified Master CLI:

### Starting the Runner Daemon

```bash
# Start runner daemon on default port 8765
specter runner start

# Start in background as a detached supervisor daemon
specter runner start --detach

# Custom host, port, and log verbosity
specter runner start --host 0.0.0.0 --port 9000 --log-level debug

# Enable Autonomous Cloud Fleet Mesh worker mode
specter runner start --detach --cloud
```

### Cloud Fleet Worker

```bash
# Start polling and executing cloud workflows every 15 seconds
specter runner worker --interval 15

# Execute a single job on a specific cloud profile and exit
specter runner worker --cloud-profile "Facebook-Ad-VN" --workflow ./task.json --once
```

### Inspecting Status & Logs

```bash
# Check daemon health and active worker threads
specter runner status

# Output status in raw JSON format for machine monitoring
specter runner status --json

# Follow and tail live daemon execution logs
specter runner logs --follow --lines 100
```

### Lifecycle Control

```bash
# Restart the running runner daemon
specter runner restart --detach

# Gracefully stop the runner daemon
specter runner stop

# Force terminate active jobs without waiting
specter runner stop --force
```

### Active Probe & OpenAPI Specification

```bash
# Active capability negotiation probe returning manifest JSON
specter runner probe

# Export OpenAPI v3 JSON specification to file
specter runner export-openapi --output ./openapi.json
```

---

## 6. Standalone Binary Reference (`runner`)

For lightweight edge nodes, VPS instances, or Docker containers, the standalone pure-Rust binary `runner` can be operated independently:

```bash
# Execute a local YAML/JSON job specification file
runner run ./job.yaml

# Directly execute an ad-hoc command or agent prompt
runner exec --driver shell --command "dir"
runner exec --driver agent --prompt "Scrape top 10 products"

# Enroll workstation with Specter Cloud (zero-touch device registration)
runner enroll --env prod --token <ENROLLMENT_TOKEN>

# Manage and switch cloud environments (dev, local, prod)
runner env list
runner env switch prod

# Connect outbound worker to central WebSocket control plane
runner worker --server wss://hub.specter.dev/api/v1/runner/ws --token <TOKEN>

# Display system information, hardware fingerprint, and enrollment status
runner info

# Reset local device enrollment credentials by deleting .identity.json
runner purge
```

---

## 7. SSOT Storage & Configuration (Pillar 2)

In strict adherence to Specter's SSOT architecture, all Runner runtime configuration and SQLite job history resolve under `~/.specter/automa/`:

```text
~/.specter/automa/
├── runner.json               # Runner daemon configuration (port, concurrency)
├── automa.sqlite             # Execution history, job states, telemetry
└── workflows/                # Local DAG workflow definitions
```

### `runner.json` Configuration File

```json
{
  "$schema": "https://tuquet.com/schema/config/runner.schema.json",
  "server_host": "127.0.0.1",
  "server_port": 8765,
  "max_concurrent_jobs": 4,
  "cloud_sync_interval_secs": 30
}
```

Manage configuration directly from the CLI:

```bash
specter runner config --show
specter runner config --edit
```

---

## 8. AI Agent Integration (MCP Protocol)

AI agents query and orchestrate the local runner through the native MCP tool **`specter_runner_probe`**:

### Tool Call

```json
{
  "name": "specter_runner_probe",
  "arguments": {}
}
```

### Probe Manifest Output

```json
{
  "protocol": "specter.automa.v1",
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

