// Prevent Windows EPERM unlink error on .temp directory during VitePress build
process.env.DEBUG = process.env.DEBUG || '1'

import { defineConfig } from 'vitepress'
import brand from './brand.config.json'

const specterDocsSidebar = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/en/specter/start/quickstart' },
      { text: 'Installation (15s)', link: '/en/specter/start/installation' },
      { text: 'Your First Profile', link: '/en/specter/start/first-profile' },
      { text: 'System Diagnostics (Doctor)', link: '/en/specter/start/diagnostics' },
      { text: 'Interactive Figures (30)', link: '/en/specter/figures/' },
    ],
  },
  {
    text: 'Browser',
    collapsed: false,
    items: [
      { text: 'Dedicated Runtime', link: '/en/specter/browser/' },
      { text: 'Isolated Profiles', link: '/en/specter/browser/profiles' },
      { text: 'Fingerprint Masking', link: '/en/specter/browser/fingerprinting' },
      { text: 'Human Dynamics', link: '/en/specter/browser/human-behavior' },
    ],
  },
  {
    text: 'Runner',
    collapsed: false,
    items: [
      { text: 'Native Process Supervisor', link: '/en/specter/runner/' },
    ],
  },
  {
    text: 'Automa',
    collapsed: false,
    items: [
      { text: 'Workflow Automation', link: '/en/specter/automa/' },
      { text: 'Headless Stealth Mode', link: '/en/specter/automa/stealth-headless' },
      { text: 'Native Rust CDP', link: '/en/specter/automa/cdp' },
    ],
  },
  {
    text: 'Bridge',
    collapsed: false,
    items: [
      { text: 'SOCKS5 & HTTP Tunnels', link: '/en/specter/bridge/' },
      { text: 'Multi-Server Mesh', link: '/en/specter/bridge/mesh' },
      { text: 'WebRTC Leak Shield', link: '/en/specter/bridge/webrtc' },
    ],
  },
  {
    text: 'Faker',
    collapsed: false,
    items: [
      { text: 'Personas & CCCD Generator', link: '/en/specter/faker/' },
    ],
  },
  {
    text: 'Cloud',
    collapsed: false,
    items: [
      { text: 'Supabase Fleet & RLS', link: '/en/specter/cloud/' },
    ],
  },
  {
    text: 'Skills',
    collapsed: false,
    items: [
      { text: 'AI Agent & MCP Protocol', link: '/en/specter/skills/' },
    ],
  },
  {
    text: 'Solutions',
    collapsed: true,
    items: [
      { text: 'Affiliate & Media Buying', link: '/en/specter/solutions/affiliate' },
      { text: 'E-commerce & Dropshipping', link: '/en/specter/solutions/ecommerce' },
      { text: 'Web Scraping & Data Mining', link: '/en/specter/solutions/scraping' },
      { text: 'Social Media Management', link: '/en/specter/solutions/smm' },
      { text: 'Crypto & Airdrop Farming', link: '/en/specter/solutions/crypto' },
    ],
  },
]

const specterCommandsSidebar = [
  {
    text: 'CLI Commands Catalog (68)',
    items: [
      { text: 'Overview & Navigation', link: '/en/specter/commands/' },
      { text: 'System & Onboarding (11)', link: '/en/specter/commands/#system' },
      { text: 'Automa & Headless Scraper (9)', link: '/en/specter/commands/#automa' },
      { text: 'Stealth Browser & Profiles (29)', link: '/en/specter/commands/#browser' },
      { text: 'Proxy Tunnel & Network Mesh (7)', link: '/en/specter/commands/#bridge' },
      { text: 'Faker & Synthetic Personas (2)', link: '/en/specter/commands/#faker' },
      { text: 'Runner Supervisor & Daemon (7)', link: '/en/specter/commands/#runner' },
      { text: 'Supabase Cloud Fleet (3)', link: '/en/specter/commands/#cloud' },
    ],
  },
]

