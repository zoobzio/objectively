/**
 * Builds a guard for strings ending with a given suffix. `suffixed("px")`
 * returns a test that passes for any string ending in `px`, narrowing it to
 * the template type `` `${string}px` ``. A shape test over the suffix only —
 * what precedes it is the caller's concern.
 */
export const suffixed =
  <S extends string>(suffix: S) =>
  (value: unknown): value is `${string}${S}` =>
    typeof value === "string" && value.endsWith(suffix);
