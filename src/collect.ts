/**
 * Makes a record from an array. The callback returns a `[key, value]` pair for
 * each item. The callback also receives the index of the item, like the
 * callback of `Array.prototype.map`. When two pairs have the same key, the
 * later pair wins. This matches `Object.fromEntries`.
 */
export function collect<T, K extends string, V>(
  items: readonly T[],
  fn: (item: T, index: number) => readonly [K, V],
): Record<K, V> {
  return Object.fromEntries(items.map((item, index) => fn(item, index))) as Record<K, V>;
}
