import { describe, expect, it } from "vitest";

import { suffixed } from "../src";

describe("suffixed", () => {
  it("accepts strings ending with the suffix", () => {
    expect(suffixed("px")("16px")).toBe(true);
    expect(suffixed("px")("px")).toBe(true);
  });

  it("rejects strings not ending with the suffix", () => {
    expect(suffixed("px")("16pt")).toBe(false);
    expect(suffixed("px")("pxel")).toBe(false);
  });

  it("rejects non-strings", () => {
    expect(suffixed("px")(16)).toBe(false);
    expect(suffixed("px")(null)).toBe(false);
    expect(suffixed("px")({ value: "16px" })).toBe(false);
  });
});
