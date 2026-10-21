# CLI Commands Catalog

`tq` is built strictly around **4 Core Commands**, mapped 1:1 to architectural domains and Cloud plugins.

---

## 1. `tq auth` — Identity & Access Management
Cloud identity, multi-tenancy workspaces, and operator sessions (`core-iam`).

| Command | Description |
| :--- | :--- |
| `tq auth login` | Authenticate operator account via OTP, Password, or Token |
| `tq auth logout` | Revoke local credentials and clear active session |
| `tq auth whoami` | Inspect current session, active tenant, and machine pairing |
| `tq auth tenant` | List and switch between multi-tenant organization contexts |

---

## 2. `tq worker` — Execution Node & Fleet Worker
Autonomous background worker daemon and local execution node (`workers`).

| Command | Description |
| :--- | :--- |
| `tq worker start` | Start the local worker daemon and enroll into Cloud Fleet |
| `tq worker stop` | Gracefully shut down the active worker process |
| `tq worker status` | Check worker daemon health, port binding, and device pairing |
| `tq worker logs` | Stream execution logs and telemetry events (`-f`, `-n`) |

---

## 3. `tq automation` — Workflow & Automation Orchestration
Manage, validate, and execute browser automation workflows (`automation`).

| Command | Description |
| :--- | :--- |
| `tq automation run <id>` | Execute a workflow by stored ID via local or cloud headless browser |
| `tq automation workflow list` | List available automation workflows in SQLite database or cloud (alias `list`) |
| `tq automation inspect <id>` | Validate syntax and inspect workflow actions and parameters |

---

## 4. `tq browser` — Anti-Detect Browser & Profile Management
Full lifecycle management of stealth Chromium instances, fingerprinted profiles, and extensions.

| Command | Description |
| :--- | :--- |
| `tq browser install [engine]` | Download and provision isolated Chromium / stealth binaries |
| `tq browser status` | Inspect installed browser engines and active sandboxes |
| `tq browser launch <profile_id>` | Launch isolated browser profile with assigned fingerprint and proxy |
| `tq browser profile list` | List all local and cloud browser profiles |
| `tq browser profile create <name>` | Generate a new anti-detect profile with unique hardware seed |
| `tq browser profile test-proxy <id>` | Verify proxy IP egress, WebRTC leak, and latency |
| `tq browser ps` | List all running browser processes |
| `tq browser stop [pid/id]` | Terminate active browser processes gracefully |

---

## 5. `tq gateway` — Secure Network & VPS Mesh
SOCKS5 and HTTP tunnel forwarder connecting workstation to VPS mesh.

| Command | Description |
| :--- | :--- |
| `tq gateway start` | Start SOCKS5 (port 1080) and HTTP proxy forwarder (port 8118) |
| `tq gateway stop` | Disconnect active tunnels and proxy daemons |
| `tq gateway status` | Inspect latency, public egress IP, and VPS mesh connectivity |

---

## 6. `tq mcp` — Model Context Protocol Agent Bridge
Exposes pure-Rust headless browser and workflow automation as an stdio MCP server for AI coding assistants and autonomous agents.

| Command | Description |
| :--- | :--- |
| `tq mcp` | Launch JSON-RPC 2.0 stdio server exposing `worker_probe`, `workflow_run`, and browser tools |
