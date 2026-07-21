/**
 * Object.values typed to the union of the object's value types rather than
 * the widened value type. Carries the same exact-keys assumption as keys.
 */
export const values = <T extends object>(obj: T) =>
  Object.values(obj) as T[keyof T & string][];