const specterMmoSidebar = [
  {
    text: 'Operational Runbooks (SOP)',
    items: [
      { text: 'Table of Contents', link: '/en/specter/mmo/README' },
      { text: '01. Virtual Cards & Billing', link: '/en/specter/mmo/01-vcc-payment-guide' },
      { text: '02. Residential Proxy Isolation', link: '/en/specter/mmo/02-proxy-network-isolation' },
      { text: '03. Domain & DNS Delegation', link: '/en/specter/mmo/03-domain-dns-delegation' },
      { text: '04. Hosting & VPS Infrastructure', link: '/en/specter/mmo/04-hosting-vps-infrastructure' },
      { text: '05. Anonymous Email & Identity', link: '/en/specter/mmo/05-anonymous-email-identity' },
      { text: '06. Technical Glossary', link: '/en/specter/mmo/06-glossary-terminology' },
    ],
  },
]

const productsDropdownEn = {
  text: 'Products',
  items: [
    { text: '👻 Specter Platform', link: '/en/specter/' },
    { text: '🤖 Telegram ChatOps', link: '/en/chatops/' },
    { text: '📦 Storage Hub', link: '/en/storage/' },
    { text: '🗺️ Yak Map', link: '/en/yak-map/' },
    { text: '📚 UI Library', link: '/en/library/' },
    { text: '⚡ Claude-Agy', link: '/en/claude-agy/' },
  ],
}

