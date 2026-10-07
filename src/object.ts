/**
 * Returns `true` when the value is an object and not an array. Class
 * instances pass. This guard is less strict than {@link record}. Use `object`
 * to permit key access. Use {@link record} to permit plain data only.
 */
export const object = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
