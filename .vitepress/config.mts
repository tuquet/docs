// Prevent Windows EPERM unlink error on .temp directory during VitePress build
process.env.DEBUG = process.env.DEBUG || '1'

import { defineConfig } from 'vitepress'
import brand from './brand.config.json'

// 1. Standalone Microservice Sidebars (Decoupled & Isolated)
const browserSidebar = [
  {
    text: 'Stealth Browser',
    collapsed: false,
    items: [
      { text: 'Runtime & Sandbox', link: '/en/browser/' },
      { text: 'Profile Isolation', link: '/en/browser/profiles' },
      { text: 'Fingerprint Masking', link: '/en/browser/fingerprinting' },
      { text: 'Human Bézier Dynamics', link: '/en/browser/human-behavior' },
    ],
  },
]

const automationSidebar = [
  {
    text: 'Automation Engine',
    collapsed: false,
    items: [
      { text: 'Workflow Automation', link: '/en/automation/' },
      { text: 'Headless Stealth Mode', link: '/en/automation/stealth-headless' },
      { text: 'Native Rust CDP Protocol', link: '/en/automation/cdp' },
    ],
  },
]

const gatewaySidebar = [
  {
    text: 'Network Gateway',
    collapsed: false,
    items: [
      { text: 'SOCKS5 & HTTP Tunnels', link: '/en/gateway/' },
      { text: 'Priority & Roadmap', link: '/en/gateway/roadmap' },
      { text: 'Multi-Server Mesh', link: '/en/gateway/mesh' },
      { text: 'WebRTC Leak Shield', link: '/en/gateway/webrtc' },
    ],
  },
]

const workerSidebar = [
  {
    text: 'Distributed Worker',
    collapsed: false,
    items: [
      { text: 'Workstation Daemon & HTTP API', link: '/en/worker/' },
    ],
  },
]

const cloudSidebar = [
  {
    text: 'Cloud & Desktop Control Plane',
    collapsed: false,
    items: [
      { text: 'Universal Control Plane & Multi-Tenancy', link: '/en/cloud/' },
      { text: 'Database & Plugin Architecture', link: '/en/cloud/architecture' },
      { text: 'Domain & Terminology Dictionary', link: '/en/cloud/terminology' },
      { text: 'Test Presets & Verification Guide', link: '/en/cloud/test-presets' },
    ],
  },
]

