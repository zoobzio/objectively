/**
 * Typed `Object.entries`. Each pair has the type `[K, T[K]]` for its own key
 * `K`. The result type assumes that the object has no keys other than the keys
 * in its type. See `keys`.
 */
export function entries<T extends object>(
  obj: T,
): { [K in keyof T & string]: [K, T[K]] }[keyof T & string][] {
  return Object.entries(obj) as { [K in keyof T & string]: [K, T[K]] }[keyof T & string][];
}
