import { entries } from "./entries";

/**
 * Rebuilds an object into the named result shape R by transforming each entry
 * into a new [key, value] pair. Unlike remap, the KEY may change too — use it
 * to prefix or rename keys, e.g. rekey<Src, Dst>(obj, (k, v) => [`data-${k}`, v]).
 * The callback's tuple is not tied to a specific slot in R; R is asserted whole
 * (same exact-keys assumption as keys).
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
