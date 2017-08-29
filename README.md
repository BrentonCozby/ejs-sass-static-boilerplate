# Brenton's Frontend Boilerplate
Use EJS, SASS, and the latest JavaScript syntax to build fully-static production code with fast, live updates during development and the latest optimizations upon production. Global variables are used throughout the project to make it easily reconfigurable and DRY. Focus on building your frontend, not on building your tools.

**Websites built with this boilerplate:**
- [RallyPointWebinars.com](https://rallypointwebinars.com "Rally Point Webinars website")
- [Myocortex.com](https://myocortex.com "Myocortex website")
- [BrentonCozby.com](https://brentoncozby.com "Brenton Cozby's software development portfolio")

## Source of Truth
**`config.js`**: The variables in this file, such as SITE_TITLE and PP (public path), are used throughout the project. Change them in config.js and they will be updated throughout your entire codebase where used. They are provided as global variables in your JS and EJS files.

## Basic Usage
- Use the PP (public path) value from config.js in the views dir with `<%= PP %>`. This will allow you to deploy your site from whichever directory you set PP to
- The `src/static` folder:
    - Everything in this folder will be copied (with folder/file structure maintained) into the dist folder unchanged
    - If there is an `images/pineapple.jpg` file in `src/static`, you would reference this in any of your *.ejs files (`src/views`) like this:
        ```html
            <img src="<%= PP %>images/pineapple.jpg">
        ```
- The main JS file is `src/js/index.js`. This will become `bundle.js`
- A separate `common.js` bundle will be created from `src/js/common/index.js`. Set JS libraries on the window object in this file.
- Some SASS helper classes are available in `src/css/_helpers.scss`
- Add the class 'appear' to any html element to give it a fade-in/fade-out effect when it scrolls into/out-of view
- Set Google Analytics ID in `config.js`

## DEVELOPMENT

1. ```npm run setup-for-dev```
2. ```npm run dev``` (to start server and watch files)

**Development Features:**
- CSS updates without browser reload; browser auto-reloads upon JS and HTML updates
- Source maps for SASS and JS files for easier debugging

## PRODUCTION

```npm run prod```

**Production Features:**
- Minification for CSS (with Autoprefixer), JS (with Babel), and HTML files
- Filename hashing for css and js files (for cache busting)
- Easy Code-splitting. Hookup code that won't change often (like libraries and packages) in src/js/commmon/index.js
- Tree-shaking and uglyfication from Webpack
- Service Worker setup
- Project info banner prepended to the top of JS and CSS files

**Other Features:**
- Use the latest JavaScript syntax thanks to babel-preset-stage-0
- A polyfills file from Polyfill.io file that only loads if the client doesn't have certain features

**Included Libraries:**
- Normalize.css
- Font Awesome
- bling.js (the 1% of jQuery you use 99% of the time)
- sanitize-html
- include-media
- HTML5Boilerplate
