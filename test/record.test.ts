import { describe, expect, it } from "vitest";

import { record } from "../src";

describe("record", () => {
  it("accepts plain objects", () => {
    expect(record({})).toBe(true);
    expect(record({ a: 1 })).toBe(true);
    expect(record(Object.create(null))).toBe(true);
  });

  it("rejects arrays, functions, class instances, and primitives", () => {
    expect(record([])).toBe(false);
    expect(record(() => {})).toBe(false);
    expect(record(new Date())).toBe(false);
    expect(record(null)).toBe(false);
    expect(record("x")).toBe(false);
  });
});
