/**
 * Whether a value is a non-array object: anything indexable by key, class
 * instances included. Looser than {@link record} — use this to gate key-wise
 * traversal, and {@link record} when only plain data may pass.
 */
export const object = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
