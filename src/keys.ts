/**
 * Typed `Object.keys`. The result type is the union of the object's keys, not
 * `string`. The cast assumes that the object has no keys other than the keys
 * in its type. This is true for an object literal. This is not true for an
 * object that has extra keys at runtime.
 */
export const keys = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof T & string)[];
