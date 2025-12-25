import { describe, it, expect } from "vitest";
import { applyPagination } from "../pagination";

describe("applyPagination", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("should return the first page", () => {
    const result = applyPagination(data, { page: 1, pageSize: 3 });
    expect(result).toEqual([1, 2, 3]);
  });

  it("should return the second page", () => {
    const result = applyPagination(data, { page: 2, pageSize: 3 });
    expect(result).toEqual([4, 5, 6]);
  });

  it("should return an empty array if page is beyond data range", () => {
    const result = applyPagination(data, { page: 5, pageSize: 3 });
    expect(result).toEqual([]);
  });

  it("should handle pageSize larger than data length", () => {
    const result = applyPagination(data, { page: 1, pageSize: 20 });
    expect(result).toEqual(data);
  });

  it("should return an empty array for empty data", () => {
    const result = applyPagination([], { page: 1, pageSize: 10 });
    expect(result).toEqual([]);
  });
});
