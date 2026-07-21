---
"objectively": patch
---

Add guard factories: `has(key)` for key presence, and `prefixed`/`suffixed`/`wrapped` for delimited strings. Each builds a narrowing type guard, keeping the shape-test-only assumption of the existing guards.
