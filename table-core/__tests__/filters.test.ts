import { describe, it, expect } from "vitest";
import { applyFilters } from "../filters";

describe("applyFilters", () => {
  const data = [
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Banana", category: "Fruit" },
    { id: 3, name: "Carrot", category: "Vegetable" },
  ];

  it("should filter by case-insensitive string match", () => {
    const filters = [{ key: "name" as const, value: "ap" }];
    const result = applyFilters(data, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Apple");
  });

  it("should filter by exact match for non-string values", () => {
    const filters = [{ key: "id" as const, value: 2 }];
    const result = applyFilters(data, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Banana");
  });

  it("should apply multiple filters sequentially", () => {
    const filters = [
      { key: "category" as const, value: "Fruit" },
      { key: "name" as const, value: "ba" },
    ];
    const result = applyFilters(data, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Banana");
  });

  it("should return all data if filters are empty", () => {
    const result = applyFilters(data, []);
    expect(result).toBe(data);
  });

  it("should return an empty array if no matches are found", () => {
    const filters = [{ key: "name" as const, value: "Zebra" }];
    const result = applyFilters(data, filters);
    expect(result).toHaveLength(0);
  });
});
