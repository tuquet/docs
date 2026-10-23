# SPEC-secret-store: Encrypted Secret Store & Device-Portable Credentials

> **Status:** Implemented (4A + 4B) · **Schema:** `secrets` · **Surfaces:** `tq secret` (CLI) · `{{secrets.*}}` (workflow engine) · `cloud/supabase/plugins/secrets`
> **Related:** [`architecture`](../architecture.md), [`terminology`](../terminology.md), [CLI commands](/en/cli/commands/)

---

## 1. Objective

Provide Tuquet with a **tenant-scoped, encrypted-at-rest secret store** so that:

1. Workflow credentials (passwords, API keys, tokens) **never appear in plaintext** inside a workflow graph, a job payload, a log line, or git.
2. An **enrolled workstation can obtain credentials without a human re-typing them** — a brand-new device runs jobs immediately after `tq auth login`.
3. The design is **native to Tuquet** (multi-tenant + RLS + device enrollment + `~/.tq` SSOT), borrowing the *good ideas* of Automa's credential model (reference-based, not embedded) without copying its weaknesses (a client-side hard-coded key).

Non-goals (v1): per-device asymmetric key wrapping, hardware-backed keys, secret versioning history UI.

---

## 2. Threat model & principles

| Principle | Rationale |
| :--- | :--- |
| **Reference, never inline** | Workflows hold `{{secrets.<name>}}`; the value lives only in the secret store. |
| **Encrypt at rest, both ends** | Cloud: envelope (KEK→DEK). Local: AES-256-GCM. |
| **Key separation** | The KEK never leaves the server (Supabase Vault); the DEK is per-tenant; the local key is per-device. |
| **Deny by default** | `secrets.*` tables have RLS with **no** anon/authenticated policies; access only via `SECURITY DEFINER` RPCs. |
| **Device-authenticated delivery** | A device proves identity with `workers.devices.device_token_hash` (SHA-256) before receiving values. |
| **Never log secrets** | Values are registered with `SecretMasker` and scrubbed as `***MASKED***`. |

---

## 3. Architecture — envelope encryption

```text
KEK   (Supabase Vault secret `tq_secrets_kek`)          # server-only
  └─ wraps ─▶ DEK  (one per tenant; secrets.tenant_keys) # pgcrypto
                 └─ encrypts ─▶ value (secrets.credentials.value_enc)

Device  ── device_token (SHA-256 verified) ──▶ public.fetch_secrets ──▶ decrypted values (TLS)
        └─ cached locally in ~/.tq/system/secrets.json (AES-256-GCM, per-device key)
```

- **KEK** — a 32-byte key stored as a Vault secret; readable only by `secrets._kek()` (SECURITY DEFINER).
- **DEK** — generated on first use for a tenant, stored **wrapped** (`pgp_sym_encrypt(dek, kek)`) in `secrets.tenant_keys`.
- **Values** — encrypted with the tenant DEK (`pgp_sym_encrypt`).

---

## 4. Cloud schema (plugin `secrets`)

Plugin location: `cloud/supabase/plugins/secrets/` (`install.sql`, `plugin.json`). Dependencies: `workers`, `core-iam`.

### 4.1 `secrets.credentials`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid | PK |
| `tenant_id` | uuid | FK `public.tenants` |
| `name` | text | referenced as `{{secrets.<name>}}` |
| `value_enc` | bytea | `pgp_sym_encrypt(value, dek)` |
| `key_version` | int | bumped on DEK rotation |
| `created_by` | uuid | |
| `created_at` / `updated_at` | timestamptz | |

Constraint: `UNIQUE (tenant_id, name)`.

### 4.2 `secrets.tenant_keys`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `tenant_id` | uuid | PK |
| `dek_enc` | bytea | DEK wrapped with the KEK |
| `key_version` | int | |
| `rotated_at` / `created_at` | timestamptz | |

### 4.3 RPCs (device-authenticated)

| RPC (public wrapper) | Args | Returns |
| :--- | :--- | :--- |
| `public.set_secret` | `p_device_id, p_device_token, p_name, p_value` | void |
| `public.list_secrets` | `p_device_id, p_device_token` | `(name, updated_at)` |
| `public.fetch_secrets` | `p_device_id, p_device_token` | `(name, value)` — **decrypted** |
| `public.rotate_secret_dek` | `p_device_id, p_device_token` | `int` (re-encrypted count) |

