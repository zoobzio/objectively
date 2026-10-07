import { entries } from "./entries";

/**
 * Applies the callback to each value and keeps the keys. Each key in the
 * result is required and has the type `R`. An optional key that is absent at
 * runtime is absent from the result. The callback receives the union of the
 * value types, not the type of the given key. The result type assumes that
 * the object has no keys other than the keys in its type. See `keys`.
 */
export const map = <T extends object, R>(
  obj: T,
  fn: (value: T[keyof T & string], key: keyof T & string) => R,
) =>
  Object.fromEntries(
    entries(obj).map(([key, value]) => [key, fn(value, key)]),
  ) as { [K in keyof T & string]: R };
