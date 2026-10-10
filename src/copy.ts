import { record } from "./record";

/**
 * Makes a deep copy of plain data. The function makes a new array for each
 * array and a new record for each record, at all depths. The function returns
 * all other values by reference. This includes primitives, functions, and
 * class instances. A key with the value `undefined` stays in the copy. `NaN`
 * stays `NaN`.
 */
export function copy<T>(value: T): T {
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
}
