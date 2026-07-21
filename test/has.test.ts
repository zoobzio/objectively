import { describe, expect, it } from "vitest";

import { has } from "../src";

describe("has", () => {
  it("accepts non-array objects carrying the key", () => {
    expect(has("$value")({ $value: 4 })).toBe(true);
    expect(has("$value")({ $type: "color", $value: "{color.fg}" })).toBe(true);
  });

  it("rejects objects missing the key", () => {
    expect(has("$value")({ value: 4, unit: "px" })).toBe(false);
    expect(has("$value")({})).toBe(false);
  });

  it("rejects arrays, primitives, and null", () => {
    expect(has("$value")([{ $value: 1 }])).toBe(false);
    expect(has("$value")("{color.fg}")).toBe(false);
    expect(has("$value")(4)).toBe(false);
    expect(has("$value")(null)).toBe(false);
  });
});
