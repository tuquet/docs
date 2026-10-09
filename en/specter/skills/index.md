# AI Agent & Copilot Integration (Model Context Protocol)

Autonomous AI agents (Google Antigravity, Claude Code, Cursor, OpenAI Operator) are increasingly tasked with end-to-end web workflows: automated registration, market intelligence extraction, form submission, and cross-platform verification. When these agents execute standard headless browsers, they hit anti-bot walls within seconds.

**Specter** is engineered from the ground up for the agentic era, implementing a native **Model Context Protocol (MCP)** JSON-RPC 2.0 stdio server that equips AI agents with enterprise antidetect browser capabilities.

---

## 1. What is the Model Context Protocol (MCP)?

The **Model Context Protocol (MCP)** is an open industry standard that allows Large Language Models (LLMs) to securely inspect and control local operating system tools over standard input/output (`stdio`) without needing bash execution permissions or custom wrapper scripts.

```text
 ┌─────────────────────────┐                ┌─────────────────────────┐
 │   Autonomous AI Agent   │                │     Specter MCP Host    │
 │ (Claude Code, Cursor,   │ ── JSON-RPC ─► │     (specter mcp)       │
 │  Google Antigravity)    │ ◄── stdio ───  │                         │
 └─────────────────────────┘                └───────────┬─────────────┘
                                                        │
                      ┌─────────────────────────────────┼─────────────────────────────────┐
                      ▼                                 ▼                                 ▼
             specter_faker_generate            specter_workflow_run               specter_browser_status
             (Generate 100% compliant         (Execute complex headless         (Verify dedicated runtime
              Vietnamese CCCD & Personas)      scraping DAG workflows)           health and active profiles)
```

---

## 2. Complete MCP Tools Catalog

When launched via `specter mcp`, Specter registers native tools into the AI agent's tool registry:

| Tool Name | Arguments | Capabilities & Agent Action |
| :--- | :--- | :--- |
| **`specter_status`** | `{}` | Returns unified JSON status across Cloud pairing, local Runner daemon, and dedicated Browser engine. |
| **`specter_workflow_run`** | `workflow` (string), `variables` (object), `headless` (boolean), `timeout` (number) | Executes an Automa workflow DAG directly, interpolates dynamic runtime variables, and returns execution status. |
| **`specter_workflow_list`** | `search` (string), `vault_only` (boolean) | Lists all workflows stored in the local vault and database. |
| **`specter_workflow_inspect`** | `workflow` (string) | Validates workflow JSON syntax, inputs, parameters, and step transitions before execution. |
| **`specter_faker_generate`** | `count` (number), `gender` (string), `nat` (string), `domain` (string) | Generates mathematically verified synthetic identities (CCCD Modulo 11, addresses, credentials) for form-filling. |
| **`specter_browser_status`** | `{}` | Returns installation path, Chromium version, profile list, and disk footprint. |
| **`specter_runner_probe`** | `{}` | Negotiates hardware capabilities and active concurrent worker slots on the local runner. |
| **`specter_cloud_whoami`** | `{}` | Inspects active workstation enrollment GUID, tenant ID, and cloud authentication state. |
| **`specter_tree`** | `path` (string), `depth` (number) | Structured filesystem inspection respecting gitignore boundaries. |

---

## 3. Configuring MCP in Leading AI Agents

### Google Antigravity & Gemini CLI
Add the server definition to `~/.gemini/antigravity-cli/mcp_config.json`:

```json
{
  "mcpServers": {
    "specter": {
      "command": "specter",
      "args": ["mcp"]
    }
  }
}
```

### Claude Desktop
Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "specter": {
      "command": "specter",
      "args": ["mcp"]
    }
  }
}
```

### Cursor IDE
Add to `.cursor/mcp.json` or Workspace Settings:

```json
{
  "mcpServers": {
    "specter": {
      "command": "specter",
      "args": ["mcp"]
    }
  }
}
```

---

## 4. End-to-End Autonomous Agent Execution Flow

Here is how an autonomous agent uses Specter to complete complex operational requests:

```text
 1. User Prompt:
    "Generate 3 verified Vietnamese users and register them on the test staging portal."

 2. Agent Decision 1: Call specter_faker_generate
    Tool Arguments: { "count": 3, "nat": "VN" }
    Result: Returns 3 compliant identities with valid CCCD, phone, and diacritic-free emails.

 3. Agent Decision 2: Call specter_workflow_run
    Tool Arguments: { 
      "workflow": "staging_register", 
      "variables": { "USERS": [...] },
      "headless": true 
    }
    Result: Workflow executes via native CDP driver, resolves Turnstile, submits data, and returns success tokens.

 4. Agent Final Response:
    "Successfully provisioned and registered 3 verified test accounts on staging."
```

