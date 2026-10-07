# objectively

## 0.1.2

### Patch Changes

- [`ee47d67`](https://github.com/zoobzio/objectively/commit/ee47d67931925469f197a7454d3caf94b20cf175) Thanks [@zoobzio](https://github.com/zoobzio)! - Add `copy`. The function makes a deep copy of plain data. It makes a new array for each array and a new record for each record, at all depths. It returns all other values by reference. The result has the same type as the source. For a proxy of a plain record, the function makes a plain object and reads each member one time.

- [`97f87af`](https://github.com/zoobzio/objectively/commit/97f87af056ade633e7f3bf6ba4c2ceccc7bd5359) Thanks [@zoobzio](https://github.com/zoobzio)! - Replace ESLint with oxlint and oxfmt. Upgrade vitest to 5. No change to the published code.

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
