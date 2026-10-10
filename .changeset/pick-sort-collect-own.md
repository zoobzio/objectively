---
"objectively": patch
---

Add `pick`, `sort`, `collect`, and `own`. `pick(obj, keys)` makes a new object with the given keys only, in the order of the keys argument. A key is in the result even when its value is `undefined`. `sort(obj, fn)` makes a new object with the keys in the order that the comparator gives. The result has the same type as the source. `collect(items, fn)` makes a record from an array. The callback returns a `[key, value]` pair for each item, and the later pair wins for a repeated key. `own(key)` is the own-property twin of `has(key)`. It rejects keys that come from the prototype.
