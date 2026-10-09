---
layout: home

hero:
  name: "Specter CLI"
  text: "Run hundreds of stealth browsers. Zero lag. Zero fingerprint leaks."
  tagline: "Local-first stealth Chromium orchestration and distributed edge automation engine. 100% Free & Open-Source. Each profile is an isolated clean workstation with dedicated proxy routing and kernel-level process containment (Zero Zombie)."
  image:
    src: /logo.svg
    alt: "Specter Isometric Turntable"
  actions:
    - theme: brand
      text: Install in 15s (One-Liner)
      link: "#install"
    - theme: alt
      text: Explore CLI Commands →
      link: "/en/specter/commands/"
---

<ProofStrip />

<HeroShowcase />

<SpecterCaps />

<div id="install" class="main-content-wrapper">

## Quick Installation (One-Liner)

A single command for any workstation, VPS, or CI/CD environment:

::: code-group

```powershell [Windows (PowerShell)]
irm https://tuquet.com/install.ps1 | iex
```

```bash [Linux / VPS / macOS]
curl -fsSL https://tuquet.com/install.sh | bash
```

```powershell [Scoop Package Manager]
scoop bucket add tuquet https://github.com/tuquet/scoop-bucket
scoop install specter
```

```bash [Rust Cargo (Source)]
cargo install --git https://github.com/tuquet/cli specter
```

:::

---

## 5 Core Operational Commands

The entire operational workflow condensed into straightforward, intuitive commands:

```bash
# 1. Initialize SSOT environment (~/.specter/) and provision Chromium LTS
specter bootstrap

# 2. Launch profile bound to residential proxy (WebRTC & DNS shielded)
specter browser launch "Store-US-01" --proxy socks5://user:pass@ip:port

# 3. Live stealth verification (Cloudflare Turnstile & Bézier cursor)
specter browser verify --url "https://turnstile.zerocdn.com"

# 4. Probe latency and verify public egress IP before opening tabs
specter proxy probe socks5://user:pass@ip:port

# 5. Execute headless automation workflow via pure-Rust CDP driver
specter automa run ./workflows/scrape.json --headless
```

---

## Core Capabilities Matrix

| Domain | Canonical Command | Technology & Value Delivered |
| :--- | :--- | :--- |
| **Dropship & E-Com** | `specter browser launch` | Complete isolation of Canvas, WebGL, AudioContext, and Fonts. Each profile behaves as an independent physical device. |
| **Web Scraping** | `specter automa run` | Pierces closed Shadow DOM, bypasses Turnstile, inertial deceleration scroll. Ultra-low RAM footprint. |
| **Cloud Fleet** | `specter browser profile cloud` | Syncs profiles via Supabase (PostgreSQL + RLS). Distributed lease locks (`acquire`/`release`) prevent account collisions. |
| **Proxy Gateway** | `specter proxy probe` | Automated pre-flight probe verifies clean IP, country location, and eliminates WebRTC leaks before opening tabs. |
| **Synthetic Personas** | `specter faker generate` | Generates authentic test identities (names, birthdays, addresses, valid CCCDs) for instant automated form filling. |

---

## Frequently Asked Questions (FAQ)

::: details 1. Is Specter CLI truly free and open-source?
100% free and open-source under the MIT license. No licensing keys, no monthly SaaS tiers, and no profile limits (bounded only by your local disk storage).
:::

::: details 2. Where is my profile data stored?
100% Local-First. All profiles, session cookies, and execution histories reside under `~/.specter/` on your local workstation, or inside your self-hosted Supabase database. Zero data is ever sent to third-party telemetry servers.
:::

::: details 3. How do I coordinate browser fleets across multiple VPS instances?
Use `specter browser profile cloud acquire/release` combined with the Supabase backend. Headless worker nodes on VPS instances poll tasks, checkout profiles via lease locks, and synchronize session state automatically.
:::

</div>
