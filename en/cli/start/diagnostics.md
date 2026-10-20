# System Health & Ecosystem Diagnostics

Operating antidetect browser clusters, proxy mesh tunnels, and automated DAG workflows requires verified system dependencies, intact SQLite databases, and properly permissioned storage pillars.

**Doctor** is a built-in automated diagnostic and self-healing engine (`tuquet doctor`) that verifies workstation readiness across all microservice pillars.

<HairlineFigure name="query" />

---

## 1. Running Comprehensive System Diagnostics

Execute the diagnostic scanner at any time:

```bash
# Run complete ecosystem health check
tuquet doctor
```

The diagnostic scanner inspects 5 critical subsystems:

```text
 1. System Tool Dependencies:
    • OpenSSH (ssh)       - Required for SOCKS5 tunneling and remote VPS access
    • cloudflared         - Optional portable binary for Cloudflare Tunnel mesh
    • Git                 - Version control for local workflow repositories

 2. Dedicated Browser Runtime:
    • C++ Chromium LTS    - Checks binary presence in ~/.tuquet/browser/runtimes/
    • Executable Bit      - Verifies launch permissions and integrity hash

 3. SSOT Storage Pillars (~/.tuquet/):
    • ~/.tuquet/system/   - Machine identity (.machine_id) and credentials
    • ~/.tuquet/automa/   - Workflow vault and execution database
    • ~/.tuquet/browser/  - Profile sandboxes and antidetect runtimes
    • ~/.tuquet/bridge/   - Mesh configuration and daemon PIDs
    • ~/.tuquet/faker/    - Synthetic persona schemas and templates

 4. Automa SQLite Database:
    • automa.sqlite       - Verifies schema migrations and read/write access

 5. AI Agent MCP Protocol:
    • Native MCP Server   - Confirms JSON-RPC stdio responsiveness
```

---

## 2. Diagnostic Output & Verdict Card

When all dependencies are operational, displays a clean diagnostic verdict:

```text
╭─ DIAGNOSTIC VERDICT ────────────────────────────── ● ALL SYSTEMS OPERATIONAL ─╮
│  All required ecosystem dependencies and runtimes are properly provisioned.    │
│  Your workstation is 100% ready for autonomous browser workflows, antidetect   │
│  spoofing, and bridge meshes.                                                  │
╰────────────────────────────────────────────────────────────────────────────────╯
```

If a dependency is missing, Doctor highlights the specific missing component and displays actionable remediation instructions:

```text
  Tool / Runtime       Status        Action Needed
  ──────────────────────────────────────────────────────────────────────────
  ssh (OpenSSH)        ● MISSING     sudo apt install openssh-client
  Chromium LTS         ○ NOT FOUND   Run 'tuquet doctor --fix' to auto-download
```

---

## 3. Automated Self-Healing (`--fix`)

When run with the `--fix` flag, automatically resolves configuration drift, missing runtimes, and storage inconsistencies:

```bash
# Automatically remediate environment issues and download missing runtimes
tuquet doctor --fix
```

The remediation pipeline executes in sequence:
1. **Initializes SSOT Pillars**: Creates all missing canonical storage directories under `~/.tuquet/`.
2. **Initializes SQLite Store**: Runs schema migrations for `~/.tuquet/automa/automa.sqlite`.
3. **Provisions Antidetect Chromium**: Downloads and unpacks the verified C++ Antidetect Chromium LTS release.
4. **Validates Proxy Bridge**: Verifies SSH tunnel dependencies and default configurations.
