import { entries } from "./entries";

/**
 * Makes a new object of type `R` from the object. The keys do not change. The
 * callback returns the value for each key. Unlike `map`, the caller gives `R`
 * explicitly, so the value type can be different for each key. The compiler
 * does not check that the callback's return value matches the key's slot in
 * `R`. To get that check, write the callback as a generic function over the
 * key. The result type assumes that the object has no keys other than the
 * keys in its type. See `keys`.
 */
export function remap<T extends object, R extends { [K in keyof T & string]: unknown }>(
  obj: T,
  fn: (value: T[keyof T & string], key: keyof T & string) => R[keyof T & string],
): R {
  return Object.fromEntries(entries(obj).map(([key, value]) => [key, fn(value, key)])) as R;
}
