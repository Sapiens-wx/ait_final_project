Milestone 03
===

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-Sapiens-wx.git

URL for form 1 (from previous milestone) 
---
(TODO: add link to a functioning form)

Special Instructions for Form
---
I am using the Vue.js framework, so you cannot actually goto a page to see the result of the form, since Vue is an SPA.
<br>**All the below url starts with `https://final-project-sapiens-wx.onrender.com`**
- /api/login
- /api/newFile
- /api/deleteFile
- /api/renameFile
- /api/saveFile

URL for form 2 (for current milestone)
---
- `/api/search`

Special Instructions for Form 2
---
`/api/search` is a get method that takes a string \[pattern\] and a string \[flags\] as parameters, and returns an array of files that matches the given \[pattern\].
- \[pattern\]: this can be any kind of string you want to search for
- \[flags\]: this can be any combination of `r` or `i`.
    - `r`: interprets \[pattern\] as regular expression
    - `i`: ignore case

__Note__

This requires that the user is in a session with a valid username. To acquire a valid session, use the login form.

__Example Usage__

`get('/api/search?pattern=^abc&flags=ri')`

This will search for any files whose filename starts with `abc`, ignoring the cases. e.g., `abcd` and `AbC` both match.

URL(s) to github repository with commits that show progress on research
--- 
[Implementing context menu in Vue.js](https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-Sapiens-wx/commit/7b85c30d37f82da14382f90c8c83b4e7985c7f62)

References 
---
