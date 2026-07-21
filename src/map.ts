import { entries } from "./entries";

/**
 * Maps every value through the callback, preserving the object's keys. Each
 * original key stays typed and lands required — an optional key that is absent
 * at runtime yields no entry, so presence is asserted, not proven — and every
 * value takes the callback's return type R. The callback sees the union of
 * value types, not the type of the specific key. Carries the same exact-keys
 * assumption as keys.
 */
export const map = <T extends object, R>(
  obj: T,
  fn: (value: T[keyof T & string], key: keyof T & string) => R,
) =>
  Object.fromEntries(
    entries(obj).map(([key, value]) => [key, fn(value, key)]),
  ) as { [K in keyof T & string]: R };
