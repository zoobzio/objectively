import { record } from "./record";

/**
 * Deep structural copy over plain data: arrays are rebuilt element by element
 * and records key by key, so no array or plain record is shared with the
 * source at any depth. Everything else — primitives, functions, class
 * instances — passes through by reference. `undefined` members survive as
 * present keys; `NaN` survives as `NaN`.
 */
export const copy = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((entry) => copy(entry)) as T;
  }

  if (record(value)) {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      result[key] = copy(value[key]);
    }
    return result as T;
  }

  return value;
};
