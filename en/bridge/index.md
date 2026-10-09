# Bridge Mesh Gateway & Protocol Tunnel Supervisor

Corporate and data-center firewalls lock down outbound ports. Automation scripts leak real residential IPs through DNS fallback and silent socket drops. One unshielded TCP packet ruins months of profile farming.

**Bridge Mesh Gateway** is a standalone network tunnel supervisor and protocol adapter engineered in pure Rust (`tuquet-bridge`). Runs completely independent of Specter or embedded as the network backbone. It binds local SOCKS5 listeners, translates legacy HTTP `CONNECT` calls on port 8118, executes pre-flight egress verification before letting packets touch the wire, and auto-heals severed tunnels in under 3 seconds.

::: tip Standalone Microservice
`tuquet-bridge` operates as an independent daemon. Use it to establish multi-hop SOCKS5/HTTP tunnels and enforce WebRTC leak shielding across arbitrary CLI tools, git clients, and headless scrapers.
:::

<HairlineFigure name="router" />

---

## 1. Multi-VPS Mesh & Protocol Translation Architecture

```text
 ┌─────────────────────────────────────────────────────────────┐
 │             BRIDGE MESH GATEWAY ARCHITECTURE                │
 │                                                             │
 │   ┌──────────────────────┐       ┌──────────────────────┐   │
 │   │ Workstation Browser  │       │ Third-Party Tools    │   │
 │   │ (SOCKS5 Supported)   │       │ (HTTP Only)          │   │
 │   └──────────┬───────────┘       └──────────┬───────────┘   │
 │              │ (socks5://127.0.0.1:1080)    │ (http://127.0.0.1:8118)
 │              ▼                              ▼               │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │            Pure-Rust Local Bridge Engine            │   │
 │   │                                                     │   │
 │   │  • SOCKS5 Dynamic Listener (Port 1080)              │   │
 │   │  • Embedded HTTP-to-SOCKS5 Adapter (Port 8118)      │   │
 │   │  • Local Direct SSH Forwarder (Port 2222)           │   │
 │   │  • Auto-Healing Ping & Reconnect Loop (Supervisor)  │   │
 │   └─────────────────────────┬───────────────────────────┘   │
 │                             │                               │
 │                             ▼                               │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │           Encrypted SSH / WireGuard Mesh            │   │
 │   └──────────┬───────────────────────────────┬──────────┘   │
 │              │                               │              │
 │              ▼                               ▼              │
 │     ┌─────────────────┐             ┌─────────────────┐     │
 │     │ Remote VPS Node │             │ Residential IP  │     │
 │     │   (US West)     │             │    Gateway      │     │
 │     └─────────────────┘             └─────────────────┘     │
 └─────────────────────────────────────────────────────────────┘
```

1. **Embedded HTTP-to-SOCKS5 Bridge (Port 8118)**:
   - Many CLI scrapers, git clients, and legacy libraries only accept HTTP proxy URLs. Specter includes a pure-Rust HTTP proxy listener that translates HTTP `CONNECT` tunneling into local SOCKS5 sessions with sub-millisecond overhead.
2. **Local SSH Port Forwarding (Port 2222)**:
   - Exposes a direct SSH pipe into remote VPS nodes, enabling instantaneous terminal administration and file transfers (`ssh -p 2222 root@127.0.0.1`) without exposing port 22 to the public internet.
3. **Auto-Healing Supervisor Mode (`--foreground`)**:
   - Tunnels over commercial internet connections inevitably drop due to network jitter or ISP resets. The Bridge supervisor actively pings upstream endpoints, detects dead sockets, and re-establishes dropped tunnels within 3 seconds using exponential backoff.
4. **Public Egress Verification & STUN Shield**:
   - Validates that outgoing traffic actually emerges from the configured proxy IP, protecting against DNS and WebRTC leaks before any browser profile launches.

---

## 2. Command Reference

All bridge operations are managed via the `specter bridge` and `specter proxy` commands:

### Monitoring Bridge Health & Status

```bash
# Display interactive health check dashboard of all configured VPS nodes and ports
specter bridge status
```

Output summary:

```text
╭─ NETWORK BRIDGE & MULTI-VPS MESH ────────────── ● CONTROLLER READY ─╮
│  Workstation:    WORKSTATION-VN                                     │
│  Config Source:  ~/.specter/bridge/bridge.json                       │
│  Default Server: vps-us-01                                          │
╰─────────────────────────────────────────────────────────────────────╯

  Server ID      Endpoint          SSH      SOCKS5     Tags         Status
  ──────────────────────────────────────────────────────────────────────────
  vps-us-01      198.51.100.24     2222     1080       clean-ip     ONLINE
  vps-sg-02      203.0.113.88      2223     1081       mmo-farm     ONLINE
```

### Starting and Stopping Tunnels

```bash
# Start all enabled bridge connections in the background
specter bridge start

# Start bridges including the embedded HTTP-to-SOCKS5 adapter (port 8118)
specter bridge start --http

# Start bridge with direct SSH forwarding (port 2222)
specter bridge start --ssh

# Run supervisor in foreground (auto-reconnects dropped tunnels automatically)
specter bridge start -f

# Target a specific server or tag
specter bridge start vps-us-01
specter bridge start -t mmo-farm

# Stop running bridge tunnels
specter bridge stop
specter bridge stop all
```

### Probing Proxy Connectivity & Egress IP

```bash
# Probe connectivity, latency, and public egress IP of any proxy URL
specter proxy probe socks5://127.0.0.1:1080

# Probe proxy with JSON output for automated scripting
specter proxy probe http://127.0.0.1:8118 --json
```

### Managing Server Configurations

```bash
# Enable or disable a server in bridge.json without editing files manually
specter bridge enable vps-us-01
specter bridge disable vps-sg-02

# Validate configuration schema, port collisions, and workload definitions
specter bridge check

# Display or edit canonical configuration
specter bridge config --show
specter bridge config --edit
```

---

## 3. SSOT Storage & Configuration (Pillar 4)

In strict adherence to Specter's SSOT architecture, all bridge configurations and active process IDs resolve to `~/.specter/bridge/`:

```text
~/.specter/bridge/
├── bridge.json               # Canonical server list, port mappings, and credentials
├── bin/                      # Auxiliary tunnel binaries (ssh, cloudflared)
└── pids/                     # Background daemon process locks (<server>.json)
```

### `bridge.json` Specification

```json
{
  "$schema": "https://tuquet.com/schema/config/bridge.schema.json",
  "workstation": {
    "name": "WORKSTATION-VN",
    "default_server": "vps-us-01"
  },
  "http_proxy_port": 8118,
  "auto_reconnect": true,
  "servers": {
    "vps-us-01": {
      "host": "198.51.100.24",
      "user": "root",
      "ssh_port": 22,
      "local_socks_port": 1080,
      "local_ssh_port": 2222,
      "enabled": true,
      "tags": ["clean-ip", "us"]
    }
  }
}
```

---

## 4. Attaching Bridge Proxies to Browser Profiles

Once the bridge is active, route browser profiles directly through local ports:

```bash
# Launch profile through local SOCKS5 bridge
specter browser launch "Profile-US" --proxy socks5://127.0.0.1:1080

# Launch profile through local HTTP adapter
specter browser launch "Profile-US" --proxy http://127.0.0.1:8118
```

