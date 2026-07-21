import { entries } from "./entries";

/**
 * Rebuilds an object into the named result shape R: same keys, each value
 * produced by the callback. Unlike map, R is the whole mapped type given
 * explicitly — `remap<Source, Result>(obj, fn)` — so the value type may vary
 * per key. The signature alone does not tie a key to its own slot in R; write
 * the callback as a generic function over the key to have that pairing
 * checked. Carries the same exact-keys assumption as keys.
 */
export const remap = <
  T extends object,
  R extends { [K in keyof T & string]: unknown },
>(
  obj: T,
  fn: (
    value: T[keyof T & string],
    key: keyof T & string,
  ) => R[keyof T & string],
): R =>
  Object.fromEntries(
    entries(obj).map(([key, value]) => [key, fn(value, key)]),
  ) as R;
