Milestone 04 - Final Project Documentation
===

NetID
---
wx2194

Name
---
Wensi Xie

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-Sapiens-wx.git

URL for deployed site 
---
https://final-project-sapiens-wx.onrender.com/

URL for form 1 (from previous milestone) 
---
- `/api/search`

Special Instructions for Form 1
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

URL for form 2 (for current milestone)
---
- `/api/admin/delete` request body: a json object that contains the key 'username'

Special Instructions for Form 2
---
`/api/admin/delete` is a post method used to delete a user account.

In order to use it, a cookie header with a valid session ID has to be sent. The session ID should point to a user with username 'admin'. This can be done by first using /api/login to login to the admin account. Then, the request should be sent with a body containing a json object, with the key 'username', containing the username of the account to be deleted.

URL for form 3 (from previous milestone) 
---
I am using the Vue.js framework, so you cannot actually goto a page to see the result of the form, since Vue is an SPA.
<br>**All the below url starts with `https://final-project-sapiens-wx.onrender.com`**
- /api/login
- /api/newFile
- /api/deleteFile
- /api/renameFile
- /api/saveFile

Special Instructions for Form 3
---
1. Goto `https://final-project-sapiens-wx.onrender.com/`. This is the login form.
    - The `username` and `password` field accepts any string as a valid username or password.
    - Press the `login/sign up` button, and then it will tell you if you have successfully logged in.
2. After logging in, you will be directed to the home page, where you can create, delete, rename, or edit a file.
    - Each file is treated as both a file and a directory
    - As a file, click on the file name to edit the file
    - Right click on the file name to edit/rename/delete the file, or create a file under the file directory.
    - As a directory, click on the '+' button next to it to expand and show all files under the directory
3. If you click on the `edit` button in the home page, you will be directed to an editing page where you can edit a specific file.
    - Click on the empty area below the filename to start editing the content of the file
    - Click on the `Save File` button to save the changes

First link to github line number(s) for constructor, HOF, etc.
---
[src/app.mjs](src/app.mjs#L45-48): used `.reduce` on an array

Second link to github line number(s) for constructor, HOF, etc.
---
[src/client/src/components/home.vue](src/client/src/components/home.vue#L52-61): used `.forEach` on an array

Short description for links above
---
(TODO: describe what each link above is, one line each... for example: myFunction is a hof that retrieves json from a url, map is used to transform the Array of Person objects into an Array of strings that represents names)

Link to github line number(s) for schemas (db.js or models folder)
---
Three different schemas:<br>
[src/db.mjs](src/db.mjs#L9-13) <br>
[src/db.mjs](src/db.mjs#L19-24) <br>
[src/db.mjs](src/db.mjs#L27-33)

Description of research topics above with points
---
(TODO: add description of research topics here, including point values for each, one per line... for example: 2 points - applied and modified "Clean Blog" Bootstrap theme)
* (5 points) Integrate user authentication
    * Users can login to an existing account or create a new account if the username does not exist.
    * Password are salted and hashed before being stored to the database for security.
* (5 points) Use frontend framework vue.js
    * This project is a single page application created using vue.js

Links to github line number(s) for research topics described above (one link per line)
---
(TODO: add link to github line number(s), one per line for research topics ... for example, if using auth/passport, link to auth.js or where bulk of auth code is)
- User Authentication: [src/app.mjs](src/app.mjs#L72-91)
- Frontend framework: [src/client/src/components](src/client/src/components/)

Optional project notes 
--- 
### Instructions for navigating through the site
1. Goto `https://final-project-sapiens-wx.onrender.com/`. This is the login form.
    - The `username` and `password` field accepts any string as a valid username or password.
    - Press the `login/sign up` button, and then it will tell you if you have successfully logged in.
2. After logging in, you will be directed to the home page, where you can create, delete, rename, or edit a file.
    - Each file is treated as both a file and a directory
    - As a file, click on the file name to edit the file
    - Right click on the file name to edit/rename/delete the file, or create a file under the file directory.
    - As a directory, click on the '+' button next to it to expand and show all files under the directory
3. Editing the file
    - The file uses markdown to format the text
    - Click on the button under the file name to toggle between edit mode and preview mode.
    - Click on the `Save File` button to save the changes
4. Searching for a file
    - In the home page, there is a `Search` button. Clicking on the button will direct you to another page. Enter the file name in the input field, hit enter, and the found files will be listed below.
    - The search supports regular expression and case insensitive.
5. Admin
    - This web application provides an admin account to manage all the user accounts
    - To enter admin mode, simply logging in with user name `admin` and password `admin`.
    - In the admin page, all user names are listed, and can be deleted by clicking the `delete` button next to each user name.

Attributions
---
(TODO:  list sources that you have based your code off of, 1 per line, with file name, a very short description, and an accompanying url... for example: routes/index.js - Authentication code based off of http://foo.bar/baz ... alternatively, if you have already placed annotations in your project, answer "See source code comments")<br>
- [src/client/src/components/contextMenu.vue](src/client/src/components/contextMenu.vue) - template ref based off of https://vuejs.org/guide/essentials/template-refs.html
- [src/client/src/components/fileNode.vue](src/client/src/components/fileNode.vue) - context menu based off of https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event