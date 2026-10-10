/**
 * Returns `true` when the value is a string that starts with `open` and ends
 * with `close`. The guard narrows the value to `` `${O}${string}${C}` ``. The
 * guard checks the two delimiters only. `wrapped(open, close)` with no value
 * returns the guard as a function.
 */
export function wrapped<O extends string, C extends string>(
  open: O,
  close: C,
): (value: unknown) => value is `${O}${string}${C}`;
export function wrapped<O extends string, C extends string>(
  open: O,
  close: C,
  value: unknown,
): value is `${O}${string}${C}`;
export function wrapped<O extends string, C extends string>(
  open: O,
  close: C,
  ...rest: [] | [unknown]
) {
  const guard = (value: unknown): value is `${O}${string}${C}` =>
    typeof value === "string" && value.startsWith(open) && value.endsWith(close);
  return rest.length === 0 ? guard : guard(rest[0]);
}
