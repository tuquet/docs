<script setup lang="ts">
import { withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import { ShieldCheck, ExternalLink } from 'lucide-vue-next'

const { hasSidebar } = useSidebar()
</script>

<template>
  <footer class="site-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="footer-divider"></div>

    <div class="footer-content">
      <!-- Brand & Mission Column -->
      <div class="footer-brand-col">
        <div class="brand-title-row">
          <div class="brand-symbol">S</div>
          <span class="brand-name">Specter CLI</span>
        </div>
        <p class="brand-tagline">
          Local-first stealth Chromium orchestration and distributed automation engine. 100% Free &amp; Open-Source for data engineers and automation teams.
        </p>

        <!-- Live Operational Health Chip -->
        <div class="health-chip">
          <ShieldCheck :size="12" class="text-green" aria-hidden="true" />
          <span class="health-text">100% Local-First · Zero Telemetry</span>
        </div>

        <!-- Canonical SSOT Root Badge -->
        <div class="ssot-root-badge">
          <span class="badge-label">CANONICAL SSOT:</span>
          <code class="badge-code">~/.specter/</code>
        </div>
      </div>

      <!-- Navigation Columns -->
      <div class="footer-nav-grid">
        <!-- Col 1: Core Features -->
        <div class="nav-col">
          <div class="nav-heading">CORE TECHNOLOGY</div>
          <ul class="nav-list">
            <li><a :href="withBase('/en/specter/browser/')">Dedicated Browser Runtime</a></li>
            <li><a :href="withBase('/en/specter/browser/fingerprinting')">Fingerprint Masking</a></li>
            <li><a :href="withBase('/en/specter/browser/human-behavior')">Bézier Mouse Dynamics</a></li>
            <li><a :href="withBase('/en/specter/faker/')">Faker CCCD Generator</a></li>
          </ul>
        </div>

        <!-- Col 2: Docs & CLI -->
        <div class="nav-col">
          <div class="nav-heading">DOCUMENTATION &amp; CLI</div>
          <ul class="nav-list">
            <li><a :href="withBase('/en/specter/start/quickstart')">Quickstart (15s)</a></li>
            <li><a :href="withBase('/en/specter/commands/')">68 CLI Commands</a></li>
            <li><a :href="withBase('/en/specter/start/installation')">Installation Guide</a></li>
            <li><a :href="withBase('/en/specter/start/diagnostics')">Diagnostics (Doctor)</a></li>
          </ul>
        </div>

        <!-- Col 3: Automation & MCP -->
        <div class="nav-col">
          <div class="nav-heading">AUTOMATION &amp; AI</div>
          <ul class="nav-list">
            <li><a :href="withBase('/en/specter/automa/')">Automa Workflow DAG</a></li>
            <li><a :href="withBase('/en/specter/runner/')">Runner Kernel Supervisor</a></li>
            <li><a :href="withBase('/en/specter/automa/cdp')">Native Pure Rust CDP</a></li>
            <li><a :href="withBase('/en/specter/skills/')">Model Context Protocol (MCP)</a></li>
          </ul>
        </div>

        <!-- Col 4: Network & Solutions -->
        <div class="nav-col">
          <div class="nav-heading">SOLUTIONS &amp; RUNBOOKS</div>
          <ul class="nav-list">
            <li><a :href="withBase('/en/specter/bridge/')">Bridge Mesh &amp; SOCKS5</a></li>
            <li><a :href="withBase('/en/specter/cloud/')">Supabase Cloud Fleet</a></li>
            <li><a :href="withBase('/en/specter/mmo/README')">Operational Runbooks (SOP)</a></li>
            <li><a :href="withBase('/en/specter/mmo/06-glossary-terminology')">Technical Glossary</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Legal / GitHub Bar -->
    <div class="footer-bottom">
      <div class="bottom-inner">
        <p class="copyright-text">
          &copy; 2026 Specter CLI. Engineered by Tuquet Ecosystem. 100% Free &amp; Open-Source.
        </p>

        <div class="bottom-links">
          <a href="https://github.com/tuquet" target="_blank" rel="noopener" class="ext-link">
            GitHub
            <ExternalLink :size="10" aria-hidden="true" />
          </a>
          <span class="link-sep">&bull;</span>
          <a :href="withBase('/en/specter/commands/')">CLI Commands Catalog</a>
          <span class="link-sep">&bull;</span>
          <a href="https://tuquet.com/schema/cli.manifest.json" target="_blank" rel="noopener" class="ext-link">
            Raw Manifest (JSON)
            <ExternalLink :size="10" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-border);
  position: relative;
  z-index: 10;
  margin-top: 48px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-sizing: border-box;
  transition: padding-left 0.25s ease, padding-right 0.25s ease;
}

@media (min-width: 960px) {
  .site-footer.has-sidebar {
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .site-footer.has-sidebar {
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
  }
}

@media (max-width: 1240px) {
  .site-footer.has-sidebar .footer-content {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .site-footer.has-sidebar .footer-nav-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

.footer-divider {
  width: 100%;
  height: 1px;
  background: var(--vp-c-border);
}

.footer-content {
  max-width: 1040px;
  margin: 0 auto;
  padding: 40px 16px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 36px;
}

.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-symbol {
  width: 24px;
  height: 24px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
}

.brand-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.brand-tagline {
  color: var(--vp-c-text-2);
  font-size: 12.5px;
  line-height: 1.55;
  margin: 0;
}

.health-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  width: fit-content;
}

.health-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10b981;
}

.health-text {
  font-size: 10.5px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.ssot-root-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.badge-label {
  color: var(--vp-c-text-3);
  font-weight: 600;
  font-size: 9.5px;
  letter-spacing: 0.04em;
}

.badge-code {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  padding: 1px 5px;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
}

.footer-nav-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.nav-heading {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-list a {
  color: var(--vp-c-text-2);
  font-size: 12.5px;
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-list a:hover {
  color: var(--vp-c-text-1);
}

.footer-bottom {
  border-top: 1px solid var(--vp-c-border);
  padding: 16px;
}

.bottom-inner {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.copyright-text {
  color: var(--vp-c-text-3);
  font-size: 11.5px;
  margin: 0;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11.5px;
}

.bottom-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.ext-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.bottom-links a:hover {
  color: var(--vp-c-text-1);
}

.link-sep {
  color: var(--vp-c-border);
}

@media (max-width: 900px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 32px 16px;
  }
  .footer-nav-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .site-footer {
    margin-top: 32px;
  }
  .footer-content {
    padding: 24px 12px;
    gap: 20px;
  }
  .footer-nav-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .footer-bottom {
    padding: 12px;
  }
  .bottom-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
