import { describe, expect, it } from "vitest";

import { object } from "../src";

describe("object", () => {
  it("accepts non-array objects including class instances", () => {
    expect(object({})).toBe(true);
    expect(object(new Date())).toBe(true);
  });

  it("rejects arrays and primitives", () => {
    expect(object([])).toBe(false);
    expect(object(null)).toBe(false);
    expect(object(1)).toBe(false);
  });
});
