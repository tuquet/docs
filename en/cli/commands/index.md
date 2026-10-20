---
title: CLI Commands Reference
description: Comprehensive catalog of 68 canonical commands defined in the SSOT Manifest (~/.tuquet/).
---

# CLI Commands Reference

> **Single Source of Truth (SSOT):** All 68 commands, configuration flags, and arguments below are synchronized directly from `schema/cli.manifest.json`.
> For automated pipeline integrations: [Download Raw Schema (cli.manifest.json)](https://tuquet.com/schema/cli.manifest.json).

<HairlineFigure name="terminal" />

---

## Microservice Pillars Directory

| Pillar | SSOT Directory | Commands | Primary Domain & Purpose |
| :--- | :--- | :---: | :--- |
| [**System & Onboarding**](#system) | `~/.tuquet/system/` | **11** | Machine identity (.machine_id), shell history, and ecosystem-wide diagnostics. |
| [**Automa & Headless Scraper**](#automa) | `~/.tuquet/automa/` | **9** | Topological DAG workflow execution, variables, and CDP scraping engine. |
| [**Stealth Browser & Profiles**](#browser) | `~/.tuquet/browser/` | **29** | C++ Antidetect Chromium launch, deterministic PRNG spoofing, and profile sandboxing. |
| [**Proxy Tunnel & Network Mesh**](#bridge) | `~/.tuquet/bridge/` | **7** | Network tunnels, SOCKS5 routing (1080), embedded HTTP adapter (8118), and mesh supervisor. |
| [**Faker & Synthetic Personas**](#faker) | `~/.tuquet/faker/` | **2** | Synthetic personas, valid 12-digit Modulo 11 CCCDs, and Vietnamese demographic profiles. |
| [**Runner Supervisor & Daemon**](#runner) | `~/.tuquet/automa/` | **7** | Native background worker supervisor daemon. Automatically reaps child processes (Zero Zombie). |
| [**Cloud Center Fleet**](#cloud) | `~/.tuquet/system/` | **3** | Central operation plane (PostgreSQL 15+ RLS) and distributed lease locks. |

---

## System & Onboarding {#system}

> **SSOT Storage Root:** `~/.tuquet/system/`

### `tuquet bootstrap`

**Description:** Initialize 5 SSOT storage pillars, SQLite database, native MCP stdio server, and download Chromium Golden LTS.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--force` | `-f` | `boolean` | `` | Force re-download and re-provisioning of runtimes even if already present. |

::: details Example Syntax
```bash
# One-Command Workstation Onboarding
tuquet bootstrap
```
:::

---

### `tuquet config`

**Description:** Inspect or edit configuration across microservice pillars (~/.tuquet/).

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `service` | `choice` | No | Target service (bridge, automa, runner, browser, cloud, system, faker) |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--edit` | `-e` | `boolean` | `` | Open target configuration file in system default editor. |
| `--show` | `-s` | `boolean` | `` | Display structured configuration details and summary card. |

::: details Example Syntax
```bash
# Unified Configuration Manager
tuquet config
```
:::

---

### `tuquet doctor`

**Description:** Check system dependencies, required tools, network tunnels, and environment health.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--fix` | `-f` | `boolean` | `` | Attempt automatic remediation of missing dependencies where supported. |

::: details Example Syntax
```bash
# System & Dependency Health Check
tuquet doctor
```
:::

---

### `tuquet mcp`

**Description:** Run Model Context Protocol (MCP) JSON-RPC 2.0 stdio server for AI agents.

::: details Example Syntax
```bash
# Run MCP Stdio Server
tuquet mcp
```
:::

---

### `tuquet schema`

**Description:** Inspect and export CLI command manifests and microservice JSON schemas.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--json` | `-j` | `boolean` | `` | Output schema in raw JSON format for machine parsing. |

::: details Example Syntax
```bash
# Schema Manifest & Introspection
tuquet schema
```
:::

---

### `tuquet schema commands`

**Description:** List or export the full command manifest catalog matching the VS Code contributes standard.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--pillar` | `-p` | `string` | — | Filter commands by microservice pillar domain. |
| `--json` | `-j` | `boolean` | `` | Output catalog in raw JSON format. |

::: details Example Syntax
```bash
# Export Command Manifest
tuquet schema commands
```
:::

---

### `tuquet schema config`

**Description:** Export the JSON Schema definition for a microservice configuration file.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `service` | `choice` | <span class="badge-tag success">Yes</span> | Service configuration schema to output |

::: details Example Syntax
```bash
# Export Configuration JSON Schema
tuquet schema config
```
:::

---

### `tuquet schema mcp`

**Description:** Export the AI Agent Model Context Protocol (MCP) tool schemas generated from this manifest.

::: details Example Syntax
```bash
# Export MCP Agent Tools Catalog
tuquet schema mcp
```
:::

---

### `tuquet shell`

**Description:** Launch interactive scoped terminal shell session with auto-completion and hotkeys.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `service` | `string` | No | Optional service domain to scope REPL into (automa, browser, bridge, faker). |

::: details Example Syntax
```bash
# Interactive REPL Shell
tuquet shell
```
:::

---

### `tuquet status`

**Description:** Show unified status overview across Cloud, Runner, Bridge, and Antidetect Browser.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `status`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--json` | `-j` | `boolean` | `` | Output status in raw JSON format for machine parsing and automation pipelines. |

::: details Example Syntax
```bash
# System Status Overview
tuquet status
```
:::

---

### `tuquet upgrade`

**Description:** Check and atomically upgrade CLI binary in-place to latest release.

::: details Example Syntax
```bash
# upgrade CLI
tuquet upgrade
```
:::

---

## Automa & Headless Scraper {#automa}

> **SSOT Storage Root:** `~/.tuquet/automa/`

### `tuquet automa inspect`

**Description:** Inspect and validate a workflow JSON file, its block sequence, and parameters.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `workflow_inspect`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `workflow` | `string` | <span class="badge-tag success">Yes</span> | Path to workflow file or saved workflow ID. |

::: details Example Syntax
```bash
# Inspect Workflow DAG
tuquet automa inspect
```
:::

---

### `tuquet automa probe`

**Description:** Probe Automa manifest capabilities and protocol version.

::: details Example Syntax
```bash
# Probe Automation Engine
tuquet automa probe
```
:::

---

### `tuquet automa run`

**Description:** Execute a DAG workflow directly via Chromium automation worker.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `workflow_run`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `workflow_pos` | `string` | No | Positional path or saved workflow ID. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--workflow` | `-w` | `string` | — | Path to workflow JSON file or stored workflow ID. |
| `--headless` | — | `boolean` | `` | Run browser in headless mode. |
| `--var` | `-p` | `string` | — | Workflow variable overrides in KEY=VALUE format. |
| `--timeout` | `-t` | `integer` | — | Optional execution timeout in seconds. |

::: details Example Syntax
```bash
# Execute Automation Workflow
tuquet automa run
```
:::

---

### `tuquet automa studio`

**Description:** Launch Automa Web Studio in default system browser.

::: details Example Syntax
```bash
# Launch Automa Web Studio
tuquet automa studio
```
:::

---

### `tuquet automa workflow delete`

**Description:** Delete a workflow from database and vault.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Workflow ID to delete. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--vault` | — | `boolean` | `true` | Also delete from vault directory if present. |

::: details Example Syntax
```bash
# Delete Stored Workflow
tuquet automa workflow delete
```
:::

---

### `tuquet automa workflow export`

**Description:** Export a workflow from database or vault to a JSON file.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Workflow ID or Name to export. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--output` | `-o` | `path` | — | Destination file path (default: &lt;id&gt;.workflow.json). |

::: details Example Syntax
```bash
# Export Workflow File
tuquet automa workflow export
```
:::

---

### `tuquet automa workflow import`

**Description:** Import a workflow file (.json) into SQLite database and vault.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `file` | `path` | <span class="badge-tag success">Yes</span> | Path to workflow JSON file (.workflow.json or .json). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--id` | — | `string` | — | Custom identifier for the workflow. |
| `--name` | `-n` | `string` | — | Custom display name for the workflow. |
| `--description` | `-d` | `string` | — | Custom description for the workflow. |

::: details Example Syntax
```bash
# Import Workflow File
tuquet automa workflow import
```
:::

---

### `tuquet automa workflow info`

**Description:** Inspect details, triggers, parameters, and block sequence of a stored workflow.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Workflow ID or Name. |

::: details Example Syntax
```bash
# Inspect Stored Workflow Details
tuquet automa workflow info
```
:::

---

### `tuquet automa workflow list`

**Description:** List all workflows saved in SQLite database and local file vault.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `workflow_list`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--search` | `-s` | `string` | — | Filter workflows by keyword. |

::: details Example Syntax
```bash
# List Stored Workflows
tuquet automa workflow list
```
:::

---

## Stealth Browser & Profiles {#browser}

> **SSOT Storage Root:** `~/.tuquet/browser/`

### `tuquet browser clean`

**Description:** Delete installed browser runtime to reclaim disk space.

::: details Example Syntax
```bash
# Clean Browser Runtimes
tuquet browser clean
```
:::

---

### `tuquet browser ext add`

**Description:** Register a new browser extension from an unpacked directory.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `path` | `path` | <span class="badge-tag success">Yes</span> | Path to unpacked extension directory containing manifest.json. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--id` | `-i` | `string` | — | Optional custom ID for the extension (defaults to slugified manifest name). |

::: details Example Syntax
```bash
# Add Local Extension
tuquet browser ext add
```
:::

---

### `tuquet browser ext catalog`

**Description:** Browse and search available extensions from scoop catalog.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `query` | `string` | No | Optional keyword to filter extensions. |

::: details Example Syntax
```bash
# Browse Extensions Catalog
tuquet browser ext catalog
```
:::

---

### `tuquet browser ext disable`

**Description:** Disable an extension.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Extension ID to disable. |

::: details Example Syntax
```bash
# Disable Extension
tuquet browser ext disable
```
:::

---

### `tuquet browser ext enable`

**Description:** Enable an extension for automated browser sessions.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Extension ID to enable. |

::: details Example Syntax
```bash
# Enable Extension
tuquet browser ext enable
```
:::

---

### `tuquet browser ext info`

**Description:** Show detailed metadata and manifest for an extension.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | No | Extension ID to inspect (defaults to 'automa'). |

::: details Example Syntax
```bash
# Extension Information
tuquet browser ext info
```
:::

---

### `tuquet browser ext install`

**Description:** Download and install an extension package from scoop catalog.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Extension ID from catalog (e.g. 'automa', 'ublock', 'cookie-injector'). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--force` | `-f` | `boolean` | `` | Force re-download and overwrite existing installation. |

::: details Example Syntax
```bash
# Install Extension Package
tuquet browser ext install
```
:::

---

### `tuquet browser ext launch`

**Description:** Launch browser with specified extension(s) or all enabled extensions.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--ext` | `-e` | `string` | — | Comma-separated extension IDs to load (or 'all' for all enabled). |
| `--browser` | `-b` | `string` | `chrome` | Target browser to launch (chrome, edge, brave). |

::: details Example Syntax
```bash
# Launch Browser With Extensions
tuquet browser ext launch
```
:::

---

### `tuquet browser ext list`

**Description:** List all registered browser extensions.

::: details Example Syntax
```bash
# List Registered Extensions
tuquet browser ext list
```
:::

---

### `tuquet browser ext path`

**Description:** Print the absolute filesystem path of an extension (defaults to 'automa').

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | No | Extension ID (defaults to 'automa'). |

::: details Example Syntax
```bash
# Extension Filesystem Path
tuquet browser ext path
```
:::

---

### `tuquet browser ext remove`

**Description:** Unregister a browser extension by ID.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Extension ID to remove. |

::: details Example Syntax
```bash
# Remove Extension
tuquet browser ext remove
```
:::

---

### `tuquet browser install`

**Description:** Download and provision Chromium C++ Antidetect engine from curated manifest.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `version` | `string` | No | Target version or channel (e.g. '148', 'v148', '144', 'lts'). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--force` | `-f` | `boolean` | `` | Force re-download even if already installed. |

::: details Example Syntax
```bash
# Install Antidetect Chromium
tuquet browser install
```
:::

---

### `tuquet browser launch`

**Description:** Launch an antidetect browser profile with direct CDP DevTools bridge.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `profile` | `string` | No | Target profile ID or name (default: 'default'). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--port` | `-p` | `integer` | `9222` | Chrome DevTools Protocol (CDP) port for Playwright / Puppeteer automation. |
| `--headless` | — | `boolean` | `` | Run browser in headless mode. |
| `--url` | `-u` | `string` | — | Initial URL to navigate to. |
| `--detach` | `-d` | `boolean` | `` | Run in background without keeping terminal attached. |
| `--proxy` | — | `string` | — | Override proxy server (e.g. socks5://127.0.0.1:1080). |
| `--mode` | `-m` | `string` | `driver` | Automation mode: 'driver' or 'extension'. |
| `--no_cdp` | — | `boolean` | `` | Shortcut for --mode extension (disables remote debugging port completely). |
| `--skip_proxy_check` | — | `boolean` | `` | Bypass pre-flight proxy healthcheck and launch immediately. |

::: details Example Syntax
```bash
# Launch Browser In Profile
tuquet browser launch
```
:::

---

### `tuquet browser list`

**Description:** List all locally installed Chromium runtimes on this workstation.

::: details Example Syntax
```bash
# List Installed Browser Engines
tuquet browser list
```
:::

---

### `tuquet browser path`

**Description:** Print the absolute executable path of the browser (for scripting / integrations).

::: details Example Syntax
```bash
# Browser Executable Path
tuquet browser path
```
:::

---

### `tuquet browser profile cloud acquire`

**Description:** Acquire exclusive distributed lease lock on a cloud browser profile.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Cloud Browser Profile ID (UUID) or name. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--json` | — | `boolean` | `` | Output result in raw JSON format. |

::: details Example Syntax
```bash
# Acquire Cloud Profile Lease Lock
tuquet browser profile cloud acquire
```
:::

---

### `tuquet browser profile cloud list`

**Description:** List all central cloud browser profiles in current tenant.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--json` | — | `boolean` | `` | Output result in raw JSON format. |

::: details Example Syntax
```bash
# List Cloud Browser Profiles
tuquet browser profile cloud list
```
:::

---

### `tuquet browser profile cloud release`

**Description:** Release distributed lease lock and synchronize session delta back to cloud.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Cloud Browser Profile ID (UUID) or name. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--json` | — | `boolean` | `` | Output result in raw JSON format. |

::: details Example Syntax
```bash
# Release Cloud Profile Lease Lock
tuquet browser profile cloud release
```
:::

---

### `tuquet browser profile create`

**Description:** Create a new isolated profile with deterministic hardware specs and PRNG seed.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | <span class="badge-tag success">Yes</span> | Profile name (e.g. Facebook-Ad-VN, TikTok-US). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--seed` | `-s` | `integer` | — | Deterministic PRNG seed (random u32 if omitted). |
| `--os` | — | `choice` | `windows` | Operating system platform to spoof. |
| `--cores` | — | `integer` | — | CPU cores count to spoof in navigator.hardwareConcurrency. |
| `--ram` | — | `integer` | — | RAM size in GB to spoof in navigator.deviceMemory. |
| `--proxy` | — | `string` | — | Proxy URL to route profile traffic (e.g. socks5://127.0.0.1:1080). |

::: details Example Syntax
```bash
# Create Browser Profile
tuquet browser profile create
```
:::

---

### `tuquet browser profile delete`

**Description:** Delete a browser profile and permanently purge its sandbox directory.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Profile identifier or display name. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--force` | `-f` | `boolean` | `` | Force deletion without confirmation prompt. |

::: details Example Syntax
```bash
# Delete Browser Profile
tuquet browser profile delete
```
:::

---

### `tuquet browser profile inspect`

**Description:** Inspect detailed hardware fingerprint specifications of an isolated profile.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Profile identifier or display name. |

::: details Example Syntax
```bash
# Inspect Profile Hardware Specs
tuquet browser profile inspect
```
:::

---

### `tuquet browser profile list`

**Description:** List all local browser profiles in ~/.tuquet/browser/profiles/.

::: details Example Syntax
```bash
# List Browser Profiles
tuquet browser profile list
```
:::

---

### `tuquet browser profile pack`

**Description:** Pack a profile into a lightweight .tar.zst archive with cache filtering and SHA-256 hash.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Profile identifier to compress. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--output` | `-o` | `path` | — | Custom destination archive path. |
| `--level` | `-l` | `integer` | `3` | Zstandard compression level (1-19). |

::: details Example Syntax
```bash
# Pack Profile Snapshot
tuquet browser profile pack
```
:::

---

### `tuquet browser profile test-proxy`

**Description:** Probe and test the proxy configured for a specific profile.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | <span class="badge-tag success">Yes</span> | Profile ID or name. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--timeout` | `-t` | `integer` | `5` | Probe timeout in seconds (default: 5). |
| `--json` | — | `boolean` | `` | Output diagnostic result in raw JSON format. |

::: details Example Syntax
```bash
# Test Profile Proxy
tuquet browser profile test-proxy
```
:::

---

### `tuquet browser profile unpack`

**Description:** Unpack and restore a profile from a .tar.zst archive into SSOT storage with integrity check.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `archive` | `path` | <span class="badge-tag success">Yes</span> | Path to .tar.zst profile archive. |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--hash` | — | `string` | — | Optional expected SHA-256 integrity hash. |

::: details Example Syntax
```bash
# Unpack Profile Snapshot
tuquet browser profile unpack
```
:::

---

### `tuquet browser search`

**Description:** Search and list available engine releases from the curated manifest.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--remote` | `-r` | `boolean` | `` | Force refreshing remote manifest from GitHub CDN. |

::: details Example Syntax
```bash
# Search Browser Releases
tuquet browser search
```
:::

---

### `tuquet browser status`

**Description:** Display installation status, executable path, and disk usage of dedicated browser.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `browser_status`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

::: details Example Syntax
```bash
# Browser Engine Status
tuquet browser status
```
:::

---

### `tuquet browser use`

**Description:** Switch the active Chromium antidetect version (e.g. '148', '144', 'lts').

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `version` | `string` | <span class="badge-tag success">Yes</span> | Version identifier or alias to activate. |

::: details Example Syntax
```bash
# Switch Active Browser Engine
tuquet browser use
```
:::

---

### `tuquet browser verify`

**Description:** Live visual verification & stealth presentation (Cloudflare Turnstile, Bézier mouse, smooth scroll).

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--url` | `-u` | `string` | — | Target URL to test (defaults to Cloudflare Turnstile challenge test). |
| `--headless` | — | `boolean` | `` | Run in headless mode. |
| `--timeout` | `-t` | `integer` | `30` | Timeout in seconds for challenge resolution. |

::: details Example Syntax
```bash
# Live Stealth Verification Demo
tuquet browser verify
```
:::

---

## Proxy Tunnel & Network Mesh {#bridge}

> **SSOT Storage Root:** `~/.tuquet/bridge/`

### `tuquet bridge check`

**Description:** Validate ~/.tuquet/bridge/bridge.json configuration schema, ports, and workloads.

::: details Example Syntax
```bash
# Validate Bridge Configuration
tuquet bridge check
```
:::

---

### `tuquet bridge disable`

**Description:** Disable a server in bridge configuration (~/.tuquet/bridge/bridge.json).

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `server` | `string` | <span class="badge-tag success">Yes</span> | Server identifier to disable (e.g. my-vps, may-b). |

::: details Example Syntax
```bash
# Disable Bridge Server
tuquet bridge disable
```
:::

---

### `tuquet bridge enable`

**Description:** Enable a server in bridge configuration (~/.tuquet/bridge/bridge.json).

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `server` | `string` | <span class="badge-tag success">Yes</span> | Server identifier to enable (e.g. my-vps, may-b). |

::: details Example Syntax
```bash
# Enable Bridge Server
tuquet bridge enable
```
:::

---

### `tuquet bridge start`

**Description:** Start background SOCKS5 proxy (1080) and HTTP adapter (8118) for configured VPS servers.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `server` | `string` | No | Target server identifier or pattern (e.g. my-vps). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--http` | — | `boolean` | `` | Also start pure Rust HTTP-to-SOCKS5 bridge (port 8118). |
| `--ssh` | — | `boolean` | `` | Also start direct SSH tunnel on port 2222. |
| `--foreground` | `-f` | `boolean` | `` | Run supervisor in foreground with auto-healing until Ctrl+C. |

::: details Example Syntax
```bash
# Start Bridge Mesh Tunnels
tuquet bridge start
```
:::

---

### `tuquet bridge status`

**Description:** Show health check dashboard of all configured VPSs, ports, and proxy workloads.

::: details Example Syntax
```bash
# Bridge Mesh Status
tuquet bridge status
```
:::

---

### `tuquet bridge stop`

**Description:** Stop running bridge tunnels and proxy background daemons.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `server` | `string` | No | Server identifier to stop, or omit to stop all. |

::: details Example Syntax
```bash
# Stop Bridge Tunnels
tuquet bridge stop
```
:::

---

### `tuquet proxy probe`

**Description:** Probe connectivity, latency, and public egress IP of a proxy.

**Arguments:**

| Argument | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `url` | `string` | <span class="badge-tag success">Yes</span> | Target proxy URL (e.g. socks5://127.0.0.1:1080 or http://127.0.0.1:8118). |

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--timeout` | `-t` | `integer` | `5` | Probe timeout in seconds (default: 5). |
| `--json` | — | `boolean` | `` | Output diagnostic result in raw JSON format. |

::: details Example Syntax
```bash
# Probe Proxy Egress & Latency
tuquet proxy probe
```
:::

---

## Faker & Synthetic Personas {#faker}

> **SSOT Storage Root:** `~/.tuquet/faker/`

### `tuquet faker card`

**Description:** Inspect a single detailed persona card with full credentials and citizen data.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--gender` | `-g` | `string` | — | Filter by gender. |

::: details Example Syntax
```bash
# Display Detailed Persona Card
tuquet faker card
```
:::

---

### `tuquet faker generate`

**Description:** Generate compliant personas with validated 12-digit CCCD, phone, and addresses.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `faker_generate`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--count` | `-n` | `integer` | `1` | Number of profiles to generate. |
| `--gender` | `-g` | `choice` | — | Filter by gender: male, female, or all. |
| `--nat` | — | `string` | `VN` | Filter by nationality (VN, US, JP). |
| `--format` | `-f` | `choice` | `table` | Output format: table, card, json, or csv. |
| `--output` | `-o` | `path` | — | Optional file path to export output to. |

::: details Example Syntax
```bash
# Generate Synthetic Identities
tuquet faker generate
```
:::

---

## Runner Supervisor & Daemon {#runner}

> **SSOT Storage Root:** `~/.tuquet/automa/` (runner.json, automa.sqlite)

### `tuquet runner logs`

**Description:** View or tail runner daemon execution and telemetry logs.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--follow` | `-f` | `boolean` | `` | Follow / stream log output continuously. |
| `--lines` | `-n` | `integer` | `50` | Number of tail lines to display. |

::: details Example Syntax
```bash
# View Runner Logs
tuquet runner logs
```
:::

---

### `tuquet runner probe`

**Description:** Active capability negotiation probe returning manifest JSON for Runner.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `runner_probe`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

::: details Example Syntax
```bash
# Probe Runner Capabilities
tuquet runner probe
```
:::

---

### `tuquet runner restart`

**Description:** Restart the local runner daemon.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--detach` | `-d` | `boolean` | `` | Run in background as detached daemon process. |

::: details Example Syntax
```bash
# Restart Runner Daemon
tuquet runner restart
```
:::

---

### `tuquet runner start`

**Description:** Start local runner daemon and cloud worker HTTP server on port 8765.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--port` | `-p` | `integer` | `8765` | Listening HTTP port. |
| `--detach` | `-d` | `boolean` | `` | Run in background as detached daemon process. |

::: details Example Syntax
```bash
# Start Runner Daemon
tuquet runner start
```
:::

---

### `tuquet runner status`

**Description:** Inspect local runner daemon status and health check endpoint.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--json` | `-j` | `boolean` | `` | Output status in raw JSON format. |

::: details Example Syntax
```bash
# Runner Daemon Status
tuquet runner status
```
:::

---

### `tuquet runner stop`

**Description:** Gracefully stop the running runner daemon.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--force` | `-f` | `boolean` | `` | Force terminate without waiting for active jobs. |

::: details Example Syntax
```bash
# Stop Runner Daemon
tuquet runner stop
```
:::

---

### `tuquet runner worker`

**Description:** Run as an autonomous cloud fleet worker polling and executing jobs.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--cloud_profile` | — | `string` | — | Target cloud profile ID or name to execute. |
| `--workflow` | `-w` | `string` | — | Path to workflow JSON file to execute on cloud profile. |
| `--headless` | — | `boolean` | `` | Headless browser execution. |
| `--interval` | `-i` | `integer` | `15` | Poll interval in seconds (default: 15). |
| `--once` | — | `boolean` | `` | Run once and exit. |

::: details Example Syntax
```bash
# Cloud Fleet Mesh Worker
tuquet runner worker
```
:::

---

## Cloud Center Fleet {#cloud}

> **SSOT Storage Root:** `~/.tuquet/system/` (system.json, .identity.json)

### `tuquet cloud login`

**Description:** Authenticate and enroll this workstation with Cloud.

**Options & Flags:**

| Flag | Shorthand | Type | Default | Description |
| :--- | :---: | :---: | :---: | :--- |
| `--url` | `-u` | `string` | — | Cloud endpoint URL (e.g. https://cloud.tuquet.dev). |
| `--token` | `-t` | `string` | — | Organization / Tenant enrollment token. |
| `--name` | `-n` | `string` | — | Custom workstation name (defaults to machine hostname). |

::: details Example Syntax
```bash
# Cloud Authentication Login
tuquet cloud login
```
:::

---

### `tuquet cloud logout`

**Description:** Log out and disconnect this workstation from Cloud.

::: details Example Syntax
```bash
# Cloud Disconnect & Logout
tuquet cloud logout
```
:::

---

### `tuquet cloud whoami`

**Description:** Show current Cloud identity, enrolled device GUID, and tenant ID.

::: tip Native Model Context Protocol (MCP) Tool
Exported as a native Model Context Protocol (MCP) tool named `cloud_whoami`. Autonomous AI agents (Claude Code, Cursor, Antigravity) can invoke this tool directly over stdio without glue code.
:::

::: details Example Syntax
```bash
# Display Cloud Enrollment Identity
tuquet cloud whoami
```
:::

---


