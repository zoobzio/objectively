/**
 * Makes a type guard for strings that end with the given suffix. The guard
 * narrows the value to `` `${string}${S}` ``. The guard checks the suffix
 * only.
 */
export const suffixed =
  <S extends string>(suffix: S) =>
  (value: unknown): value is `${string}${S}` =>
    typeof value === "string" && value.endsWith(suffix);
