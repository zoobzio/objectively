# objectively

Small, dependency-free, strongly typed object helpers and type guards.

The standard `Object.*` methods widen keys to `string` and values to one union.
These helpers keep the object's own key and value types. The transform helpers
let you name the exact output type. The cast is in this library. Your code does
not need a cast.

> **Exact-keys assumption.** Each helper casts its result. The cast assumes
> that the object has no keys other than the keys in its type. This is true
> for an object literal. This is not true for an object that has extra keys at
> runtime.

## Install

```sh
pnpm add objectively
```

## API

### Access: `keys`, `values`, `entries`

Typed `Object.keys`, `Object.values`, and `Object.entries`.

```ts
import { entries } from "objectively";

for (const [key, value] of entries({ a: 1, b: "x" })) {
  // key: "a" | "b",  value: number | string
}
```

### Fold: `reduce`

Folds the entries into an accumulator. Each key and value has its own type.

```ts
reduce({ a: 1, b: 2 }, (acc, key, value) => acc + value, 0); // 3
```

### Transform values: `map`, `remap`

`map` applies a callback to each value and keeps the keys. `remap<Source,
Result>` makes an object of the result type. The value type can be different
for each key.

```ts
map({ a: 1, b: 2 }, (v) => v * 10); // { a: 10, b: 20 }
```

### Transform keys: `rekey`

`rekey<Source, Result>` makes a new `[key, value]` pair for each entry. The key
can change. The result has the named result type. Your code does not need a
cast.

```ts
import { rekey } from "objectively";

// { variant: "solid" } -> { "data-variant": "solid" }
rekey<Props, Bindings>(props, (key, value) => [`data-${key}`, value]);
```

### Copy: `copy`

Makes a deep copy of plain data. The function makes a new array for each array
and a new record for each record, at all depths. The function returns
primitives, functions, and class instances by reference. For a proxy of a plain
record, the function makes a plain object and reads each member one time.

```ts
import { copy } from "objectively";

const snapshot = copy(state); // same type as state
```

### Guards: `record`, `object`, `equals`

`record` narrows to a plain record. A plain record has the prototype
`Object.prototype` or `null`. `object` narrows to an object that is not an
array. Class instances pass. `equals` compares two values for deep structural
equality with SameValueZero, so `NaN` is equal to `NaN`.

```ts
import { equals, object, record } from "objectively";

record({ a: 1 }); // true    record([]) / record(new Date()); // false
object(new Date()); // true  object([]); // false
equals({ a: [1, NaN] }, { a: [1, NaN] }); // true
```

### Guard factories: `has`, `prefixed`, `suffixed`, `wrapped`

Each factory returns a type guard. `has(key)` narrows to an object that has the
key. `prefixed(prefix)`, `suffixed(suffix)`, and `wrapped(open, close)` narrow
to a string template type. Each guard checks the shape only.

```ts
import { has, prefixed, wrapped } from "objectively";

has("id")({ id: 1 }); // true, narrows to Record<"id", unknown>
prefixed("--")("--x"); // true, narrows to `--${string}`
wrapped("{", "}")("{x}"); // true, narrows to `{${string}}`
```

## Scripts

- `pnpm build`: build to `.dist` with unbuild
- `pnpm test`: run the vitest suite
- `pnpm typecheck`: run `tsc --noEmit`
- `pnpm lint`: run oxlint
- `pnpm fmt`: format the source with oxfmt
- `pnpm fmt:check`: check the format
