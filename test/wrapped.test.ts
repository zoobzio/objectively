import { describe, expect, it } from "vitest";

import { wrapped } from "../src";

describe("wrapped", () => {
  describe("as a guard", () => {
    it("accepts strings that start with open and end with close", () => {
      expect(wrapped("{", "}", "{color.bg}")).toBe(true);
      expect(wrapped("{", "}", "{}")).toBe(true);
    });

    it("rejects strings that do not have both delimiters", () => {
      expect(wrapped("{", "}", "color.bg")).toBe(false);
      expect(wrapped("{", "}", "{color.bg")).toBe(false);
      expect(wrapped("{", "}", "color.bg}")).toBe(false);
    });

    it("rejects non-strings", () => {
      expect(wrapped("{", "}", 4)).toBe(false);
      expect(wrapped("{", "}", null)).toBe(false);
      expect(wrapped("{", "}", undefined)).toBe(false);
      expect(wrapped("{", "}", { value: "{color.bg}" })).toBe(false);
    });
  });

  describe("as a guard factory", () => {
    it("returns a guard", () => {
      const guard = wrapped("{", "}");
      expect(typeof guard).toBe("function");
      expect(guard("{color.bg}")).toBe(true);
      expect(guard("color.bg")).toBe(false);
    });

    it("narrows the elements of a filtered array", () => {
      const items: unknown[] = ["{a}", "b", "{c}", 4];
      const result: `{${string}}`[] = items.filter(wrapped("{", "}"));
      expect(result).toEqual(["{a}", "{c}"]);
    });
  });
});