All wrappers call `secrets.*` SECURITY DEFINER functions. `secrets._verify_device(device_id, device_token)` raises `Invalid or unknown device credentials` on mismatch.

### 4.4 RLS

- `ENABLE ROW LEVEL SECURITY` on both tables; `REVOKE ALL … FROM anon, authenticated`.
- Only `service_role` has a policy (full access) — PostgREST access happens exclusively through the RPCs.

---

## 5. Device flow (portability)

```text
New workstation
  1. tq auth login            # operator auth -> enrolls device (workers.devices, device_token)
  2. tq secret pull           # fetch_secrets(device_id, device_token) -> ~/.tq/system/secrets.json
  3. tq automation run …       # workflow resolves {{secrets.*}} from the local store
```

No credential is typed on the new device. Rotating a compromised workstation = revoke/delete its `workers.devices` row.

---

## 6. CLI reference — `tq secret`

| Command | Description |
| :--- | :--- |
| `tq secret init` | Create the local key `~/.tq/system/.secret_key` (0600) if missing. |
| `tq secret set <name> <value>` | Store/update a secret locally (AES-256-GCM). |
| `tq secret list [--format json]` | List secret **names** (values never printed). |
| `tq secret rm <name>` | Remove a local secret. |
| `tq secret path` | Print the local store path. |
| `tq secret remote` | List secrets stored in Cloud (names only). |
| `tq secret push` | Upload local secrets to the Cloud store (device-authenticated). |
| `tq secret pull` | Download Cloud secrets onto this device (device-portable). |

---

## 7. Engine integration

- `ExecutionState.secrets: HashMap<String, Value>` — populated at job start from the local store.
- `WorkflowGraph::resolve_expression` supports the `secrets.<name>` prefix (alongside `variables.*`, `loopData.*`, `prevBlockData.*`, `globalData.*`).
- Both execution paths seed secrets: `worker/src/drivers/automation.rs` (`execute_native_cdp`) **and** `cli/src/core/engine/job_coordinator.rs` (`run_native_job`).
- Values are registered with `SecretMasker::add_custom_secret` so they can never be correlated from logs.

---

## 8. Local store format

`~/.tq/system/secrets.json` (0600) — encrypted envelope:

```json
{ "version": 1, "alg": "AES-256-GCM", "nonce": "<base64>", "ciphertext": "<base64>" }
```

Key resolution order: `TQ_SECRET_KEY` env (32-byte hex/base64/raw) → `~/.tq/system/.secret_key` (64-hex, auto-generated). A legacy plaintext map (`{name: value}`) is accepted for development only.

---

## 9. Rotation & revocation

- **Rotate DEK**: `public.rotate_secret_dek` re-encrypts every credential under a fresh DEK (`key_version++`).
- **Revoke device**: delete/disable the `workers.devices` row — its `device_token_hash` no longer matches, so `fetch_secrets` is refused. Other devices are unaffected.
- **Rotate a credential**: `tq secret set <name> <new-value>` + `tq secret push`.

---

## 10. Security properties & non-goals

**Guaranteed:** no plaintext credential in workflow graph / job payload / logs / git; cloud values are ciphertext; unauthenticated or wrong-token access is refused; local store is encrypted with a per-device key.

**Not yet (hardening v2):** the DEK is kept server-side and decrypted values are delivered over TLS to the authenticated device — a device keypair + per-device DEK wrapping (X25519 sealed box) would remove the DEK from the delivery path entirely and make revocation independent of DEK rotation. `.identity.json` is not yet encrypted at rest.

---

## 11. Verification

```bash
# Local round-trip
tq secret init && tq secret set hrms_password '***'
tq secret list                       # names only, ********
grep -c '<plaintext>' ~/.tq/system/secrets.json   # => 0

# Cloud round-trip (device-authenticated)
tq secret push && tq secret remote
rm ~/.tq/system/secrets.json && tq secret pull && tq secret list

# Engine
tq automation run <file>.workflow.json --headless --browser-id <id>     # resolves {{secrets.*}}
```
