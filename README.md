# Tuquet Documentation Portal

Official documentation source for **Tuquet Lab** — Autonomous Agent Ecosystem & Distributed Mesh Runtime.

- **Production Portal (SSOT)**: [https://docs.tuquet.com/](https://docs.tuquet.com/)
- **Framework**: [VitePress](https://vitepress.dev/) & Vue 3 SSG
- **Single Source of Truth**: Serves as the primary documentation hub for all architecture, CLI references, and plugin specifications.

## 📖 Structure

```text
docs/
├── .vitepress/          # Configuration, theme, navigation, and sidebar
├── en/
│   ├── gateway/         # SOCKS5/HTTP tunnel supervisor, multi-VPS mesh, WebRTC shield
│   ├── worker/          # Bare-metal workstation compute daemon & enrollment
│   ├── automation/      # Pure-Rust CDP engine, headless mode & stealth sandboxes
│   ├── cloud/           # Multi-tenant RBAC control hub, database plugins & telemetry
│   ├── browser/         # Fingerprint spoofing, anti-detect profiles & storage
│   └── cli/             # 4 Core Commands catalog & guides
└── index.md             # Landing page
```

## 🛠️ Local Development

```bash
pnpm install
pnpm dev
pnpm build
```
