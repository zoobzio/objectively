import { describe, expect, it } from "vitest";

import { copy } from "../src";

describe("copy", () => {
  it("returns primitives unchanged", () => {
    expect(copy(5)).toBe(5);
    expect(copy("x")).toBe("x");
    expect(copy(true)).toBe(true);
    expect(copy(null)).toBe(null);
    expect(copy(undefined)).toBe(undefined);
  });

  it("makes a new record at each depth", () => {
    const source = { a: { b: { c: 1 } } };
    const result = copy(source);

    expect(result).toEqual(source);
    expect(result).not.toBe(source);
    expect(result.a).not.toBe(source.a);
    expect(result.a.b).not.toBe(source.a.b);

    result.a.b.c = 2;
    expect(source.a.b.c).toBe(1);
  });

  it("makes a new array at each depth", () => {
    const source = { list: [1, [2, 3], { k: 4 }] };
    const result = copy(source);

    expect(result).toEqual(source);
    expect(result.list).not.toBe(source.list);
    expect(result.list[1]).not.toBe(source.list[1]);
    expect(result.list[2]).not.toBe(source.list[2]);
  });

  it("keeps keys that have the value undefined", () => {
    const source = { a: null, b: undefined };
    const result = copy(source);

    expect(result.a).toBeNull();
    expect("b" in result).toBe(true);
    expect(result.b).toBeUndefined();
  });

  it("keeps NaN", () => {
    const result = copy({ a: NaN, list: [NaN, 1] });

    expect(result.a).toBeNaN();
    expect(result.list).toEqual([NaN, 1]);
  });

  it("returns functions and class instances by reference", () => {
    const fn = () => 1;
    class Box {
      constructor(public value: number) {}
    }
    const box = new Box(1);
    const result = copy({ fn, box });

    expect(result.fn).toBe(fn);
    expect(result.box).toBe(box);
  });

  it("makes a plain object from a proxy and reads each member one time", () => {
    const target = { a: 1, nested: { b: 2 } };
    const reads: string[] = [];
    const proxy = new Proxy(target, {
      get(t, key, receiver) {
        reads.push(String(key));
        return Reflect.get(t, key, receiver);
      },
    });

    const result = copy(proxy);
    const traced = [...reads];

    expect(result).not.toBe(proxy);
    expect(result).not.toBe(target);
    expect(result.nested).not.toBe(target.nested);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result).toEqual({ a: 1, nested: { b: 2 } });
    expect(traced).toEqual(["a", "nested"]);

    result.nested.b = 99;
    expect(target.nested.b).toBe(2);
  });
});
