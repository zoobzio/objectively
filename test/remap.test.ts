import { describe, expect, it } from "vitest";

import { remap } from "../src";

describe("remap", () => {
  it("makes an object of the result type and keeps the keys", () => {
    const result = remap<{ a: number; b: number }, { a: string; b: string }>(
      { a: 1, b: 2 },
      (value) => String(value),
    );
    expect(result).toEqual({ a: "1", b: "2" });
  });
});
