# objectively

## 0.1.1

### Patch Changes

- [`5a901b8`](https://github.com/zoobzio/objectively/commit/5a901b8759d88592e99e364911491f28538be93d) Thanks [@zoobzio](https://github.com/zoobzio)! - Add guard factories: `has(key)` for key presence, and `prefixed`/`suffixed`/`wrapped` for delimited strings. Each builds a narrowing type guard, keeping the shape-test-only assumption of the existing guards.

## 0.1.0

### Minor Changes

- fd6a59a: Initial release. Tiny, dependency-free, strongly-typed object helpers:

  - **Access** — `keys`, `values`, `entries` (typed `Object.*` wrappers).
  - **Fold** — `reduce` (object-shaped, key/value typed).
  - **Transform values** — `map`, `remap` (named result shape).
  - **Transform keys** — `rekey` (rename/prefix keys onto a named result shape, cast-free at the call site).
  - **Guards** — `record`, `object`, `equals` (plain-record / non-array-object predicates and deep structural equality).
