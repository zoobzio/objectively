import { object } from "./object";

/**
 * Returns `true` when the value is an object, not an array, that has the key
 * `K` as an own property. A key from the prototype does not pass. The guard
 * narrows the value to `Record<K, unknown>`. The guard does not check the type
 * of the key's value. `own(key)` with no value returns the guard as a
 * function. See `has` for a guard that also accepts a key from the prototype.
 */
export function own<K extends string>(key: K): (value: unknown) => value is Record<K, unknown>;
export function own<K extends string>(key: K, value: unknown): value is Record<K, unknown>;
export function own<K extends string>(key: K, ...rest: [] | [unknown]) {
  const guard = (value: unknown): value is Record<K, unknown> =>
    object(value) && Object.prototype.hasOwnProperty.call(value, key);
  return rest.length === 0 ? guard : guard(rest[0]);
}
