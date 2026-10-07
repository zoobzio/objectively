/**
 * Typed `Object.entries`. Each pair has the type `[K, T[K]]` for its own key
 * `K`. The result type assumes that the object has no keys other than the keys
 * in its type. See `keys`.
 */
export const entries = <T extends object>(obj: T) =>
  Object.entries(obj) as { [K in keyof T & string]: [K, T[K]] }[keyof T & string][];
