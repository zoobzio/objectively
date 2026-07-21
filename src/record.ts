/**
 * Whether a value is a plain record: a non-null object whose prototype is
 * `Object.prototype` or `null`. Arrays, functions, and class instances fail
 * this test — they carry a different prototype. A proxy over a plain object
 * passes, since it forwards its target's prototype.
 */
export const record = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};
