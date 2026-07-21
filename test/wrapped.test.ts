import { describe, expect, it } from "vitest";

import { wrapped } from "../src";

describe("wrapped", () => {
  it("accepts strings bounded by both delimiters", () => {
    expect(wrapped("{", "}")("{color.bg}")).toBe(true);
    expect(wrapped("{", "}")("{}")).toBe(true);
  });

  it("rejects strings missing a delimiter", () => {
    expect(wrapped("{", "}")("color.bg")).toBe(false);
    expect(wrapped("{", "}")("{color.bg")).toBe(false);
    expect(wrapped("{", "}")("color.bg}")).toBe(false);
  });

  it("rejects non-strings", () => {
    expect(wrapped("{", "}")(4)).toBe(false);
    expect(wrapped("{", "}")(null)).toBe(false);
    expect(wrapped("{", "}")({ value: "{color.bg}" })).toBe(false);
  });
});
