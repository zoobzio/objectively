import { describe, expect, it } from "vitest";

import { prefixed } from "../src";

describe("prefixed", () => {
  describe("as a guard", () => {
    it("accepts strings that start with the prefix", () => {
      expect(prefixed("--", "--color")).toBe(true);
      expect(prefixed("--", "--")).toBe(true);
    });

    it("rejects strings that do not start with the prefix", () => {
      expect(prefixed("--", "color")).toBe(false);
      expect(prefixed("--", "-color")).toBe(false);
    });

    it("rejects non-strings", () => {
      expect(prefixed("--", 4)).toBe(false);
      expect(prefixed("--", null)).toBe(false);
      expect(prefixed("--", undefined)).toBe(false);
      expect(prefixed("--", { value: "--x" })).toBe(false);
    });
  });

  describe("as a guard factory", () => {
    it("returns a guard", () => {
      const guard = prefixed("--");
      expect(typeof guard).toBe("function");
      expect(guard("--color")).toBe(true);
      expect(guard("color")).toBe(false);
    });

    it("narrows the elements of a filtered array", () => {
      const items: unknown[] = ["--a", "b", "--c", 4];
      const result: `--${string}`[] = items.filter(prefixed("--"));
      expect(result).toEqual(["--a", "--c"]);
    });
  });
});
