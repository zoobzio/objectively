import { describe, expect, it } from "vitest";

import { equals } from "../src";

describe("equals", () => {
  it("compares primitives by SameValueZero", () => {
    expect(equals(1, 1)).toBe(true);
    expect(equals(NaN, NaN)).toBe(true);
    expect(equals(1, 2)).toBe(false);
  });

  it("compares arrays element by element", () => {
    expect(equals([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(equals([1, 2], [1, 2, 3])).toBe(false);
  });

  it("compares records key by key", () => {
    expect(equals({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(equals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it("treats null and undefined as distinct", () => {
    expect(equals(null, undefined)).toBe(false);
  });
});
