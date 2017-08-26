# Brenton's Frontend Boilerplate
Uses EJS, SASS, and the latest Babel presets.

## Source of Truth
Set project info in the config.js file. These variables are used throughout the project.

## Basic Usage
* Use the PP (public path) value from config.js in the views dir with `<%= PP %>`. In fact, all 
* src/copy-to-dist:
    * If there is an images/pineapple.jpg file in src/copy-to-dist, in any of your *.ejs files in src/views, you would reference this file like this:
        ```html
            <img src="<%= PP %>images/pineapple.jpg">
        ```

## DEVELOPMENT

1. ```npm run setup-for-dev```
2. ```npm run dev``` (to start server and watch files)

## PRODUCTION

```npm run prod```

**Production Features:**
- Minification for CSS (with Autoprefixer), JS (with Babel), and HTML files
- Filename hashing for css and js files (for cache busting)
- Easy Code-splitting. Just hookup your vendor code to the window object in src/js/vendor.js

**Other Features:**
- Use the latest JavaScript (babel-preset-stage-0)
- A polyfills file from Polyfill.io file that only loads if the client doesn't have certain features
