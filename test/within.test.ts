import { describe, expect, expectTypeOf, it } from "vitest";

import { within } from "../src";

const display = new Set(["block", "inline"] as const);
const units = ["px", "rem"] as const;

describe("within", () => {
  describe("as a guard", () => {
    it("accepts a member of a Set", () => {
      expect(within(display, "block")).toBe(true);
      expect(within(display, "inline")).toBe(true);
    });

    it("accepts a member of a readonly array", () => {
      expect(within(units, "px")).toBe(true);
      expect(within(units, "rem")).toBe(true);
    });

    it("rejects a string that is not a member", () => {
      expect(within(display, "flex")).toBe(false);
      expect(within(units, "em")).toBe(false);
      expect(within(units, "")).toBe(false);
    });

    it("rejects non-strings", () => {
      expect(within(units, 4)).toBe(false);
      expect(within(units, null)).toBe(false);
      expect(within(units, undefined)).toBe(false);
      expect(within(units, ["px"])).toBe(false);
      expect(within(units, { value: "px" })).toBe(false);
    });

    it("narrows the value to the member union", () => {
      const input: unknown = "block";
      if (within(display, input)) {
        expectTypeOf(input).toEqualTypeOf<"block" | "inline">();
        const kind: "block" | "inline" = input;
        expect(kind).toBe("block");
      } else {
        expect.unreachable();
      }

      const unit: string = "rem";
      if (within(units, unit)) {
        expectTypeOf(unit).toEqualTypeOf<"px" | "rem">();
      } else {
        expect.unreachable();
      }
    });
  });

  describe("as a guard factory", () => {
    it("returns a guard", () => {
      const guard = within(display);
      expect(typeof guard).toBe("function");
      expect(guard("block")).toBe(true);
      expect(guard("flex")).toBe(false);
      expect(guard(null)).toBe(false);
    });

    it("narrows the elements of a filtered array", () => {
      const items: unknown[] = ["px", "em", "rem", 4, null];
      const result: ("px" | "rem")[] = items.filter(within(units));
      expect(result).toEqual(["px", "rem"]);

      const kinds: string[] = ["block", "flex", "inline"];
      const allowed = kinds.filter(within(display));
      expectTypeOf(allowed).toEqualTypeOf<("block" | "inline")[]>();
      expect(allowed).toEqual(["block", "inline"]);
    });
  });
});
