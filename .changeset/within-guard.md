---
"objectively": minor
---

Add `within`. `within(set, value)` returns `true` when the value is a string that is a member of the set, and narrows the value to the member type. The set can be a `ReadonlySet` or a readonly array, so an `as const` tuple works without a `Set`. `within(set)` with no value returns the guard as a function for `filter`, `find`, and `every`.
