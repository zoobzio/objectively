/**
 * Returns `true` when the value is a string that ends with the suffix. The
 * guard narrows the value to `` `${string}${S}` ``. The guard checks the
 * suffix only. `suffixed(suffix)` with no value returns the guard as a
 * function.
 */
export function suffixed<S extends string>(suffix: S): (value: unknown) => value is `${string}${S}`;
export function suffixed<S extends string>(suffix: S, value: unknown): value is `${string}${S}`;
export function suffixed<S extends string>(suffix: S, ...rest: [] | [unknown]) {
  const guard = (value: unknown): value is `${string}${S}` =>
    typeof value === "string" && value.endsWith(suffix);
  return rest.length === 0 ? guard : guard(rest[0]);
}
