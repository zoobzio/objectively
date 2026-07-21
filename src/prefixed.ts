/**
 * Builds a guard for strings starting with a given prefix. `prefixed("--")`
 * returns a test that passes for any string beginning with `--`, narrowing it
 * to the template type `` `--${string}` ``. A shape test over the prefix only —
 * what follows it is the caller's concern.
 */
export const prefixed =
  <P extends string>(prefix: P) =>
  (value: unknown): value is `${P}${string}` =>
    typeof value === "string" && value.startsWith(prefix);
