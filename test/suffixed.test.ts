import { describe, expect, it } from "vitest";

import { suffixed } from "../src";

describe("suffixed", () => {
  describe("as a guard", () => {
    it("accepts strings that end with the suffix", () => {
      expect(suffixed("px", "16px")).toBe(true);
      expect(suffixed("px", "px")).toBe(true);
    });

    it("rejects strings that do not end with the suffix", () => {
      expect(suffixed("px", "16pt")).toBe(false);
      expect(suffixed("px", "pxel")).toBe(false);
    });

    it("rejects non-strings", () => {
      expect(suffixed("px", 16)).toBe(false);
      expect(suffixed("px", null)).toBe(false);
      expect(suffixed("px", undefined)).toBe(false);
      expect(suffixed("px", { value: "16px" })).toBe(false);
    });
  });

  describe("as a guard factory", () => {
    it("returns a guard", () => {
      const guard = suffixed("px");
      expect(typeof guard).toBe("function");
      expect(guard("16px")).toBe(true);
      expect(guard("16pt")).toBe(false);
    });

    it("narrows the elements of a filtered array", () => {
      const items: unknown[] = ["16px", "1em", "4px", 4];
      const result: `${string}px`[] = items.filter(suffixed("px"));
      expect(result).toEqual(["16px", "4px"]);
    });
  });
});
