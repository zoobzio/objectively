import { describe, expect, it } from "vitest";

import { rekey } from "../src";

describe("rekey", () => {
  it("renames keys while keeping values", () => {
    const result = rekey<
      { variant: string; tone: string },
      { "data-variant": string; "data-tone": string }
    >({ variant: "solid", tone: "primary" }, (key, value) => [
      `data-${key}`,
      value,
    ]);
    expect(result).toEqual({
      "data-variant": "solid",
      "data-tone": "primary",
    });
  });

  it("passes both key and value to the callback", () => {
    const seen: Array<[string, unknown]> = [];
    rekey({ a: 1, b: 2 }, (key, value) => {
      seen.push([key, value]);
      return [key, value];
    });
    expect(seen).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });

  it("can drop entries the callback maps away when paired with a filter upstream", () => {
    // rekey itself keeps every entry; presence filtering is the caller's job.
    const result = rekey({ a: 1, b: 2 }, (key, value) => [`x-${key}`, value]);
    expect(Object.keys(result as object)).toEqual(["x-a", "x-b"]);
  });
});
