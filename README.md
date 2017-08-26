# Brenton's Frontend Boilerplate
Uses EJS, SASS, and the latest Babel presets.

## Source of Truth
Set project info in the config.js file. These variables are used throughout the project.

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
