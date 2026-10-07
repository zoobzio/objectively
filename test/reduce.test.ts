import { describe, expect, it } from "vitest";

import { reduce } from "../src";

describe("reduce", () => {
  it("folds the entries into the accumulator", () => {
    const total = reduce({ a: 1, b: 2, c: 3 }, (acc, _key, value) => acc + value, 0);
    expect(total).toBe(6);
  });

  it("gives the callback each key and its value", () => {
    const joined = reduce(
      { a: 1, b: 2 },
      (acc, key, value) => [...acc, `${key}:${value}`],
      [] as string[],
    );
    expect(joined).toEqual(["a:1", "b:2"]);
  });
});
