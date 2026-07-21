import { record } from "./record";

/**
 * Deep structural equality over plain data: records are compared key by key,
 * arrays element by element, and primitives by SameValueZero — `===` except
 * that `NaN` equals itself, so a structure containing `NaN` still equals its
 * own rebuild. Two values are equal when they have the same shape and every
 * leaf matches, which narrows `b` to `a`'s type.
 *
 * Non-plain values — functions and class instances — compare by identity;
 * `null` and `undefined` are distinct.
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
