import { describe, expect, it } from "vitest";

import { pick } from "../src";

const subject = {
  color: "brand",
  size: 4,
  active: true,
  note: undefined as string | undefined,
};

describe("pick", () => {
  it("keeps the given keys only", () => {
    expect(pick(subject, ["color", "active"])).toEqual({ color: "brand", active: true });
  });

  it("orders the result by the keys argument, not the source", () => {
    const result = pick(subject, ["active", "color", "size"]);
    expect(Object.keys(result)).toEqual(["active", "color", "size"]);
  });

  it("includes a key when its value is undefined", () => {
    const result = pick(subject, ["note", "size"]);
    expect(Object.keys(result)).toEqual(["note", "size"]);
    expect("note" in result).toBe(true);
    expect(result.note).toBeUndefined();
  });

  it("includes a key when the source does not have it", () => {
    const partial: { a?: number; b: number } = { b: 2 };
    const result = pick(partial, ["a", "b"]);
    expect(Object.keys(result)).toEqual(["a", "b"]);
    expect(result.a).toBeUndefined();
  });

  it("returns a new object and does not change the source", () => {
    const result = pick(subject, ["size"]);
    expect(result).not.toBe(subject);
    expect(Object.keys(subject)).toEqual(["color", "size", "active", "note"]);
  });

  it("returns an empty object for no keys", () => {
    expect(pick(subject, [])).toEqual({});
  });

  it("narrows the result type to the picked keys", () => {
    const result: { color: string; size: number } = pick(subject, ["color", "size"]);
    expect(result.color).toBe("brand");
    expect(result.size).toBe(4);
  });
});
