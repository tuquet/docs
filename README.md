# Specter Documentation Portal

Official documentation source for **Specter CLI** — Hạ tầng ẩn danh & Tự động hóa quy mô lớn.

- **Production Portal**: [https://tuquet.github.io/docs/](https://tuquet.github.io/docs/)
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
├── start/               # Quickstart, installation, first-profile, diagnostics
├── commands/            # Comprehensive 68 CLI commands reference
├── features/            # Antidetect fingerprint masking, profiles, Bézier mouse curves, personas
├── automation/          # CLI automation, headless stealth, native CDP, AI copilot (MCP)
├── proxy/               # Proxy setup (SOCKS5/HTTP), WebRTC leak shield, multi-VPS mesh bridge
├── solutions/           # Use cases (Affiliate, E-commerce, Scraping, SMM, Crypto)
├── mmo/                 # Operational runbooks (VCC, Proxy isolation, Domain, VPS, Catch-all email, Glossary)
└── index.md             # Landing page with interactive terminal showcase
```

## Local Development

```bash
pnpm install
pnpm dev
pnpm build
```
