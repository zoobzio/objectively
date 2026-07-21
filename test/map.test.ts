import { describe, expect, it } from "vitest";

import { map } from "../src";

describe("map", () => {
  it("maps values, preserving keys", () => {
    expect(map({ a: 1, b: 2 }, (value) => value * 10)).toEqual({
      a: 10,
      b: 20,
    });
  });
});
