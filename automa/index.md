# Automa Workflow Orchestration & Headless DAG Engine

Modern browser scraping, data extraction, and form-filling workflows require a balance between visual drag-and-drop authoring, deterministic DAG execution, and headless execution performance. 

**Specter Automa** is a next-generation workflow orchestration platform powered by the [`tuquet-automa`](https://github.com/tuquet/automa) microservice. It pairs an extensible **Workflow Engine Directed Acyclic Graph (DAG)** compiler with native pure-Rust Chrome DevTools Protocol (CDP) execution, supervised by the local runner daemon and SQLite persistence layer.

---

## 1. Hybrid Architecture: Visual Studio & Headless Rust Engine

Automa resolves the tradeoff between usability and raw automation performance through a decoupled hybrid architecture:

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                AUTOMA WORKFLOW ARCHITECTURE                 │
 │                                                             │
 │   ┌──────────────────────┐       ┌──────────────────────┐   │
 │   │  Vue 3 Web Studio    │ ────► │ JSON Workflow Schema │   │
 │   │  (Drag-and-Drop DAG) │       │ (*.workflow.json)    │   │
 │   └──────────────────────┘       └──────────┬───────────┘   │
 │                                             │               │
 │                                             ▼               │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │           Rust Automa Core Execution Engine         │   │
 │   │                                                     │   │
 │   │  • Topological DAG Sorting & Branch Evaluation      │   │
 │   │  • Dynamic Runtime Variable Substitution (-p / -var)│   │
 │   │  • Timeout & Error Recovery State Machine           │   │
 │   └─────────────────────────┬───────────────────────────┘   │
 │                             │                               │
 │                             ▼                               │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │       Native CDP DevTools Protocol Bridge           │   │
 │   │  • DOM Query, Click, Type, Bézier Mouse Dispatch    │   │
 │   │  • Network Request Interception & Cookie Jar        │   │
 │   └─────────────────────────┬───────────────────────────┘   │
 │                             │                               │
 │                             ▼                               │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │              Local SQLite Persistence               │   │
 │   │         (~/.specter/automa/automa.sqlite)            │   │
 │   │  • Execution Logs, Step Traces, Workflow Vault      │   │
 │   └─────────────────────────────────────────────────────┘   │
 └─────────────────────────────────────────────────────────────┘
```

1. **Visual Web Studio (`specter automa studio`)**:
   - Web canvas for visual workflow composition: blocks for Navigation, Element Click, Input Text, Loop Data, JavaScript Evaluation, and Conditions.
2. **Topological DAG Compiler**:
   - Compiles connected block graphs into an optimized dependency tree, resolving variable scopes and async race conditions.
3. **Pure-Rust CDP Execution Driver**:
   - Communicates directly over local WebSockets using the Chrome DevTools Protocol (CDP). Bypasses heavy Node.js runtimes and WebDriver abstraction overhead.
4. **Local SQLite Store & Vault**:
   - Workflows are stored and versioned in `~/.specter/automa/workflows/`, while execution records, timing benchmarks, and run histories are recorded in `~/.specter/automa/automa.sqlite`.

---

## 2. Command Reference

All workflow actions can be executed via the `specter automa` command suite:

### Direct Workflow Execution

```bash
# Execute a workflow directly via native browser worker
specter automa run ./scrape_products.workflow.json

# Execute in headless mode with a 60-second safety timeout
specter automa run ./checkout.workflow.json --headless --timeout 60

# Pass runtime variables (key-value interpolation)
specter automa run ./login.workflow.json \
  -p USERNAME="admin@enterprise.vn" \
  -p TARGET_URL="https://app.enterprise.vn"

# Execute workflow against a specific cloud browser profile
specter automa run ./task.workflow.json --cloud_profile "Facebook-Ad-VN"
```

### Workflow Vault & Database Management

```bash
# List all workflows saved in database and file vault
specter automa workflow list

# Filter workflows by keyword search
specter automa workflow list --search "shopee"

# Import a workflow JSON file into local vault and SQLite DB
specter automa workflow import ./flows/checkout.json --id "checkout-flow" --name "E-commerce Checkout"

# Inspect detailed block sequence, parameters, and triggers
specter automa inspect ./checkout-flow.workflow.json

# Export workflow from database to a standalone JSON file
specter automa workflow export "checkout-flow" -o ./exported.json

# Delete workflow from database and vault
specter automa workflow delete "checkout-flow" --vault
```

### Visual Studio & Diagnostics

```bash
# Launch Automa Web Studio in default system browser
specter automa studio

# Probe Automa engine manifest capabilities
specter automa probe

# Inspect or edit Automa configuration (~/.specter/automa/automa.json)
specter automa config --show
specter automa config --edit
```

---

## 3. Workflow File Structure (`*.workflow.json`)

Automa workflows are stored as declarative JSON manifests containing node definitions, parameter bindings, and transition edges:

```json
{
  "name": "E-Commerce Price Scraper",
  "version": "1.2.0",
  "description": "Navigates to product catalog, extracts prices, and exports table",
  "drawflow": {
    "nodes": [
      {
        "id": "trigger-1",
        "label": "Manual / CLI Trigger",
        "type": "trigger"
      },
      {
        "id": "nav-1",
        "label": "Open Target URL",
        "type": "new-tab",
        "data": {
          "url": "{{TARGET_URL}}"
        }
      },
      {
        "id": "loop-1",
        "label": "Extract Product Cards",
        "type": "loop-elements",
        "data": {
          "selector": ".product-card"
        }
      }
    ]
  }
}
```

---

## 4. SSOT Storage & Microservice Pillar 2

In strict adherence to Specter's SSOT architecture, all Automa files resolve exclusively to `~/.specter/automa/`:

```text
~/.specter/automa/
├── automa.json               # Engine configuration & studio port settings
├── automa.sqlite             # Execution history, step logs, workflow records
├── runner.json               # Runner daemon supervisor configuration
└── workflows/                # Local workflow file vault (*.workflow.json)
```

---

## 5. AI Agent Integration (Native MCP Protocol)

AI agents orchestrate and inspect workflows programmatically through three native MCP tools:

1. **`specter_workflow_run`**:
   - Executes a workflow file with variable substitutions and returns execution status, duration, and error codes.
2. **`specter_workflow_list`**:
   - Lists all available workflows stored in the local vault and database.
3. **`specter_workflow_inspect`**:
   - Validates JSON structure, required input parameters, and transition blocks of a workflow before execution.

