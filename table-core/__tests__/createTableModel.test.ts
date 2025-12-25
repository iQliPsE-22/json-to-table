import { describe, it, expect } from "vitest";
import { createTableModel } from "../createTableModel";
import { Column } from "../types";

describe("createTableModel", () => {
  const columns: Column[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
  ];
  const data = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  it("should create a table model with headers and rows", () => {
    const result = createTableModel(columns, data);
    expect(result.headers).toEqual(columns);
    expect(result.rows).toHaveLength(2);
  });

  it("should generate correct row keys", () => {
    const result = createTableModel(columns, data);
    expect(result.rows[0].key).toBe("row-0");
    expect(result.rows[1].key).toBe("row-1");
  });

  it("should map cell values correctly", () => {
    const result = createTableModel(columns, data);
    expect(result.rows[0].cells).toEqual([
      { columnKey: "id", value: 1 },
      { columnKey: "name", value: "Alice" },
    ]);
  });
});
