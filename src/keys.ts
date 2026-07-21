/**
 * Object.keys typed to the object's own key union rather than string. The
 * cast asserts the object holds no keys beyond those in its type; safe for
 * literals built in place, a lie for objects that arrive with extra keys.
 */
export const keys = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof T & string)[];
