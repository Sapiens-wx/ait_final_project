Milestone 02
===

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-Sapiens-wx.git

Special Instructions for Using Form (or Login details if auth is part of your project)
---
1. Goto `https://final-project-sapiens-wx.onrender.com/`. This is the login form.
    - The `username` and `password` field accepts any string as a valid username or password.
    - Press the `login/sign up` button, and then it will tell you if you have successfully logged in.
2. After logging in, you will be directed to the home page, where you can create, delete, rename, or edit a file.
    - Click on the `create`/`delete`/`edit` button to modify the corresponding file.
    - Click on the file name and edit it to rename a file. Hit `enter` to submit the change.
3. If you click on the `edit` button in the home page, you will be directed to an editing page where you can edit a specific file.
    - Click on the empty area below the filename to start editing the content of the file
    - Click on the `Save File` button to save the changes

URL for form 
---
I am using the Vue.js framework, so you cannot actually goto a page to see the result of the form, since Vue is an SPA.
**All the below url starts with `https://final-project-sapiens-wx.onrender.com`**
- /api/login
- /api/newFile
- /api/deleteFile
- /api/renameFile
- /api/saveFile

URL to github that shows line of code where research topic(s) are used / implemented
--- 
- [authentication](src/app.mjs) (src/app.mjs:74 app.post('/api/long'))
- [Vue.js framework](src/client)

References 
---
