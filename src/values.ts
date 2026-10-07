/**
 * Typed `Object.values`. The result type is the union of the object's value
 * types. The result type assumes that the object has no keys other than the
 * keys in its type. See `keys`.
 */
export const values = <T extends object>(obj: T) => Object.values(obj) as T[keyof T & string][];
