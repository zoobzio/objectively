/**
 * Returns `true` when the value is a plain record. A plain record is a
 * non-null object whose prototype is `Object.prototype` or `null`. Arrays,
 * functions, and class instances have a different prototype and do not pass.
 * A proxy of a plain object passes, because the proxy returns the prototype
 * of its target.
 */
export const record = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};
