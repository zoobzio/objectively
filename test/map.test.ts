import { describe, expect, it } from "vitest";

import { map } from "../src";

describe("map", () => {
  it("applies the callback to each value and keeps the keys", () => {
    expect(map({ a: 1, b: 2 }, (value) => value * 10)).toEqual({
      a: 10,
      b: 20,
    });
  });
});
