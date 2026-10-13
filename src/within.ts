/**
 * Returns `true` when the value is a string that is a member of the set. The
 * set can be a `ReadonlySet` or a readonly array, so an `as const` tuple works
 * without a `Set`. The guard narrows the value to the member type `T`. A
 * non-string value does not pass. `within(set)` with no value returns the
 * guard as a function.
 */
export function within<T extends string>(
  set: ReadonlySet<T> | readonly T[],
): (value: unknown) => value is T;
export function within<T extends string>(
  set: ReadonlySet<T> | readonly T[],
  value: unknown,
): value is T;
export function within<T extends string>(
  set: ReadonlySet<T> | readonly T[],
  ...rest: [] | [unknown]
) {
  const guard = (value: unknown): value is T =>
    typeof value === "string" &&
    (Array.isArray(set) ? set.includes(value as T) : (set as ReadonlySet<T>).has(value as T));
  return rest.length === 0 ? guard : guard(rest[0]);
}
