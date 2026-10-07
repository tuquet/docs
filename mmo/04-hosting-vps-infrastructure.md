# Hosting & VPS Infrastructure Hardening SOP

Standard operating procedure for provisioning crypto-funded virtual private servers (VPS), enforcing zero-trust ingress, and shielding origin infrastructure behind edge reverse proxies.

---

## 1. Operating Directives

- **Zero Corporate Credit Card Ties:** Lease server infrastructure on month-to-month terms using Bitcoin, USDT, or Monero. Terminate instances immediately when projects wrap.
- **Origin IP Secrecy:** The raw host IP must never be exposed publicly. Restrict incoming traffic on web ports (80/443) strictly to Cloudflare edge CIDRs.
- **Zero Open Public Inbound Ports:** Terminate public SSH port 22 on WAN. Authenticate via cryptographic SSH keys routed through Cloudflare Zero Trust Tunnels.

---

## 2. Infrastructure Provider Evaluation Matrix

| Provider | Portal | Crypto Options | Jurisdiction / Privacy | Core Capability |
| :--- | :--- | :--- | :--- | :--- |
| **BuyVM** | [`buyvm.net`](https://buyvm.net) | BTC, LTC, ETH | Luxembourg / US | **Unmetered Bandwidth & Cheap Storage:** Block storage slabs available at low monthly rates; strong data privacy in Luxembourg. |
| **PQ.Hosting** | [`pq.hosting`](https://pq.hosting) | Multi-Crypto | Anonymous Email Sign-up | **35+ Global Datacenter Locations:** 5-minute automated provisioning; requires only an email address and crypto settlement. |
| **AlexHost** | [`alexhost.com`](https://alexhost.com) | Bitcoin, Monero | Maximum (Moldova Offshore) | **Offshore Privacy:** Dedicated physical DC in Moldova; resilient against external takedowns; zero KYC. |
| **Vultr** | [`vultr.com`](https://vultr.com) | Bitcoin (BitPay) | Global Cloud Tier | **High Performance & Global Edge:** High-spec compute instances in Asia-Pacific and North America for production enterprise loads. |

---

## 3. Server Hardening Protocol (3-Stage Sequence)

Execute these hardening measures immediately upon instance handover before installing any application payload:

### Stage 1: Origin IP Firewall Lockdown (Cloudflare Whitelist Only)
Block direct internet scans (Shodan, Censys) from reaching web ports by restricting inbound traffic exclusively to Cloudflare edge proxies:

```bash
# Flush legacy rules and enforce default drop policy
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Ingest and permit Cloudflare official IPv4 ranges on HTTP/HTTPS
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
    sudo ufw allow from "$ip" to any port 80 proto tcp
    sudo ufw allow from "$ip" to any port 443 proto tcp
done

# Enable firewall daemon
sudo ufw --force enable
sudo ufw status verbose
```

### Stage 2: Cryptographic SSH Key Enforcement
Eliminate password brute-force attack vectors:
1. Generate an Ed25519 keypair locally:
   ```bash
   ssh-keygen -t ed25519 -C "project-operator-key"
   ```
2. Inject the public key onto the server (`~/.ssh/authorized_keys`).
3. Harden OpenSSH daemon configuration (`/etc/ssh/sshd_config.d/99-hardening.conf` or `/etc/ssh/sshd_config`):
   ```text
   PasswordAuthentication no
   PermitRootLogin prohibit-password
   PubkeyAuthentication yes
   X11Forwarding no
   ```
4. Restart the SSH daemon:
   ```bash
   sudo systemctl restart sshd
   ```

### Stage 3: Zero-Inbound Cloudflare Tunnel Ingress
To achieve complete zero-trust resilience, eliminate open port 22 entirely from public internet interfaces:
1. Install `cloudflared` on the host instance.
2. Establish an outbound-only encrypted tunnel back to the Cloudflare edge:
   ```bash
   cloudflared tunnel create project-infra-tunnel
   cloudflared tunnel route dns project-infra-tunnel ssh.yourdomain.com
   ```
3. Close inbound port 22 on the host firewall. Access the server securely via Cloudflare Access (`cloudflared access ssh`) through browser-based terminal sessions.

---

## 4. Boundaries

- **Never** deploy production client sites directly onto unprotected public IP addresses.
- **Never** leave default root passwords active or permit password-based SSH authentication.
- **Never** purchase long-term annual VPS contracts for short-term or experimental campaigns.
