# Specter Documentation Portal

Official documentation source for **Specter CLI** — Hạ tầng ẩn danh & Tự động hóa quy mô lớn.

- **Production Portal**: [https://docs.tuquet.com/](https://docs.tuquet.com/)
- **Built With**: VitePress 1.6 & Vue 3 SSG
- **Design System**: shadcn/ui (Zinc & Slate) + Lucide Icons
- **Single Source of Truth**: Driven by `~/.specter/` canonical specifications & `schema/cli.manifest.json`

## Documentation Structure

```text
docs/
├── .vitepress/          # Site configuration, theme overrides, brand macros, and Vue components
│   ├── theme/           # CSS design system (shadcn zinc tokens) and layout customization
│   │   ├── components/  # Vue components (HeroShowcase, ProofStrip, SpecterCaps, BackgroundGlow, SiteFooter)
│   │   └── style.css    # Design system tokens and component styles
│   └── config.mts       # Navigation, sidebar, and build-time macro pre-processor
├── en/
│   ├── browser/         # Stealth Chromium runtime, hardware spoofing, Bézier physics
│   ├── automa/          # DAG automation engine, headless mode, pure-Rust CDP
│   ├── bridge/          # SOCKS5/HTTP tunnel supervisor, multi-VPS mesh, WebRTC shield
│   ├── runner/          # Bare-metal workstation daemon, OS job objects, zero-zombie process tree
│   ├── cloud/           # Multi-tenant RBAC control hub, PostgreSQL 15+ RLS, lease locks
│   └── cli/             # Unified combat binary, 68 commands catalog, faker, MCP skills
│       └── playbooks/   # Combat playbooks (Affiliate, E-commerce, Scraping, SMM, Crypto)
└── index.md             # Landing page with interactive terminal showcase
```

## Local Development

```bash
pnpm install
pnpm dev
pnpm build
```
