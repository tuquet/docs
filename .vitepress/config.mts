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

const automaSidebar = [
  {
    text: 'Automa DAG Engine',
    collapsed: false,
    items: [
      { text: 'Workflow Automation', link: '/en/automa/' },
      { text: 'Headless Stealth Mode', link: '/en/automa/stealth-headless' },
      { text: 'Native Rust CDP Protocol', link: '/en/automa/cdp' },
    ],
  },
]

const bridgeSidebar = [
  {
    text: 'Bridge Mesh Gateway',
    collapsed: false,
    items: [
      { text: 'SOCKS5 & HTTP Tunnels', link: '/en/bridge/' },
      { text: 'Multi-Server Mesh', link: '/en/bridge/mesh' },
      { text: 'WebRTC Leak Shield', link: '/en/bridge/webrtc' },
    ],
  },
]

const runnerSidebar = [
  {
    text: 'Workstation Runner',
    collapsed: false,
    items: [
      { text: 'Workstation Daemon & HTTP API', link: '/en/runner/' },
    ],
  },
]

const cloudSidebar = [
  {
    text: 'Cloud Center',
    collapsed: false,
    items: [
      { text: 'Multi-Tenant RBAC & Fleet Hub', link: '/en/cloud/' },
    ],
  },
]

// 2. Specter CLI Sidebars
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
    text: 'Specter CLI',
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
    text: 'Specter CLI',
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
    { text: 'Tuquet Home ↗', link: 'https://tuquet.com' },
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
  ],

  lang: 'en-US',
  title: 'Tu Quet Docs',
  description: 'Central documentation portal across Tu Quet open-source software, Specter automation, and developer tooling.',

  themeConfig: {
    siteTitle: 'Tu Quet Docs',
    logo: '/logo.svg',

    nav: [
      {
        text: 'Services',
        items: [
          { text: 'Stealth Chromium Browser', link: '/en/browser/' },
          { text: 'Automa DAG Engine', link: '/en/automa/' },
          { text: 'Bridge Mesh Gateway', link: '/en/bridge/' },
          { text: 'Workstation Runner', link: '/en/runner/' },
          { text: 'Cloud Center', link: '/en/cloud/' },
        ],
        activeMatch: '^/en/(browser|automa|runner|bridge|cloud)/',
      },
      {
        text: 'Specter CLI',
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
      '/en/automa/': automaSidebar,
      '/en/bridge/': bridgeSidebar,
      '/en/runner/': runnerSidebar,
      '/en/cloud/': cloudSidebar,
      '/en/cli/playbooks/': playbooksSidebar,
      '/en/cli/commands/': cliCommandsSidebar,
      '/en/cli/': cliSidebar,
      '/en/chatops/': [
        { text: 'Telegram ChatOps', items: [{ text: 'Overview & Setup', link: '/en/chatops/' }] },
      ],
      '/en/storage/': [
        { text: 'Tuquet Storage Hub', items: [{ text: 'Overview & Features', link: '/en/storage/' }] },
      ],
      '/en/yak-map/': [
        { text: 'Yak Map Graph', items: [{ text: 'Ecosystem Lineage', link: '/en/yak-map/' }] },
      ],
      '/en/library/': [
        { text: 'Tuquet Library', items: [{ text: 'Packages & Storybook', link: '/en/library/' }] },
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
