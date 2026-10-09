# Virtual Cards (VCC) & International Billing SOP

Operational runbook for provisioning crypto-funded virtual payment cards, preventing auto-renewal leaks, avoiding declined transaction penalties, and verifying card issuer reputation.

---

## 1. Operating Directives

- **One Project, One Card:** Issue an isolated virtual card per operational project. Never share card details across vendors or tenants.
- **Freeze Immediately:** Fund cards with exact order amounts plus a minimal buffer. Freeze or terminate the card immediately post-settlement to kill recurring billing traps.
- **Verify BIN Type:** Query the 6-digit Bank Identification Number (BIN) before loading capital. Reject prepaid cards when paying for sensitive SaaS or infrastructure.

---

## 2. Verified VCC Providers Matrix

Fund via USDT (TRC20/ERC20) or Bitcoin. Cards generate within minutes without conventional bank accounts:

| Provider | Portal | Issuance & Funding Fees | 3DS / OTP Ingress | Recommended Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **PST.net** | [`pst.net`](https://pst.net) | $1–$2 issuance, tier-based deposit | Dashboard real-time feed | Tier 1 for Namecheap, Google Ads, Facebook Ads, and cloud tools. |
| **EPN Pay** | [`e.pn`](https://e.pn) | ~$2/card, low top-up fees | Dashboard real-time feed | High-trust US BIN pool. Optimal for media buying and web asset checkout. |
| **Karta.io** | [`karta.io`](https://karta.io) | Corporate / team pricing tiers | Dashboard real-time feed | Multi-seat agency budget management with granular spending ceilings. |
| **RedotPay** | [`redotpay.com`](https://www.redotpay.com) | ~$10 one-time (persistent card) | Mobile Push Notification | Long-term card lifecycle, low BSC/Tron transfer fees, Apple Pay linkable. |
| **Buvei** | [`buvei.com`](https://buvei.com) | Competitive business rates | Dashboard real-time feed | Ad networks and international webmaster vendor processing. |
| **Capitalist** | [`capitalist.net`](https://capitalist.net) | Multi-currency wallet fees | Web dashboard interface | Legacy multi-currency e-wallet supporting automated crypto swaps. |
| **ABCard** | [`abcard.io`](https://abcard.io) | Volume-based agency rates | Dashboard real-time feed | Multi-campaign agency billing pipelines. |

---

## 3. P2P Marketplace Escrow Protocols

When purchasing one-off test balances ($5–$10) from third-party sellers on peer forums:

- **[BlackHatWorld (BHW)](https://www.blackhatworld.com):**
  - Purchase strictly within *Marketplace $\rightarrow$ Miscellaneous*.
  - Transact exclusively with badge-verified vendors (**Jr. VIP** or **Marketplace Seller** who have posted security bonds).
- **[MMO4ME](https://mmo4me.com):**
  - **Mandatory Escrow Rule:** Transact exclusively through the official forum escrow intermediary (Trung gian).
  - Never transfer direct peer funds before the card number and authorization balance are verified functional.

---

## 4. Cost-Control & Fraud Prevention Tactics

### Tactic 1: Pre-Funding BIN Audit
Registrars and cloud vendors frequently decline prepaid cards to mitigate fraud.
- Run the first 6 digits through [BinCheck](https://bincheck.io) or [BIN Codes](https://www.bincodes.com).
- Ensure the card classification is **Debit** or **Credit**.
- Discard cards identified as **Prepaid** for primary infrastructure accounts.

### Tactic 2: Over-Provisioning Buffer ($2–$3)
- Issuing networks charge a **$0.30–$0.50 penalty fee** for failed transactions triggered by insufficient funds.
- Cross-border currency conversion (Forex) and micro-authorization holds ($1 temporary pre-auth) cause transactions with exact balances to fail.
- **Rule:** Always fund cards with **Target Amount + $2.00–$3.00**.

### Tactic 3: Burnable Card SOP (Freeze-on-Complete)
Registrars sell initial domain terms at steep discounts ($8/yr) and default to full-rate renewal contracts ($25–$35/yr) without explicit warning.
1. Issue a single-use card loaded with initial invoice value $+ \$2$.
2. Complete checkout and capture the receipt.
3. Access the card dashboard and click **Freeze / Terminate Card** immediately.

### Tactic 4: Native Crypto Bypasses
- When buying domains from **Namecheap**, skip card issuance fees entirely.
- Deposit directly into Namecheap account balances using native **Bitcoin (BTC)** via their BTCPay gateway.
- Saves $2–$5 in card creation fees per project.

---

## 5. Boundaries

- **Never** maintain permanent rolling balances in third-party VCC dashboards beyond active monthly operational needs.
- **Never** route personal recurring subscriptions through disposable project cards.
- **Never** attempt to dispute or chargeback failed services via VCC dashboards; terminate the card and replace the vendor.
