# Technical & Operational Glossary

Comprehensive reference catalog of operational, networking, financial, and infrastructure security terminology formatted for technical operators, media buyers, and project leads.

<HairlineFigure name="loupe" />

---

## Navigation Directory

1. [Payment & Financial Operations](#1-payment--financial-operations)
2. [Networking & Anti-Ban Infrastructure](#2-networking--anti-ban-infrastructure)
3. [Domain, DNS & Identity Delegation](#3-domain-dns--identity-delegation)
4. [Hosting & Server Infrastructure](#4-hosting--server-infrastructure)
5. [Mailbox Architecture & Cryptographic Security](#5-mailbox-architecture--cryptographic-security)

---

## 1. Payment & Financial Operations

### VCC (Virtual Credit Card)
- **Technical Definition:** A digital 16-digit payment card (Visa/Mastercard) generated programmatically with expiration date and CVV, without physical plastic issuance.
- **Operational Impact:** Enables rapid creation of project-isolated billing cards funded directly via crypto (USDT/BTC), eliminating corporate bank paperwork and card-level cross-contamination.

### BIN (Bank Identification Number)
- **Technical Definition:** The leading 6 digits of a payment card identifying the issuing financial institution, country of origin, and card tier.
- **Operational Impact:** Payment processors evaluate BIN reputation upon submission. High-risk or prepaid BINs trigger immediate checkout cancellation. Always verify via [BinCheck](https://bincheck.io) before funding.

### Credit vs. Debit vs. Prepaid
- **Credit:** Highest merchant authorization rate (~99%); standard acceptance across major cloud providers.
- **Debit:** Direct balance linkage with high trust rating (~95%); standard selection for SaaS and hosting procurement.
- **Prepaid:** Disposable stored-value cards; widely blacklisted by cloud vendors and advertising networks to prevent trial abuse.

### 3D-Secure (3DS / OTP)
- **Technical Definition:** An XML-based protocol providing multi-factor authentication (One-Time Password) for online credit and debit card transactions.
- **Operational Impact:** Operations mandate selecting VCC providers that stream real-time 3DS challenge codes directly into the user dashboard, avoiding SMS delays.

### Burnable Card
- **Technical Definition:** A temporary virtual card loaded with an exact single-transaction allocation and frozen or deleted immediately following settlement.
- **Operational Impact:** Neutralizes unintended second-year domain renewal rate spikes (which often jump from $8 to $35/year) and rogue SaaS subscription drains.

### Declined Fee
- **Technical Definition:** A punitive charge ($0.30–$0.50) assessed by virtual card issuers when a payment attempt fails due to insufficient funds.
- **Operational Impact:** Always over-provision card balances by $2.00–$3.00 beyond invoice totals to cover forex slippage and pre-auth holds.

### Escrow / Middleman
- **Technical Definition:** A trusted third-party service that holds buyer funds until the seller delivers and the buyer validates the asset or credentials.
- **Operational Impact:** Mandatory protocol when purchasing ad accounts, balances, or private proxies on P2P forums (BlackHatWorld, MMO4ME).

---

## 2. Networking & Anti-Ban Infrastructure

### Proxy
- **Technical Definition:** An intermediary network server that relays client requests, terminating the client's direct TCP socket and projecting an alternate IP address to the target host.
- **Operational Impact:** Masks physical office IP topology and presents geographic presence aligned with the target platform jurisdiction.

### Static Residential Proxy (ISP)
- **Technical Definition:** A fixed IP address assigned by a certified consumer Internet Service Provider (AT&T, Verizon, Comcast) hosted on dedicated datacenter infrastructure.
- **Operational Impact:** Top-tier trust profile (99%). Mandatory for payment processing, domain registration, and persistent admin consoles.

### Rotating Residential Proxy
- **Technical Definition:** A proxy pool routing requests across a large swarm of consumer devices, changing exit IP addresses per request or over fixed time intervals.
- **Operational Impact:** Ideal for high-concurrency web scraping and mass intelligence gathering; strictly banned for financial checkout sessions.

### Antidetect Browser
- **Technical Definition:** A specialized browser environment that isolates cookies, local storage, indexedDB, and dynamically injects spoofed hardware parameters.
- **Operational Impact:** Prevents anti-fraud engines from linking disparate client operations to a single physical machine.

### Browser Fingerprint
- **Technical Definition:** A deterministic client profile computed from system attributes (Canvas hash, WebGL vendor/renderer, AudioContext, installed fonts, screen dimensions).
- **Operational Impact:** Modern platforms identify operators through hardware fingerprinting rather than IP addresses alone. Antidetect tools inject consistent hardware emulation to prevent correlation.

### WebRTC Leak
- **Technical Definition:** The inadvertent disclosure of a client's local and public IP addresses via the WebRTC peer-connection discovery protocol, bypassing proxy tunnels.
- **Operational Impact:** If an office IP leaks during a US proxy session, security engines flag geolocation deception and terminate accounts immediately.

### Fraud Score
- **Technical Definition:** A numerical threat assessment (0 to 100) computed by threat intelligence engines (e.g., Scamalytics) based on IP abuse history and connection type.
- **Operational Impact:** Target $< 15$ for mission-critical operations. Discard IPs scoring $> 30$.

---

## 3. Domain, DNS & Identity Delegation

### Domain Registrar
- **Technical Definition:** An ICANN-accredited entity authorized to register domain names across top-level domain (TLD) registries.

### WHOIS Privacy
- **Technical Definition:** A proxy service substituting personal registrant details (name, phone, physical address) with anonymized proxy data on public databases.
- **Operational Impact:** Shields operator identity and protects personal channels from spam harvesting and external harassment.

### DNS (Domain Name System)
- **Technical Definition:** A hierarchical distributed database translating human-readable hostnames (`example.com`) into routable numerical IP addresses.

### Cloudflare Delegation (Role-Based Access)
- **Technical Definition:** Cloudflare's multi-user access feature allowing account owners to assign scoped privileges to external team members without sharing passwords.
- **Operational Impact:** Agency operators receive scoped `DNS Administrator` access, shielding the agency from client liability while ensuring client asset sovereignty.

### Cloudflare Proxy (Orange Cloud)
- **Technical Definition:** Reverse proxy mode where DNS records resolve to Cloudflare Anycast IPs, shielding the origin server IP from public observation.
- **Operational Impact:** Mitigates DDoS attacks and prevents scrapers from pinpointing the direct hosting environment.

### ICANN Contact Verification
- **Technical Definition:** A mandatory compliance email dispatched following domain creation requiring explicit verification within 15 days.
- **Operational Impact:** Mandatory 24-hour verification SLA. Neglecting this link results in automatic domain suspension by the registrar.

---

## 4. Hosting & Server Infrastructure

### VPS (Virtual Private Server)
- **Technical Definition:** A virtualized compute partition on a physical host providing dedicated resources, dedicated IP, and root administrative access.
- **Operational Impact:** Fast, flexible provisioning funded via cryptocurrency on month-to-month contracts without recurring bank obligations.

### Origin IP
- **Technical Definition:** The raw public IPv4/IPv6 address of the physical or virtual host hosting the core application or website.
- **Operational Impact:** Must remain confidential behind Cloudflare reverse proxies to prevent direct-to-ip attacks.

### Offshore Hosting
- **Technical Definition:** Infrastructure located in jurisdictions with strict data privacy laws and minimal cooperation with external takedown requests (e.g., Moldova, Switzerland).
- **Operational Impact:** Recommended for privacy-critical deployments requiring robust uptime protection and zero KYC verification.

### SSH Key Authentication
- **Technical Definition:** Cryptographic authentication using asymmetric key pairs (e.g., Ed25519) in place of plaintext passwords.
- **Operational Impact:** Renders automated brute-force credential stuffing attacks against port 22 completely ineffective.

### Cloudflare Tunnel
- **Technical Definition:** An outbound daemon connection (`cloudflared`) bridging internal server ports directly to the Cloudflare edge network without inbound firewall rules.
- **Operational Impact:** Achieves true zero-trust security by closing all inbound ports (including SSH port 22) to the public internet.

---

## 5. Mailbox Architecture & Cryptographic Security

### E2EE (End-to-End Encryption)
- **Technical Definition:** Cryptographic communication where messages are encrypted at the client device and decrypted only by the intended recipient holding private keys.
- **Operational Impact:** Protects invoice tokens, server credentials, and proprietary communications against upstream provider compromise.

### Catch-All Email Routing
- **Technical Definition:** A mail server directive that forwards all incoming messages addressed to non-existent mailboxes on a domain to a designated master address.
- **Operational Impact:** Instant generation of arbitrary operational aliases (`service-01@domain.com`) without administrative inbox setup.

### Email Alias
- **Technical Definition:** A forwarding address masking the underlying operational mailbox while transparently routing incoming traffic to the primary destination.

### 2FA (Two-Factor Authentication)
- **Technical Definition:** An identity verification standard requiring two distinct factors (e.g., master password + time-based one-time password / TOTP).

### 2FA Backup Codes
- **Technical Definition:** A set of single-use recovery tokens issued when enabling two-factor authentication.
- **Operational Impact:** Essential safeguard against device loss or hardware malfunction. Must be securely recorded in offline vaults during account creation.

### Password Vault
- **Technical Definition:** A zero-knowledge encrypted database (e.g., KeePassXC, Bitwarden) designed to securely generate, store, and manage credentials.
- **Operational Impact:** Replaces insecure plaintext storage (spreadsheets, chat logs), enabling clean, segregated credential exports for client handovers.
