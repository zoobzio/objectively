import { describe, expect, it } from "vitest";

import { has } from "../src";

describe("has", () => {
  describe("as a guard", () => {
    it("accepts objects that have the key", () => {
      expect(has("$value", { $value: 4 })).toBe(true);
      expect(has("$value", { $type: "color", $value: "{color.fg}" })).toBe(true);
    });

    it("rejects objects that do not have the key", () => {
      expect(has("$value", { value: 4, unit: "px" })).toBe(false);
      expect(has("$value", {})).toBe(false);
    });

    it("rejects arrays, primitives, null, and undefined", () => {
      expect(has("$value", [{ $value: 1 }])).toBe(false);
      expect(has("$value", "{color.fg}")).toBe(false);
      expect(has("$value", 4)).toBe(false);
      expect(has("$value", null)).toBe(false);
      expect(has("$value", undefined)).toBe(false);
    });

    it("narrows the value", () => {
      const input: unknown = { id: 1 };
      if (has("id", input)) {
        const id: unknown = input.id;
        expect(id).toBe(1);
      } else {
        expect.unreachable();
      }
    });
  });

  describe("as a guard factory", () => {
    it("returns a guard", () => {
      const guard = has("$value");
      expect(typeof guard).toBe("function");
      expect(guard({ $value: 4 })).toBe(true);
      expect(guard({})).toBe(false);
      expect(guard(null)).toBe(false);
    });

    it("narrows the elements of a filtered array", () => {
      const items: unknown[] = [{ id: 1 }, "x", { id: 2 }, null];
      const result: Record<"id", unknown>[] = items.filter(has("id"));
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});
