import { describe, it, expect } from "vitest";
import { applySorting } from "../sorting";

describe("applySorting", () => {
  const data = [
    { id: 3, name: "Charlie", age: 30 },
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 35 },
    { id: 4, name: "David", age: null },
  ];

  it("should sort by number field in ascending order", () => {
    const result = applySorting(data, { key: "id", direction: "asc" });
    expect(result.map((i) => i.id)).toEqual([1, 2, 3, 4]);
  });

  it("should sort by number field in descending order", () => {
    const result = applySorting(data, { key: "id", direction: "desc" });
    expect(result.map((i) => i.id)).toEqual([4, 3, 2, 1]);
  });

  it("should sort by string field in ascending order", () => {
    const result = applySorting(data, { key: "name", direction: "asc" });
    expect(result.map((i) => i.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
      "David",
    ]);
  });

  it("should sort by string field in descending order", () => {
    const result = applySorting(data, { key: "name", direction: "desc" });
    expect(result.map((i) => i.name)).toEqual([
      "David",
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });

  it("should handle null/undefined values correctly (asc)", () => {
    const result = applySorting(data, { key: "age", direction: "asc" });
    // null should be at the beginning in asc by implementation
    expect(result[0].name).toBe("David");
    expect(result.slice(1).map((i) => i.age)).toEqual([25, 30, 35]);
  });

  it("should handle null/undefined values correctly (desc)", () => {
    const result = applySorting(data, { key: "age", direction: "desc" });
    // null should be at the end in desc by implementation
    expect(result[3].name).toBe("David");
    expect(result.slice(0, 3).map((i) => i.age)).toEqual([35, 30, 25]);
  });

  it("should return a new array (immutability)", () => {
    const result = applySorting(data, { key: "id", direction: "asc" });
    expect(result).not.toBe(data);
  });

  it("should return original data if sortConfig is null", () => {
    const result = applySorting(data, null);
    expect(result).toBe(data);
  });
});
