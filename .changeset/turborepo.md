---
"objectively": patch
---

Run build, typecheck, lint, and test through Turborepo. CI restores the Turborepo cache with actions/cache, so a task whose inputs did not change is replayed from the cache. No change to the published code.
