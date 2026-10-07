import { entries } from "./entries";

/**
 * Makes a new object of type `R` from the object. The callback returns a new
 * `[key, value]` pair for each entry. The key can change. The compiler does
 * not check the callback's pair against a key in `R`. The function casts the
 * result to `R`. The result type assumes that the object has no keys other
 * than the keys in its type. See `keys`.
 */
export const rekey = <T extends object, R extends object>(
  obj: T,
  fn: (
    key: keyof T & string,
    value: T[keyof T & string],
  ) => readonly [string, unknown],
): R =>
  Object.fromEntries(
    entries(obj).map(([key, value]) => fn(key, value)),
  ) as R;
