# Quickstart Overview

**__PRODUCT__** is the agentic antidetect browser and CLI automation engine designed for AI agents, growth teams, and automation engineers to run multiple accounts without getting detected or banned.

> [!TIP] Command Architecture
> `specter` is the primary CLI command for browser profile lifecycle, stealth verification, and automation. Subcommands follow the canonical microservice domains (e.g. `specter browser launch`, `specter automa run`).

---

## What is an Antidetect Browser?

When you browse the internet, websites collect dozens of subtle tracking signals:
- **Hardware Parameters**: Graphic card renderer (WebGL), canvas noise, audio processor frequencies.
- **Network Parameters**: IP address, DNS servers, WebRTC local addresses.
- **Software Signatures**: Operating system, browser build, fonts, extensions, timezones, and screen resolution.

When multiple accounts share identical hardware fingerprints or IP addresses, security systems on platforms like Facebook, Google, Amazon, and TikTok immediately link the accounts and issue automated suspensions.

**Specter** solves this by generating a completely authentic, independent digital fingerprint for every profile you create. To the website, each profile looks like a brand-new physical computer located in your target region.

---

## 3-Minute Onboarding Path

1. **[Installation](/start/installation)**: Install the native client in under 15 seconds.
2. **[Your First Profile](/start/first-profile)**: Launch an isolated browser profile with a unique fingerprint and proxy.
3. **[Automa Workflow Automation](/automation/automa)**: Run automated tasks and workflows with a single command.
4. **[AI Agent Integration](/automation/ai-agent)**: Connect Claude, ChatGPT, or Cursor via native MCP.
5. **[Bridge & Proxy Setup](/proxy/bridge)**: Connect SOCKS5 or HTTP proxies to mask your IP.

---

## Essential Commands Cheat Sheet

| Action | Canonical Command | Shorthand Alias |
| :--- | :--- | :--- |
| **Launch Default Profile** | `specter browser launch default` | `specter launch default` |
| **Launch with Proxy** | `specter browser launch "Store-US" --proxy socks5://127.0.0.1:1080` | `specter launch "Store-US" --proxy ...` |
| **Launch in Headless Mode** | `specter browser launch "Scraper" --headless` | `specter launch "Scraper" --headless` |
| **List Profiles** | `specter browser profile list` | `specter profile list` |
| **Create New Profile** | `specter browser profile create "New-Profile"` | `specter profile create "New-Profile"` |
| **Verify Fingerprint / Turnstile** | `specter browser verify --url "https://..."` | — |
| **Check Environment Health** | `specter doctor` | — |
| **Interactive Terminal Shell**| `specter` | — |
