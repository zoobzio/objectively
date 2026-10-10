---
"objectively": minor
---

Give each shape guard a direct form. `has(key, value)`, `own(key, value)`, `prefixed(prefix, value)`, `suffixed(suffix, value)`, and `wrapped(open, close, value)` are now type guards. Each function keeps its factory form. A call without the value, such as `has(key)`, returns the guard as a function for `filter`, `find`, and `every`. The factory form does not change, so existing code continues to work.