const adminSidebar = [
  {
    text: 'Admin Portal',
    items: [
      { text: 'Overview & SSOT', link: '/en/admin/' },
    ],
  },
  {
    text: 'Architecture',
    collapsed: false,
    items: [
      { text: 'System Architecture', link: '/en/admin/architecture/overview' },
      { text: 'Design Tokens & Styling', link: '/en/admin/architecture/styling-guide' },
    ],
  },
  {
    text: 'Architecture Decisions (ADRs)',
    collapsed: false,
    items: [
      { text: 'ADR-001: Routing & PostgREST', link: '/en/admin/decisions/0001-routing-architecture' },
      { text: 'ADR-002: Typography & Fonts', link: '/en/admin/decisions/0002-typography-and-font-system' },
      { text: 'ADR-003: Platform Superadmin', link: '/en/admin/decisions/0003-platform-superadmin' },
      { text: 'ADR-004: VxeGrid & Terminology', link: '/en/admin/decisions/0004-vxe-grid-form-and-i18n-terminology' },
    ],
  },
  {
    text: 'Route Modules',
    collapsed: false,
    items: [
      { text: 'Overview & Matrix', link: '/en/admin/routes/' },
      { text: 'Authentication (Auth)', link: '/en/admin/routes/auth' },
      { text: 'Analytics Dashboard', link: '/en/admin/routes/dashboard' },
      { text: 'Tenants & Workspaces', link: '/en/admin/routes/tenants' },
      { text: 'Automation Subsystem', link: '/en/admin/routes/automation' },
      { text: 'Digital Commerce', link: '/en/admin/routes/commerce' },
      { text: 'System & Governance', link: '/en/admin/routes/system' },
    ],
  },
  {
    text: 'Milestones & Phases',
    collapsed: true,
    items: [
      { text: 'Phase Roadmap Overview', link: '/en/admin/phases/' },
      { text: 'Phase 01: IAM & Multi-Tenancy', link: '/en/admin/phases/phase-01-enterprise-iam-multitenancy/' },
      { text: 'Phase 02: Payment Gateway', link: '/en/admin/phases/phase-02-omnichannel-payment-gateway/' },
      { text: 'Phase 03: Digital Commerce', link: '/en/admin/phases/phase-03-digital-commerce-fulfillment/' },
      { text: 'Phase 04: Cloud Automation Fleet', link: '/en/admin/phases/phase-04-cloud-automation-fleet/' },
      { text: 'Phase 05: White-Label Marketplace', link: '/en/admin/phases/phase-05-white-label-marketplace/' },
    ],
  },
  {
    text: 'Technical Specifications (SPECs)',
    collapsed: true,
    items: [
      { text: 'Capability Map (Admin Web)', link: '/en/admin/specs/capability-map' },
      { text: 'Capability Map (Tauri Desktop)', link: '/en/admin/specs/capability-map-tauri-desktop' },
      { text: 'SPEC: Platform Foundation', link: '/en/admin/specs/SPEC-platform-foundation' },
      { text: 'SPEC: Route Foundation', link: '/en/admin/specs/SPEC-route-foundation' },
      { text: 'SPEC: Data Access Layer', link: '/en/admin/specs/SPEC-data-access' },
      { text: 'SPEC: Superadmin Routes', link: '/en/admin/specs/SPEC-superadmin-routes' },
      { text: 'SPEC: Tenants Source of Truth', link: '/en/admin/specs/SPEC-tenants-truth' },
      { text: 'SPEC: UI Information Deduplication', link: '/en/admin/specs/SPEC-ui-information-deduplication' },
      { text: 'SPEC: System Dashboard', link: '/en/admin/specs/SPEC-system-dashboard' },
      { text: 'SPEC: System Catalog', link: '/en/admin/specs/SPEC-system-catalog' },
      { text: 'SPEC: Automation Dashboard', link: '/en/admin/specs/SPEC-automation-dashboard' },
      { text: 'SPEC: Automation Engine', link: '/en/admin/specs/SPEC-automation-engine' },
      { text: 'SPEC: Workflow Mobile First', link: '/en/admin/specs/SPEC-workflow-mobile-first' },
      { text: 'SPEC: Fleet Inventory', link: '/en/admin/specs/SPEC-fleet-inventory' },
      { text: 'SPEC: Digital Commerce', link: '/en/admin/specs/SPEC-digital-commerce' },
      { text: 'SPEC: Payment Gateway', link: '/en/admin/specs/SPEC-payment-gateway' },
      { text: 'SPEC: Public Storefront', link: '/en/admin/specs/SPEC-public-storefront' },
      { text: 'SPEC: Admin Commerce Portal', link: '/en/admin/specs/SPEC-admin-commerce-portal' },
      { text: 'SPEC: Layout Preferences Coherence', link: '/en/admin/specs/SPEC-layout-preferences-coherence' },
      { text: 'SPEC: Vxe Cell Renderers', link: '/en/admin/specs/SPEC-vxe-cell-renderers' },
      { text: 'SPEC: Mobile Vxe Detail Sheet', link: '/en/admin/specs/SPEC-mobile-vxe-detail-sheet' },
      { text: 'SPEC: Browser Error Observability', link: '/en/admin/specs/SPEC-browser-error-observability' },
      { text: 'SPEC: Enum Constants SSOT', link: '/en/admin/specs/SPEC-enum-constants-ssot' },
      { text: 'SPEC: i18n EN/VI Localization', link: '/en/admin/specs/SPEC-i18n-en-vi' },
      { text: 'SPEC: 3D Ghost Banner', link: '/en/admin/specs/SPEC-specter-3d-ghost-banner' },
      { text: 'SPEC: Tauri Desktop Integration', link: '/en/admin/specs/SPEC-tauri-desktop' },
      { text: 'SPEC: CI/CD Public Release', link: '/en/admin/specs/SPEC-cicd-public-release' },
    ],
  },
]

