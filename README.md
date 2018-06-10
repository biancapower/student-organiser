# SPEC
## MVP
- [X] Provide data - names of students
- [X] Specify number of students per group
    - [X] specify whether round up or down if can't evenly split
- [X] Return randomised list of groups for a session
    - [X] must be valid within a single session, i.e. student1 can only be in one group at a time

## Iteration 1
- [ ] Store list of groups used in a session
- [ ] Assign a name to a session
- [ ] Create new list of groups for subsequent sessions, eliminating groups previously used
- [ ] Specify % of non-overlap
    - [ ] 100% = students will not be in the same group as anyone they have been grouped with before

## Iteration 2
- [ ] Enter names of students absent in a particular session, exclude them from groups for that session
- [ ] Add names of additional people participating in session (e.g. TAs, students from other classes)
