/**
 * Makes a type guard for strings that start with `open` and end with `close`.
 * The guard narrows the value to `` `${O}${string}${C}` ``. The guard checks
 * the two delimiters only.
 */
export const wrapped =
  <O extends string, C extends string>(open: O, close: C) =>
  (value: unknown): value is `${O}${string}${C}` =>
    typeof value === "string" && value.startsWith(open) && value.endsWith(close);
