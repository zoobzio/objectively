import { describe, expect, it } from "vitest";

import { prefixed } from "../src";

describe("prefixed", () => {
  it("accepts strings starting with the prefix", () => {
    expect(prefixed("--")("--color")).toBe(true);
    expect(prefixed("--")("--")).toBe(true);
  });

  it("rejects strings not starting with the prefix", () => {
    expect(prefixed("--")("color")).toBe(false);
    expect(prefixed("--")("-color")).toBe(false);
  });

  it("rejects non-strings", () => {
    expect(prefixed("--")(4)).toBe(false);
    expect(prefixed("--")(null)).toBe(false);
    expect(prefixed("--")({ value: "--x" })).toBe(false);
  });
});
