# objectively

Tiny, dependency-free, strongly-typed object helpers.

Standard `Object.*` methods widen keys to `string` and values to their union.
These wrappers keep the object's own key/value types, and add transform helpers
that let you name the exact output shape — so the one unavoidable assertion
lives here, and your call sites stay cast-free.

> **Exact-keys assumption.** The precise types are produced by an internal
> `as`: they assert the object holds no keys beyond those in its type. Safe for
> literals built in place; a lie for objects that arrive with extra keys.

## Install

```sh
pnpm add objectively
```

## API

### Access — `keys` · `values` · `entries`

Typed `Object.keys` / `Object.values` / `Object.entries`.

```ts
import { entries } from "objectively";

for (const [key, value] of entries({ a: 1, b: "x" })) {
  // key: "a" | "b",  value: number | string
}
```

### Fold — `reduce`

Object-shaped reduce; each key and value carries its own type.

```ts
reduce({ a: 1, b: 2 }, (acc, key, value) => acc + value, 0); // 3
```

### Transform values — `map` · `remap`

`map` maps every value, preserving keys. `remap<Source, Result>` rebuilds into a
named result shape whose value type may vary per key.

```ts
map({ a: 1, b: 2 }, (v) => v * 10); // { a: 10, b: 20 }
```

### Transform keys — `rekey`

`rekey<Source, Result>` transforms each entry into a new `[key, value]` pair, so
the **key** may change too — prefixing or renaming, landing on a named result
shape without a cast at the call site.

```ts
import { rekey } from "objectively";

// { variant: "solid" } -> { "data-variant": "solid" }
rekey<Props, Bindings>(props, (key, value) => [`data-${key}`, value]);
```

### Guards — `record` · `object` · `equals`

`record` narrows to a plain record (prototype is `Object.prototype` or `null`),
`object` to any non-array object (class instances included), and `equals` is
deep structural equality (SameValueZero, so `NaN` equals itself).

```ts
import { equals, object, record } from "objectively";

record({ a: 1 }); // true    record([]) / record(new Date()); // false
object(new Date()); // true  object([]); // false
equals({ a: [1, NaN] }, { a: [1, NaN] }); // true
```

## Scripts

- `pnpm build` — bundle to `.dist` via unbuild
- `pnpm test` — run the vitest suite
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — eslint
