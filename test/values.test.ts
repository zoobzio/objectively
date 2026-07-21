import { describe, expect, it } from "vitest";

import { values } from "../src";

const subject = {
  color: "brand",
  size: 4,
  active: true,
};

describe("values", () => {
  it("returns the object's own values", () => {
    expect(values(subject)).toEqual(["brand", 4, true]);
  });

  it("types each value to the value union", () => {
    const valued: (string | number | boolean)[] = values(subject);
    expect(valued).toHaveLength(3);
  });
});