const productsDropdownVi = {
  text: 'Sản Phẩm',
  items: [
    { text: '👻 Nền Tảng Specter', link: '/vi/specter/' },
    { text: '🤖 Telegram ChatOps', link: '/vi/chatops/' },
    { text: '📦 Storage Hub', link: '/vi/storage/' },
    { text: '🗺️ Yak Map', link: '/vi/yak-map/' },
    { text: '📚 Thư Viện UI', link: '/vi/library/' },
    { text: '⚡ Claude-Agy', link: '/vi/claude-agy/' },
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

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'Tu Quet Docs',
      description: 'Central documentation portal across Tu Quet open-source software, Specter automation, and developer tooling.',
      themeConfig: {
        siteTitle: 'Tu Quet Docs',
        logo: '/logo.svg',

        nav: [
          productsDropdownEn,
          {
            text: 'Specter Suite',
            items: [
              { text: '⚡ Quickstart (15s)', link: '/en/specter/start/quickstart' },
              { text: '🌐 Stealth Browser', link: '/en/specter/browser/' },
              { text: '⚙️ Native Process Runner', link: '/en/specter/runner/' },
              { text: '🔄 Automa Workflow DAG', link: '/en/specter/automa/' },
              { text: '🛡️ Bridge Mesh & SOCKS5', link: '/en/specter/bridge/' },
              { text: '☁️ Supabase Cloud Fleet', link: '/en/specter/cloud/' },
              { text: '🎭 Personas & Faker', link: '/en/specter/faker/' },
              { text: '🤖 AI Agent & MCP', link: '/en/specter/skills/' },
            ],
            activeMatch: '/en/specter/(start|browser|runner|automa|bridge|faker|cloud|skills|solutions)/',
          },
          {
            text: 'Reference & SOP',
            items: [
              { text: '💻 68 CLI Commands Catalog', link: '/en/specter/commands/' },
              { text: '📋 MMO Operational Runbooks (SOP)', link: '/en/specter/mmo/README' },
              { text: '🔬 Interactive Figures (30)', link: '/en/specter/figures/' },
              { text: '🩺 System Diagnostics (Doctor)', link: '/en/specter/start/diagnostics' },
              { text: '📖 Technical Glossary', link: '/en/specter/mmo/06-glossary-terminology' },
            ],
            activeMatch: '/en/specter/(commands|mmo|figures)/',
          },
          { text: 'Yak Map', link: '/en/yak-map/', activeMatch: '/en/yak-map/' },
          { text: 'Ecosystem ↗', link: 'https://tuquet.com' },
        ],

        sidebar: {
          '/en/specter/commands/': specterCommandsSidebar,
          '/en/specter/mmo/': specterMmoSidebar,
          '/en/specter/': specterDocsSidebar,
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
      },
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      title: 'Tài Liệu Tu Quet',
      description: 'Cổng tài liệu kỹ thuật tập trung cho hệ sinh thái phần mềm mã nguồn mở Tu Quet và Specter.',
      themeConfig: {
        siteTitle: 'Tài Liệu Tu Quet',
        logo: '/logo.svg',

        nav: [
          productsDropdownVi,
          {
            text: 'Nền Tảng Specter',
            items: [
              { text: '⚡ Bắt Đầu Nhanh (15s)', link: '/en/specter/start/quickstart' },
              { text: '📖 Tổng Quan Nền Tảng (VI)', link: '/vi/specter/' },
              { text: '🌐 Trình Duyệt Stealth Chromium', link: '/en/specter/browser/' },
              { text: '⚙️ Giám Sát Tiến Trình Runner', link: '/en/specter/runner/' },
              { text: '🔄 Tự Động Hóa Kịch Bản Automa', link: '/en/specter/automa/' },
              { text: '🛡️ Mạng Lưới Tunnel Bridge', link: '/en/specter/bridge/' },
              { text: '☁️ Đồng Bộ Hạm Đội Cloud', link: '/en/specter/cloud/' },
              { text: '🎭 Giả Lập Định Danh Faker', link: '/en/specter/faker/' },
              { text: '🤖 Giao Thức AI Agent (MCP)', link: '/en/specter/skills/' },
            ],
            activeMatch: '/(vi/specter|en/specter/(start|browser|runner|automa|bridge|faker|cloud|skills|solutions))/',
          },
          {
            text: 'Tra Cứu & SOP',
            items: [
              { text: '💻 Tra Cứu 68 Lệnh CLI', link: '/en/specter/commands/' },
              { text: '📋 Cẩm Nang Vận Hành MMO (SOP)', link: '/en/specter/mmo/README' },
              { text: '🔬 30 Sơ Đồ Động (Figures)', link: '/en/specter/figures/' },
              { text: '🩺 Chẩn Đoán Lỗi (Doctor)', link: '/en/specter/start/diagnostics' },
              { text: '📖 Thuật Ngữ Kỹ Thuật', link: '/en/specter/mmo/06-glossary-terminology' },
            ],
            activeMatch: '/en/specter/(commands|mmo|figures)/',
          },
          { text: 'Bản Đồ Yak Map', link: '/vi/yak-map/', activeMatch: '/vi/yak-map/' },
          { text: 'Hệ Sinh Thái ↗', link: 'https://tuquet.com' },
        ],

        sidebar: {
          '/vi/specter/': [
            {
              text: 'Nền Tảng Specter',
              items: [
                { text: 'Tổng Quan Specter (Tiếng Việt)', link: '/vi/specter/' },
                { text: 'Bắt Đầu Nhanh (English)', link: '/en/specter/start/quickstart' },
                { text: 'Tra Cứu 68 Lệnh CLI', link: '/en/specter/commands/' },
                { text: 'Cẩm Nang Vận Hành (SOP)', link: '/en/specter/mmo/README' },
              ],
            },
          ],
          '/vi/chatops/': [
            { text: 'Telegram ChatOps', items: [{ text: 'Tổng Quan & Cài Đặt', link: '/vi/chatops/' }] },
          ],
          '/vi/storage/': [
            { text: 'Tuquet Storage Hub', items: [{ text: 'Tổng Quan & Tính Năng', link: '/vi/storage/' }] },
          ],
          '/vi/yak-map/': [
            { text: 'Bản Đồ Yak Map', items: [{ text: 'Cấu Trúc Hệ Sinh Thái', link: '/vi/yak-map/' }] },
          ],
          '/vi/library/': [
            { text: 'Thư Viện Giao Diện', items: [{ text: 'Danh Sách Gói & Storybook', link: '/vi/library/' }] },
          ],
          '/vi/claude-agy/': [
            { text: 'Tăng Tốc Claude-Agy', items: [{ text: 'Khởi Chạy Nhanh', link: '/vi/claude-agy/' }] },
          ],
        },
      },
    },
  },

  themeConfig: {
    siteTitle: 'Tu Quet Docs',
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
