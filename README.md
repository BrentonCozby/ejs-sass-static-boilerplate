# Brenton's Frontend Boilerplate
Use EJS, SASS, and the latest JavaScript syntax to build 

## Source of Truth
Set project info in the config.js file. These variables are used throughout the project.

## Basic Usage
- Use the PP (public path) value from config.js in the views dir with `<%= PP %>`
- copy-to-dist:
    - If there is an images/pineapple.jpg file in src/copy-to-dist, you would reference this in any of your *.ejs files (src/views) like this:
        ```html
            <img src="<%= PP %>images/pineapple.jpg">
        ```
- Add the class 'appear' to any html element to give it a fade-in/fade-out effect when it scrolls into/out-of view

## DEVELOPMENT

1. ```npm run setup-for-dev```
2. ```npm run dev``` (to start server and watch files)

**Development Features:**
- "Hot Reloading" from browser-sync will update your app (without reloading the page!) whenever any file in dist is updated

## PRODUCTION

```npm run prod```

**Production Features:**
- Minification for CSS (with Autoprefixer), JS (with Babel), and HTML files
- Filename hashing for css and js files (for cache busting)
- Easy Code-splitting. Just hookup your vendor code to the window object in src/js/vendor.js

**Other Features:**
- Use the latest JavaScript (babel-preset-stage-0)
- A polyfills file from Polyfill.io file that only loads if the client doesn't have certain features
