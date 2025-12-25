# Headless Table Engine (v0)

A small, headless table engine that converts column definitions + raw data into a render-ready table model, without coupling logic to UI.

## The Problem

In most frontend apps, table logic is tightly coupled to UI code.

This leads to:

- data mapping inside JSX
- duplicated logic across tables
- hard-to-test behavior
- fragile refactors
- messy components that do too much

Every new table becomes a custom implementation.

## The Idea

Separate table logic from table rendering.

Instead of mixing data processing with UI, extract the logic into a pure function that produces a predictable model the UI can render.

## What This Library Does (v0)

At its core, this project exposes a single function:

```javascript
createTableModel(columns, data);
```

It:

- takes column definitions
- takes raw row data
- returns a render-ready table model

- No React.
- No JSX.
- No styling.

Just data → data.

## What It Does NOT Do (Yet)

v0 is intentionally minimal.

It does not include:

- sorting
- pagination
- filtering
- selection
- permissions
- server-side logic

These will be layered on top without changing the core API.

## Example

### Input

```javascript
const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

const data = [
  { name: "A", email: "a@test.com" },
  { name: "B", email: "b@test.com" },
];
```

### Core Logic

```javascript
const model = createTableModel(columns, data);
```

### Output

```json
{
  "headers": [
    { "key": "name", "label": "Name" },
    { "key": "email", "label": "Email" }
  ],
  "rows": [
    {
      "key": "row-0",
      "cells": [
        { "columnKey": "name", "value": "A" },
        { "columnKey": "email", "value": "a@test.com" }
      ]
    }
  ]
}
```

Your UI simply renders this.

## Why Headless?

Because:

- logic becomes reusable
- UI stays simple
- behavior is testable
- the engine works with any framework

React is just one consumer.

## Design Principles

- Pure functions only
- Deterministic output
- No UI assumptions
- Composable architecture
- Small surface area

If v0 is clean, everything built on top stays clean.

## Who This Is For

- developers building dashboards
- internal tools
- admin panels
- data-heavy UIs
- teams tired of copy-pasting table logic

This is infrastructure, not a component library.

## Roadmap (High-level)

- v0: data → table model ✅
- v1: sorting
- v2: pagination
- v3: filtering
- v4: server-driven tables
- v5: permissions & access control

Each feature is layered without breaking the core.

## Status

Early-stage, experimental, intentionally minimal.

The API is expected to evolve.
