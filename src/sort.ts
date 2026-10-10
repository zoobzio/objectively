import { keys } from "./keys";

/**
 * Makes a new object with the same keys and values in the order that the
 * comparator gives. The comparator receives two keys and returns a number,
 * like the callback of `Array.prototype.sort`. The function does not change
 * the given object. The result has the same type as the given object. A key
 * that is an array index, such as `"1"`, stays before the other keys. This is
 * a rule of the language. The result type assumes that the object has no keys
 * other than the keys in its type. See `keys`.
 */
export function sort<T extends object>(
  obj: T,
  fn: (a: keyof T & string, b: keyof T & string) => number,
): T {
  return Object.fromEntries(
    keys(obj)
      .sort(fn)
      .map((key) => [key, obj[key]]),
  ) as T;
}
