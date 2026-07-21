import { describe, expect, it } from "vitest";

import { entries } from "../src";

const subject = {
  color: "brand",
  size: 4,
  active: true,
};

describe("entries", () => {
  it("returns the object's own entries", () => {
    expect(entries(subject)).toEqual([
      ["color", "brand"],
      ["size", 4],
      ["active", true],
    ]);
  });
});
