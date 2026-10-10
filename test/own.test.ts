import { describe, expect, it } from "vitest";

import { own } from "../src";

describe("own", () => {
  describe("as a guard", () => {
    it("accepts objects that have the key as an own property", () => {
      expect(own("$value", { $value: 4 })).toBe(true);
      expect(own("$value", { $type: "color", $value: "{color.fg}" })).toBe(true);
      expect(own("$value", { $value: undefined })).toBe(true);
    });

    it("rejects objects that do not have the key", () => {
      expect(own("$value", { value: 4, unit: "px" })).toBe(false);
      expect(own("$value", {})).toBe(false);
    });

    it("rejects keys that come from the prototype", () => {
      const proto = { $value: 1 };
      const child = Object.create(proto);
      expect(own("$value", child)).toBe(false);
      expect(own("toString", {})).toBe(false);
    });

    it("accepts own keys on objects with a null prototype", () => {
      const bare = Object.create(null);
      bare.$value = 1;
      expect(own("$value", bare)).toBe(true);
    });

    it("rejects arrays, primitives, null, and undefined", () => {
      expect(own("$value", [{ $value: 1 }])).toBe(false);
      expect(own("$value", "{color.fg}")).toBe(false);
      expect(own("$value", 4)).toBe(false);
      expect(own("$value", null)).toBe(false);
      expect(own("$value", undefined)).toBe(false);
    });
  });

  describe("as a guard factory", () => {
    it("returns a guard", () => {
      const guard = own("$value");
      expect(typeof guard).toBe("function");
      expect(guard({ $value: 4 })).toBe(true);
      expect(guard(Object.create({ $value: 4 }))).toBe(false);
    });

    it("narrows the elements of a filtered array", () => {
      const items: unknown[] = [{ id: 1 }, "x", { id: 2 }, null];
      const result: Record<"id", unknown>[] = items.filter(own("id"));
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});
