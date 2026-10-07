import { entries } from "./entries";

/**
 * Folds the object's entries into an accumulator. Each key and value has its
 * own type from `T`. The accumulator type `A` is the type of `init`.
 */
export const reduce = <T extends object, A>(
  obj: T,
  fn: (acc: A, key: keyof T & string, value: T[keyof T & string]) => A,
  init: A,
): A => entries(obj).reduce((acc, [key, value]) => fn(acc, key, value), init);
