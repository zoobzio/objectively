import { describe, expect, it } from "vitest";

import { collect } from "../src";

describe("collect", () => {
  it("makes a record from the pairs that the callback returns", () => {
    const users = [
      { id: "u1", name: "Ada" },
      { id: "u2", name: "Grace" },
    ];
    expect(collect(users, (user) => [user.id, user.name])).toEqual({
      u1: "Ada",
      u2: "Grace",
    });
  });

  it("gives the callback each item and its index", () => {
    const seen: Array<[string, number]> = [];
    collect(["a", "b"], (item, index) => {
      seen.push([item, index]);
      return [item, index];
    });
    expect(seen).toEqual([
      ["a", 0],
      ["b", 1],
    ]);
  });

  it("lets the later pair win when two pairs have the same key", () => {
    const result = collect([1, 2, 3], (n) => [n % 2 === 0 ? "even" : "odd", n]);
    expect(result).toEqual({ odd: 3, even: 2 });
  });

  it("keeps the order of first appearance for the keys", () => {
    const result = collect(["z", "a", "z"], (item, index) => [item, index]);
    expect(Object.keys(result)).toEqual(["z", "a"]);
  });

  it("returns an empty record for an empty array", () => {
    expect(collect([], (item: string) => [item, item])).toEqual({});
  });

  it("types the result by the key and value of the pair", () => {
    const result: Record<"a" | "b", number> = collect(["a", "b"] as const, (item, index) => [
      item,
      index,
    ]);
    expect(result.a).toBe(0);
    expect(result.b).toBe(1);
  });
});
