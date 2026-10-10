/**
 * Makes a new object that has the given keys only. The keys of the result are
 * in the order of the `keys` argument, not the order of the given object. The
 * function is a pure projection. A key is in the result even when its value
 * in the given object is `undefined` or the key is absent. The function does
 * not change the given object.
 */
export function pick<T extends object, K extends keyof T & string>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
