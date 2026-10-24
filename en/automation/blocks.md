# Block Coverage & Automa Parity

Tuquet executes workflows authored on the **Automa canvas**, so the workflow document is the
single source of truth. This page records exactly which Automa blocks the engine implements,
and what happens when a document uses one it does not.

## The rule: *declared ⇒ satisfied*

A canvas can author any block. If the engine silently skipped a block it does not implement,
the canvas would be **fake authoring** and a run would look successful while doing nothing.
So:

* a block the engine does not implement makes the workflow **fail** — at publish-time
  (`automation.validate_workflow_graph`), at resolve-time (`workflow.schema.json` + block
  coverage in the CLI) and at run-time (the engine's default branch);
* blocks that exist only to organise the canvas (`blocks-group`, `note`) are skipped
  **explicitly** — Automa gives them no runtime handler either.

## Implemented blocks

`active-tab` · `attribute-value` · `block-package` · `close-tab` · `conditions` · `contains` ·
`cookie` · `custom-data` · `delay` · `delete` · `element-exists` · `element-scroll` · `empty` ·
`eq` · `event-click` · `execute-workflow` · `export-data` · `forms` · `forward-page` ·
`get-all` · `get-text` · `go-back` · `gt` · `gte` · `hover-element` · `increase-variable` ·
`insert-data` · `javascript-code` · `loop-breakpoint` · `loop-data` · `loop-elements` · `lt` ·
`lte` · `ne` · `new-tab` · `numbers` · `press-key` · `reload-tab` · `repeat-task` · `set` ·
`take-screenshot` · `trigger` · `turnstile` · `variable` · `webhook` · `while-loop`

Canvas-only (no runtime behaviour, skipped): `blocks-group` · `note`

Not implemented (rejected loudly): `google-sheets`, `google-drive`, `ai-workflow`,
`element-change`, `create-element`, `delete-element`, `edit-element`, `sort-data`,
`slice-variable`, `workflow-state`, …

## Document shape

Both shapes are accepted:

| Shape | Produced by | Notes |
| --- | --- | --- |
| `drawflow.nodes` / `drawflow.edges` | the Automa canvas (export) | the canonical form; verbatim exports are regression-tested under `cli/fixtures/automa-export-*.json` |
| `nodes` / `edges` | Tuquet API/CLI authors | flat shorthand, same node objects |

Also honoured from the document root: `id`, `name`, `table` / `dataColumns`, `globalData` /
`global_data`, `settings` (`onError`, `blockDelay`, `restartTimes`, `saveLog`, `debugMode`),
`trigger`, `isDisabled`, `includedWorkflows`.

## `export-data`

Automa hands the bytes to the browser download API. Headless has no such surface, so the
artefact is written to disk and the **path is returned** as the block output:

* directory: `TQ_EXPORT_DIR`, default `~/.tq/automation/exports`
* `type`: `csv` (BOM when `addBOMHeader`, delimiter from `csvDelimiter`), `json` (pretty), `plain-text`
* `onConflict`: `uniquify` (default — appends `-1`, `-2`, …) or `overwrite`
* CSV header order follows the declared `table` columns first, then any extra keys
* `dataToExport`: `data-columns` (the workflow table) or `variable`; `google-sheets` is
  rejected because that block is not implemented

## `execute-workflow`

Sub-workflows are resolved from `includedWorkflows` in the same document (that is how Automa
packs referenced workflows into an export). A run stores its results like Automa does:

```
{{workflow.<executeId|workflowId-subN>.variables.<name>}}
{{workflow.<key>.table}}
```

`insertAllVars` merges the sub-workflow's variables back into the parent. A sub-workflow that
executes its own parent, or nesting deeper than 10 levels, is refused.

## Data tables

`insert-data` writes values at a **per-column row cursor** (`WorkflowWorker.addDataToColumn`),
which is what makes several columns inserted by one block land in the same row. Values are
coerced by the declared column type exactly like Automa's `convertData`: `integer` keeps digits
only (`"ℹ301 extra"` → `301`), `boolean` is JS truthiness, `string` stringifies, `any` and
unknown types (`number`, `json`, `date`) pass through untouched.
