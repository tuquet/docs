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
Manage, validate, and execute browser automation DAGs (`automation`).

| Command | Description |
| :--- | :--- |
| `tq automation run <file>` | Execute a workflow directly via local or cloud headless browser |
| `tq automation list` | List available automation workflows in local storage or cloud |
| `tq automation inspect <file>` | Validate syntax, inspect node dependencies, and view execution graph |

---

## 4. `tq gateway` — Secure Network & VPS Mesh
SOCKS5 and HTTP tunnel forwarder connecting workstation to VPS mesh.

| Command | Description |
| :--- | :--- |
| `tq gateway start` | Start SOCKS5 (port 1080) and HTTP proxy forwarder (port 8118) |
| `tq gateway stop` | Disconnect active tunnels and proxy daemons |
| `tq gateway status` | Inspect latency, public egress IP, and VPS mesh connectivity |
