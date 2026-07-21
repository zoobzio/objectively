/**
 * Builds a guard for strings bounded by a prefix and suffix. `wrapped("{", "}")`
 * returns a test that passes for any string starting with `{` and ending with
 * `}`, narrowing it to the template type `` `{${string}}` ``. A shape test over
 * the delimiters only — what sits between them is the caller's concern.
 */
export const wrapped =
  <O extends string, C extends string>(open: O, close: C) =>
  (value: unknown): value is `${O}${string}${C}` =>
    typeof value === "string" &&
    value.startsWith(open) &&
    value.endsWith(close);