// 2. CLI Sidebars
const cliSidebar = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Platform Overview', link: '/en/cli/' },
      { text: 'Quickstart (15s)', link: '/en/cli/start/quickstart' },
      { text: 'Installation Guide', link: '/en/cli/start/installation' },
      { text: 'First Profile Setup', link: '/en/cli/start/first-profile' },
      { text: 'System Diagnostics (Doctor)', link: '/en/cli/start/diagnostics' },
      { text: 'Interactive Figures (30)', link: '/en/cli/figures/' },
    ],
  },
  {
    text: 'CLI Commands Catalog',
    collapsed: false,
    items: [
      { text: '68 Commands Catalog', link: '/en/cli/commands/' },
    ],
  },
  {
    text: 'Identity & AI Extensions',
    collapsed: false,
    items: [
      { text: 'Personas & CCCD Generator', link: '/en/cli/faker/' },
      { text: 'AI Agent & MCP Protocol', link: '/en/cli/skills/' },
    ],
  },
  {
    text: 'Specifications & RFCs',
    collapsed: true,
    items: [
      { text: 'SPEC: Faker AI-First Generation', link: '/en/cli/specs/SPEC-faker-ai-first' },
    ],
  },
]

const cliCommandsSidebar = [
  {
    text: 'CLI',
    items: [
      { text: '← Back to CLI Docs', link: '/en/cli/' },
    ],
  },
  {
    text: 'Commands Catalog (68)',
    items: [
      { text: 'Overview & Navigation', link: '/en/cli/commands/' },
      { text: 'System & Onboarding (11)', link: '/en/cli/commands/#system' },
      { text: 'Automa & Headless Scraper (9)', link: '/en/cli/commands/#automa' },
      { text: 'Stealth Browser & Profiles (29)', link: '/en/cli/commands/#browser' },
      { text: 'Proxy Tunnel & Network Mesh (7)', link: '/en/cli/commands/#bridge' },
      { text: 'Faker & Synthetic Personas (2)', link: '/en/cli/commands/#faker' },
      { text: 'Runner Supervisor & Daemon (7)', link: '/en/cli/commands/#runner' },
      { text: 'Cloud Center Commands (3)', link: '/en/cli/commands/#cloud' },
    ],
  },
]

// 3. Combat Playbooks Sidebar
const playbooksSidebar = [
  {
    text: 'Combat Playbooks',
    collapsed: false,
    items: [
      { text: 'Affiliate & Media Buying', link: '/en/cli/playbooks/affiliate' },
      { text: 'E-commerce & Dropshipping', link: '/en/cli/playbooks/ecommerce' },
      { text: 'Web Scraping & Data Mining', link: '/en/cli/playbooks/scraping' },
      { text: 'Social Media Management', link: '/en/cli/playbooks/smm' },
      { text: 'Crypto & Airdrop Farming', link: '/en/cli/playbooks/crypto' },
    ],
  },
  {
    text: 'CLI',
    items: [
      { text: '← Back to CLI Docs', link: '/en/cli/' },
    ],
  },
]

// 4. Ecosystem Dropdown
const ecosystemDropdownEn = {
  text: 'Ecosystem',
  items: [
    { text: 'Telegram ChatOps', link: '/en/chatops/' },
    { text: 'Storage Hub', link: '/en/storage/' },
    { text: 'Yak Map Graph', link: '/en/yak-map/' },
    { text: 'UI Library', link: '/en/library/' },
    { text: 'Claude-Agy', link: '/en/claude-agy/' },
    { text: 'Home ↗', link: 'https://tuquet.com' },
  ],
}

