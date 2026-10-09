// Prevent Windows EPERM unlink error on .temp directory during VitePress build
process.env.DEBUG = process.env.DEBUG || '1'

import { defineConfig } from 'vitepress'
import brand from './brand.config.json'

const docsSidebar = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/start/quickstart' },
      { text: 'Installation (15s)', link: '/start/installation' },
      { text: 'Your First Profile', link: '/start/first-profile' },
      { text: 'System Diagnostics (Doctor)', link: '/start/diagnostics' },
      { text: 'Interactive Figures (30)', link: '/figures/' },
    ],
  },
  {
    text: 'Browser',
    collapsed: false,
    items: [
      { text: 'Dedicated Runtime', link: '/browser/' },
      { text: 'Isolated Profiles', link: '/browser/profiles' },
      { text: 'Fingerprint Masking', link: '/browser/fingerprinting' },
      { text: 'Human Dynamics', link: '/browser/human-behavior' },
    ],
  },
  {
    text: 'Runner',
    collapsed: false,
    items: [
      { text: 'Kernel Supervisor', link: '/runner/' },
    ],
  },
  {
    text: 'Automa',
    collapsed: false,
    items: [
      { text: 'Workflow Automation', link: '/automa/' },
      { text: 'Headless Stealth Mode', link: '/automa/stealth-headless' },
      { text: 'Native Rust CDP', link: '/automa/cdp' },
    ],
  },
  {
    text: 'Bridge',
    collapsed: false,
    items: [
      { text: 'SOCKS5 & HTTP Tunnels', link: '/bridge/' },
      { text: 'Multi-Server Mesh', link: '/bridge/mesh' },
      { text: 'WebRTC Leak Shield', link: '/bridge/webrtc' },
    ],
  },
  {
    text: 'Faker',
    collapsed: false,
    items: [
      { text: 'Personas & CCCD Generator', link: '/faker/' },
    ],
  },
  {
    text: 'Cloud',
    collapsed: false,
    items: [
      { text: 'Supabase Fleet & RLS', link: '/cloud/' },
    ],
  },
  {
    text: 'Skills',
    collapsed: false,
    items: [
      { text: 'AI Agent & MCP Protocol', link: '/skills/' },
    ],
  },
  {
    text: 'Solutions',
    collapsed: true,
    items: [
      { text: 'Affiliate & Media Buying', link: '/solutions/affiliate' },
      { text: 'E-commerce & Dropshipping', link: '/solutions/ecommerce' },
      { text: 'Web Scraping & Data Mining', link: '/solutions/scraping' },
      { text: 'Social Media Management', link: '/solutions/smm' },
      { text: 'Crypto & Airdrop Farming', link: '/solutions/crypto' },
    ],
  },
]

export default defineConfig({
  base: '/docs/',
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#09090b' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: brand.productName,
      description: 'Local-first stealth Chromium orchestration and distributed automation engine.',
      themeConfig: {
        siteTitle: brand.productName,
        logo: '/logo.svg',

        nav: [
          { text: 'Docs', link: '/start/quickstart', activeMatch: '/(start|browser|runner|automa|bridge|faker|cloud|skills|solutions)/' },
          { text: 'CLI', link: '/commands/', activeMatch: '/commands/' },
          {
            text: 'Pillars',
            items: [
              { text: 'Browser', link: '/browser/' },
              { text: 'Runner', link: '/runner/' },
              { text: 'Automa', link: '/automa/' },
              { text: 'Bridge', link: '/bridge/' },
              { text: 'Faker', link: '/faker/' },
              { text: 'Cloud', link: '/cloud/' },
              { text: 'Skills', link: '/skills/' },
            ],
          },
          { text: 'Figures (30)', link: '/figures/', activeMatch: '/figures/' },
          { text: 'Runbooks', link: '/mmo/README', activeMatch: '/mmo/' },
        ],

        sidebar: {
          '/commands/': [
            {
              text: 'CLI Commands Catalog (68)',
              items: [
                { text: 'Overview & Navigation', link: '/commands/' },
                { text: 'System & Onboarding (11)', link: '/commands/#system' },
                { text: 'Automa & Headless Scraper (9)', link: '/commands/#automa' },
                { text: 'Stealth Browser & Profiles (29)', link: '/commands/#browser' },
                { text: 'Proxy Tunnel & Network Mesh (7)', link: '/commands/#bridge' },
                { text: 'Faker & Synthetic Personas (2)', link: '/commands/#faker' },
                { text: 'Runner Supervisor & Daemon (7)', link: '/commands/#runner' },
                { text: 'Supabase Cloud Fleet (3)', link: '/commands/#cloud' },
              ],
            },
          ],
          '/mmo/': [
            {
              text: 'Operational Runbooks (SOP)',
              items: [
                { text: 'Table of Contents', link: '/mmo/README' },
                { text: '01. Virtual Cards & Billing', link: '/mmo/01-vcc-payment-guide' },
                { text: '02. Residential Proxy Isolation', link: '/mmo/02-proxy-network-isolation' },
                { text: '03. Domain & DNS Delegation', link: '/mmo/03-domain-dns-delegation' },
                { text: '04. Hosting & VPS Infrastructure', link: '/mmo/04-hosting-vps-infrastructure' },
                { text: '05. Anonymous Email & Identity', link: '/mmo/05-anonymous-email-identity' },
                { text: '06. Technical Glossary', link: '/mmo/06-glossary-terminology' },
              ],
            },
          ],
          '/start/': docsSidebar,
          '/figures/': docsSidebar,
          '/browser/': docsSidebar,
          '/runner/': docsSidebar,
          '/automa/': docsSidebar,
          '/bridge/': docsSidebar,
          '/faker/': docsSidebar,
          '/cloud/': docsSidebar,
          '/skills/': docsSidebar,
          '/solutions/': docsSidebar,
        },
      },
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      title: brand.productName,
      description: 'Hạ tầng điều khiển Chromium tàng hình và tự động hóa phân tán (Local-First)',
      themeConfig: {
        siteTitle: brand.productName,
        logo: '/logo.svg',

        nav: [
          { text: 'Tài Liệu', link: '/start/quickstart', activeMatch: '/(start|solutions)/' },
          { text: 'CLI', link: '/commands/', activeMatch: '/commands/' },
          {
            text: 'Trụ Cột',
            items: [
              { text: 'Browser', link: '/browser/' },
              { text: 'Runner', link: '/runner/' },
              { text: 'Automa', link: '/automa/' },
              { text: 'Bridge', link: '/bridge/' },
              { text: 'Faker', link: '/faker/' },
              { text: 'Cloud', link: '/cloud/' },
              { text: 'Skills', link: '/skills/' },
            ],
          },
          { text: 'Runbooks', link: '/mmo/README', activeMatch: '/mmo/' },
        ],

        sidebar: {
          '/vi/': [
            {
              text: 'Tài Liệu Tiếng Việt',
              items: [
                { text: 'Trang Chủ Tiếng Việt', link: '/vi/' },
                { text: 'Tài Liệu Tiếng Anh (Mặc Định)', link: '/' },
                { text: 'Tra Cứu 68 Lệnh CLI', link: '/commands/' },
              ],
            },
          ],
        },
      },
    },
  },

  themeConfig: {
    siteTitle: brand.productName,
    logo: '/logo.svg',

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
