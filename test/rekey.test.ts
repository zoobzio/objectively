import { describe, expect, it } from "vitest";

import { rekey } from "../src";

describe("rekey", () => {
  it("changes the keys and keeps the values", () => {
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

  it("gives the callback each key and its value", () => {
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

  it("keeps every entry", () => {
    const result = rekey({ a: 1, b: 2 }, (key, value) => [`x-${key}`, value]);
    expect(Object.keys(result as object)).toEqual(["x-a", "x-b"]);
  });
});
