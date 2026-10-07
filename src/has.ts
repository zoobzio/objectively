import { object } from "./object";

/**
 * Makes a type guard for objects that have the given key. The guard returns
 * `true` for an object that is not an array and that has the key `K`. The
 * guard narrows the value to `Record<K, unknown>`. The guard does not check
 * the type of the key's value.
 */
export const has =
  <K extends string>(key: K) =>
  (value: unknown): value is Record<K, unknown> =>
    object(value) && key in value;
