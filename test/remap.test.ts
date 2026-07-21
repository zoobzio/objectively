import { describe, expect, it } from "vitest";

import { remap } from "../src";

describe("remap", () => {
  it("rebuilds into the named result shape, keys unchanged", () => {
    const result = remap<{ a: number; b: number }, { a: string; b: string }>(
      { a: 1, b: 2 },
      (value) => String(value),
    );
    expect(result).toEqual({ a: "1", b: "2" });
  });
});
