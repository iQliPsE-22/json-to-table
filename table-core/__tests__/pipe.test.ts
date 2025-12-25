import { describe, it, expect } from "vitest";
import { pipe } from "../pipe";

describe("pipe", () => {
  it("should apply functions sequentially", () => {
    const add1 = (n: number) => n + 1;
    const mult2 = (n: number) => n * 2;
    const result = pipe(5, add1, mult2);
    expect(result).toBe(12);
  });

  it("should work with identity functions", () => {
    const identity = <T>(v: T) => v;
    const result = pipe("hello", identity, identity);
    expect(result).toBe("hello");
  });

  it("should return the value if no functions are provided", () => {
    const result = pipe(10);
    expect(result).toBe(10);
  });
});
