---
"objectively": minor
---

Initial release. Tiny, dependency-free, strongly-typed object helpers:

- **Access** — `keys`, `values`, `entries` (typed `Object.*` wrappers).
- **Fold** — `reduce` (object-shaped, key/value typed).
- **Transform values** — `map`, `remap` (named result shape).
- **Transform keys** — `rekey` (rename/prefix keys onto a named result shape, cast-free at the call site).
- **Guards** — `record`, `object`, `equals` (plain-record / non-array-object predicates and deep structural equality).
