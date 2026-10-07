import { record } from "./record";

/**
 * Compares two values for deep structural equality. The function compares
 * records key by key, arrays element by element, and primitives with
 * SameValueZero. With SameValueZero, `NaN` is equal to `NaN`. The function
 * returns `true` when the two values have the same shape and all leaf values
 * are equal. A `true` result narrows `b` to the type of `a`.
 *
 * The function compares functions and class instances by identity. `null` and
 * `undefined` are not equal.
 */
export const equals = <T>(a: T, b: unknown): b is T => {
  if (a === b || (Number.isNaN(a) && Number.isNaN(b))) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let index = 0; index < a.length; index++) {
      if (!equals(a[index], b[index])) {
        return false;
      }
    }
    return true;
  }

  if (record(a) && record(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (!equals(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
};
