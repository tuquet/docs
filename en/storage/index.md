---
title: Tuquet Storage Hub
description: Multi-tenant, zero-egress cloud storage engine powered by Cloudflare Pages, D1, R2, and WebDAV.
---

# 📦 Tuquet Storage Hub (`tuquet/storage`)

> **Multi-Tenant Serverless Asset & Image Hosting Gateway**  
> Unified management for Telegram channels, Discord webhooks, Cloudflare R2, S3-compatible endpoints, Hugging Face, and WebDAV under a single interface.

---

## ⚡ Architecture & Features

* **Zero-Egress Asset Hosting**: Serve crawler datasets, screenshots, icons, and software binaries through Cloudflare Edge without paying per-gigabyte bandwidth fees.
* **Multi-Backend Aggregation**: Unified API and Web UI connecting Telegram CDN, S3, R2, and local disk.
* **Production Deployment**: Statically generated Web application running on `storage.tuquet.com` with serverless Cloudflare Workers API backend.
* **REST & WebDAV Interfaces**: Seamless upload and retrieval integration for both automated bots and human operators.

---

## 🌐 Live Service

The production storage portal is deployed at:  
👉 **[`https://storage.tuquet.com`](https://storage.tuquet.com)**
