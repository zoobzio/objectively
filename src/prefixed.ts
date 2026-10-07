/**
 * Makes a type guard for strings that start with the given prefix. The guard
 * narrows the value to `` `${P}${string}` ``. The guard checks the prefix
 * only.
 */
export const prefixed =
  <P extends string>(prefix: P) =>
  (value: unknown): value is `${P}${string}` =>
    typeof value === "string" && value.startsWith(prefix);
