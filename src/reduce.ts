import { entries } from "./entries";

/**
 * Object-shaped reduce: folds the entries into an accumulator, with each key
 * and value carrying its own type from T rather than string/unknown. The
 * accumulator type A is whatever the caller seeds and returns.
 */
export const reduce = <T extends object, A>(
  obj: T,
  fn: (acc: A, key: keyof T & string, value: T[keyof T & string]) => A,
  init: A,
): A => entries(obj).reduce((acc, [key, value]) => fn(acc, key, value), init);
