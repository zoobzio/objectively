import { describe, expect, it } from "vitest";

import { keys } from "../src";

const subject = {
  color: "brand",
  size: 4,
  active: true,
};

describe("keys", () => {
  it("returns the object's own keys", () => {
    expect(keys(subject)).toEqual(["color", "size", "active"]);
  });

  it("types each key to the key union", () => {
    const named: ("color" | "size" | "active")[] = keys(subject);
    expect(named).toHaveLength(3);
  });
});
