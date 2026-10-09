---
title: Telegram ChatOps (Tuquet Bot)
description: 24/7 server monitoring, incident response, and GitHub CI dispatch via Telegram.
---

# 🤖 Telegram ChatOps (`tuquet/bot`)

> **Autonomous Infrastructure Sentinel & Interactive Telegram Assistant**  
> Monitor VPS nodes, trigger GitHub deployments, verify SSL certificates, and manage background tasks directly from your phone.

---

## ⚡ Key Capabilities

* **24/7 Server Health Watchdog**: Monitors CPU, memory, disk usage, and system services every 60 seconds with instant alerting on threshold breaches.
* **Interactive ChatOps Interface**: Execute operational commands (`/stats`, `/ping`, `/services`, `/deploy`) via authorized Telegram private chats and group topics.
* **GitHub CI & Release Broadcaster**: Watches GitHub Actions across the Tuquet ecosystem and alerts on build/deploy successes and test failures.
* **Automated RSS Feed Relayer**: Automatically detects new blog posts from `tuquet.com/feed.xml` and broadcasts formatted summaries with Markdown previews.

---

## 🚀 Quick Setup

```bash
# Clone the repository
git clone https://github.com/tuquet/bot.git
cd bot

# Install dependencies
npm install

# Copy environment template and configure secrets
cp config/.env.example .env
# Edit TELEGRAM_BOT_TOKEN and ALLOWED_CHAT_IDS in .env

# Run unit tests
npm test

# Start the bot daemon
npm start
```

---

## 📖 Available Telegram Commands

| Command | Permission | Description |
| :--- | :---: | :--- |
| `/stats` | Admin | Displays real-time CPU, RAM, disk, and load averages. |
| `/ping [target]` | Admin | Tests ICMP and HTTPS response latency with SSL expiry verification. |
| `/services` | Admin | Inspects systemd services status (`docker`, `specter`, `caddy`). |
| `/ci [repo]` | Admin | Fetches latest GitHub Actions workflow status across ecosystem repositories. |
| `/help` | User | Displays authorized commands and bot operational documentation. |
