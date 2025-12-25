# Headless Table Engine

A powerful, headless table engine that transforms raw JSON data into a render-ready table model through a functional pipe. It handles filtering, sorting, and pagination without being coupled to any specific UI framework.

## The Problem

Table logic (data mapping, sorting algorithms, pagination math) is often mixed with UI components. This makes the code:

- Hard to test
- Difficult to reuse across different UI frameworks
- Brittle and complex (the "fat component" problem)

## The Solution: Data Pipeline

`table-core` solves this by treating table state as a series of data transformations.

```mermaid
graph LR
    Data[Raw JSON Data] --> Filters[applyFilters]
    Filters --> Sort[applySorting]
    Sort --> Paginate[applyPagination]
    Paginate --> Model[createTableModel]
    Model --> UI[Render-ready Model]
```

## Features

- **Headless**: Pure logic. No CSS, no JSX, no DOM. Works with React, Vue, Svelte, or Vanilla JS.
- **Composable**: Use the functional `pipe` to chain transformations easily.
- **Tested**: Comprehensive unit tests for every core transformation (24+ tests).
- **Type-safe**: Built with TypeScript for excellent developer experience.

## Usage Example

```typescript
import {
  pipe,
  applyFilters,
  applySorting,
  applyPagination,
  createTableModel,
} from "./table-core";

const columns = [
  { key: "name", label: "Full Name" },
  { key: "age", label: "Age" },
];

const rawData = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 },
  // ... more data
];

// Combine transformations into a single predictable model
const tableModel = pipe(
  rawData,
  (data) => applyFilters(data, [{ key: "name", value: "a" }]), // Filter names containing 'a'
  (data) => applySorting(data, { key: "age", direction: "asc" }), // Sort by age
  (data) => applyPagination(data, { page: 1, pageSize: 10 }), // Get first 10 items
  (data) => createTableModel(columns, data) // Transform to model
);

// tableModel is now ready to be rendered by any UI:
// {
//   headers: [{ key: "name", label: "Full Name" }, ...],
//   rows: [{ key: "row-0", cells: [...] }, ...]
// }
```

## Running Tests

The core engine is fully tested using Vitest:

```bash
# Run all tests
npx vitest run table-core/__tests__
```

## Design Principles

- **Pure functions only**: Deterministic output given the same input.
- **No UI assumptions**: Logic is completely separated from rendering.
- **Immutability**: Transformations return new arrays/objects, keeping original data intact.
