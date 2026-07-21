/**
 * Object.entries typed so each pair keeps its key with that key's own value
 * type, rather than collapsing to [string, union-of-values]. Carries the same
 * exact-keys assumption as keys.
 */
export const entries = <T extends object>(obj: T) =>
  Object.entries(obj) as { [K in keyof T & string]: [K, T[K]] }[keyof T &
    string][];
