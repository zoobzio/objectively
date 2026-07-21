import { object } from "./object";

/**
 * Builds a guard for objects carrying a given key. `has("$value")` returns a
 * test that passes for any non-array object with a `$value` member, narrowing
 * it to `Record<K, unknown>`. The key's own value type is not checked — a
 * shape test over key presence only.
 */
export const has =
  <K extends string>(key: K) =>
  (value: unknown): value is Record<K, unknown> =>
    object(value) && key in value;
