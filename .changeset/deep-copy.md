---
"objectively": minor
---

Add `copy`. The function makes a deep copy of plain data. It makes a new array for each array and a new record for each record, at all depths. It returns all other values by reference. The result has the same type as the source. For a proxy of a plain record, the function makes a plain object and reads each member one time.
