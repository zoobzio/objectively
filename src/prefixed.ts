/**
 * Returns `true` when the value is a string that starts with the prefix. The
 * guard narrows the value to `` `${P}${string}` ``. The guard checks the
 * prefix only. `prefixed(prefix)` with no value returns the guard as a
 * function.
 */
export function prefixed<P extends string>(prefix: P): (value: unknown) => value is `${P}${string}`;
export function prefixed<P extends string>(prefix: P, value: unknown): value is `${P}${string}`;
export function prefixed<P extends string>(prefix: P, ...rest: [] | [unknown]) {
  const guard = (value: unknown): value is `${P}${string}` =>
    typeof value === "string" && value.startsWith(prefix);
  return rest.length === 0 ? guard : guard(rest[0]);
}
