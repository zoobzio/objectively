---
"objectively": minor
---

Add `copy`: a deep structural copy over plain data. Arrays and records are rebuilt at every depth, everything else passes through by reference, and the result is typed as its source. A proxy over a plain record is detached into a plain object in a single walk, each member read once.