export default defineConfig({
  base: '/',
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#09090b' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-WR1GB6XR29' },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-WR1GB6XR29');`,
    ],
  ],

  lang: 'en-US',
  title: 'Docs',
  description: 'Central documentation portal across open-source software, automation, and developer tooling.',

  themeConfig: {
    siteTitle: 'Docs',
    logo: '/logo.svg',

    nav: [
      {
        text: 'Services',
        items: [
          { text: 'Stealth Chromium Browser', link: '/en/browser/' },
          { text: 'Automation Engine', link: '/en/automation/' },
          { text: 'Network Gateway', link: '/en/gateway/' },
          { text: 'Distributed Worker', link: '/en/worker/' },
          { text: 'Cloud & Desktop Control Plane', link: '/en/cloud/' },
          { text: 'Admin Portal & Control Center', link: '/en/admin/' },
        ],
        activeMatch: '^/en/(browser|automa|runner|bridge|cloud|admin)/',
      },
      {
        text: 'CLI',
        items: [
          { text: 'Platform Overview', link: '/en/cli/' },
          { text: 'Quickstart (15s)', link: '/en/cli/start/quickstart' },
          { text: 'Installation Guide', link: '/en/cli/start/installation' },
          { text: 'First Profile Setup', link: '/en/cli/start/first-profile' },
          { text: '68 Commands Catalog', link: '/en/cli/commands/' },
          { text: 'System Diagnostics (Doctor)', link: '/en/cli/start/diagnostics' },
          { text: 'Interactive Figures (30)', link: '/en/cli/figures/' },
          { text: 'Personas & CCCD Generator', link: '/en/cli/faker/' },
          { text: 'AI Agent & MCP Protocol', link: '/en/cli/skills/' },
        ],
        activeMatch: '^/en/cli/(start/|commands|figures|skills|faker|specs|$|index)',
      },
      {
        text: 'Playbooks',
        items: [
          { text: 'Affiliate & Media Buying', link: '/en/cli/playbooks/affiliate' },
          { text: 'E-commerce & Dropshipping', link: '/en/cli/playbooks/ecommerce' },
          { text: 'Web Scraping & Data Mining', link: '/en/cli/playbooks/scraping' },
          { text: 'Social Media Management', link: '/en/cli/playbooks/smm' },
          { text: 'Crypto & Airdrop Farming', link: '/en/cli/playbooks/crypto' },
        ],
        activeMatch: '^/en/cli/playbooks/',
      },
      ecosystemDropdownEn,
    ],

    sidebar: {
      '/en/browser/': browserSidebar,
      '/en/automation/': automationSidebar,
      '/en/gateway/': gatewaySidebar,
      '/en/worker/': workerSidebar,
      '/en/cloud/': cloudSidebar,
      '/en/admin/': adminSidebar,
      '/en/cli/playbooks/': playbooksSidebar,
      '/en/cli/commands/': cliCommandsSidebar,
      '/en/cli/': cliSidebar,
      '/en/chatops/': [
        { text: 'Telegram ChatOps', items: [{ text: 'Overview & Setup', link: '/en/chatops/' }] },
      ],
      '/en/storage/': [
        { text: 'Storage Hub', items: [{ text: 'Overview & Features', link: '/en/storage/' }] },
      ],
      '/en/yak-map/': [
        { text: 'Yak Map Graph', items: [{ text: 'Ecosystem Lineage', link: '/en/yak-map/' }] },
      ],
      '/en/library/': [
        { text: 'Library', items: [{ text: 'Packages & Storybook', link: '/en/library/' }] },
      ],
      '/en/claude-agy/': [
        { text: 'Claude-Agy', items: [{ text: 'CLI Quickstart', link: '/en/claude-agy/' }] },
      ],
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tuquet' },
    ],
  },

  vite: {
    plugins: [
      {
        name: 'vitepress-brand-macro',
        enforce: 'pre',
        transform(code: string, id: string) {
          if (id.endsWith('.md')) {
            return code
              .replace(/\{\{\s*PRODUCT_NAME\s*\}\}/g, brand.productName)
              .replace(/\{\{\s*CLI_CMD\s*\}\}/g, brand.cliAlias)
              .replace(/\{\{\s*CORE_CMD\s*\}\}/g, brand.canonicalRoot)
              .replace(/\{\{\s*TAGLINE\s*\}\}/g, brand.tagline)
              .replace(/\{\{\s*ORG_NAME\s*\}\}/g, brand.organization)
              .replace(/__PRODUCT__/g, brand.productName)
              .replace(/__CLI__/g, brand.cliAlias)
              .replace(/__CORE__/g, brand.canonicalRoot)
              .replace(/__TAGLINE__/g, brand.tagline)
              .replace(/__ORG__/g, brand.organization);
          }
        },
      },
    ],
  },
})
