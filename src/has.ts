import { object } from "./object";

/**
 * Returns `true` when the value is an object, not an array, that has the key
 * `K`. The guard narrows the value to `Record<K, unknown>`. The guard does not
 * check the type of the key's value. `has(key)` with no value returns the
 * guard as a function.
 */
export function has<K extends string>(key: K): (value: unknown) => value is Record<K, unknown>;
export function has<K extends string>(key: K, value: unknown): value is Record<K, unknown>;
export function has<K extends string>(key: K, ...rest: [] | [unknown]) {
  const guard = (value: unknown): value is Record<K, unknown> => object(value) && key in value;
  return rest.length === 0 ? guard : guard(rest[0]);
}
