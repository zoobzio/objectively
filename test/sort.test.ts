import { describe, expect, it } from "vitest";

import { sort } from "../src";

describe("sort", () => {
  it("orders the keys with the comparator", () => {
    const result = sort({ c: 3, a: 1, b: 2 }, (x, y) => x.localeCompare(y));
    expect(Object.keys(result)).toEqual(["a", "b", "c"]);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("accepts a collator's compare function", () => {
    const collator = new Intl.Collator("en");
    const result = sort({ "item-10": 10, "item-2": 2, "item-1": 1 }, collator.compare);
    expect(Object.keys(result)).toEqual(["item-1", "item-10", "item-2"]);
  });

  it("reverses the order when the comparator reverses", () => {
    const result = sort({ a: 1, b: 2, c: 3 }, (x, y) => y.localeCompare(x));
    expect(Object.keys(result)).toEqual(["c", "b", "a"]);
  });

  it("returns a new object and does not change the source", () => {
    const source = { b: 2, a: 1 };
    const result = sort(source, (x, y) => x.localeCompare(y));
    expect(result).not.toBe(source);
    expect(Object.keys(source)).toEqual(["b", "a"]);
  });

  it("keeps the source type", () => {
    const result: { b: number; a: string } = sort({ b: 2, a: "x" }, (x, y) => x.localeCompare(y));
    expect(result.a).toBe("x");
    expect(result.b).toBe(2);
  });

  it("keeps keys that have the value undefined", () => {
    const result = sort({ b: undefined, a: 1 }, (x, y) => x.localeCompare(y));
    expect(Object.keys(result)).toEqual(["a", "b"]);
    expect("b" in result).toBe(true);
  });

  it("returns an empty object for an empty object", () => {
    expect(sort({}, () => 0)).toEqual({});
  });
});
