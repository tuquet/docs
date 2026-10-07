# Creating Your First Profile

Each **Specter** profile represents an isolated browser environment with its own unique digital fingerprint, cookies, cache, and optional proxy.

---

## Step 1: Create a Profile

Create a new profile with a descriptive name matching your campaign or account:

```bash
specter browser profile create "Facebook-Ad-US-01"
```

Specter automatically assigns:
- An authentic hardware fingerprint (GPU WebGL, AudioContext, Canvas noise).
- Realistic screen resolution and CPU concurrency.
- Isolated sandbox storage in `~/.specter/browser/profiles/Facebook-Ad-US-01`.

---

## Step 2: Launch the Profile

Open the profile in normal visual mode:

```bash
specter browser launch "Facebook-Ad-US-01"
```

To attach a proxy immediately upon launch:

```bash
specter browser launch "Facebook-Ad-US-01" --proxy socks5://127.0.0.1:1080
```

> [!TIP] Shorthand Aliases
> For speed, `specter launch "Profile-Name"` and `specter profile create "Profile-Name"` are also supported.

---

## Step 3: Verify the Digital Fingerprint

Once the browser window opens, navigate to any fingerprint testing website:
- [Browserleaks.com](https://browserleaks.com)
- [Pixelscan.net](https://pixelscan.net)
- [CreepJS](https://abrahamjuliot.github.io/creepjs/)

You will observe:
- **WebGL**: Emulates authentic graphics cards without leaking host hardware.
- **WebRTC**: No local private IP address leaks.
- **Canvas**: Consistent, noise-protected signature passing all anti-bot checks.
- **Trust Score**: 100% green rating across major detection engines.
