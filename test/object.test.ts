import { describe, expect, it } from "vitest";

import { object } from "../src";

describe("object", () => {
  it("accepts plain objects and class instances", () => {
    expect(object({})).toBe(true);
    expect(object(new Date())).toBe(true);
  });

  it("rejects arrays, null, and primitives", () => {
    expect(object([])).toBe(false);
    expect(object(null)).toBe(false);
    expect(object(1)).toBe(false);
  });
});
