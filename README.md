# Brenton's Frontend Boilerplate
Use EJS, SASS, and the latest JavaScript syntax to build fully-static production code with fast, live updates during development and the latest optimizations upon production. Global variables are used throughout the project to make it easily reconfigurable and DRY. Focus on building your frontend, not on building your tools.

**Websites built with this boilerplate:**
* [RallyPointWebinars.com](https://rallypointwebinars.com "Rally Point Webinars website")
* [Myocortex.com](https://myocortex.com "Myocortex website")
* [BrentonCozby.com](https://brentoncozby.com "Brenton Cozby's software development portfolio")

## Globals
**`globals.js`**: The variables in this file, such as SITE_TITLE and PP (public path), are used throughout the project. Change them in globals.js and they will be updated throughout your entire codebase where used. They are provided as global variables in your JS and EJS files.

## Basic Usage
* Use the PP (public path) value from globals.js in the views dir with `<%= PP %>`. This will allow you to deploy your site from whichever directory you set PP to
* The `src/static` folder:
    * Everything in this folder will be copied (with folder/file structure maintained) into the dist folder unchanged
    * If there is an `images/pineapple.jpg` file in `src/static`, you would reference this in any of your *.ejs files (`src/views`) like this:
        ```html
            <img src="<%= PP %>/images/pineapple.jpg">
        ```
* The main JS file is `src/js/index.js`. This will become `app.js`
* A separate `vendor.js` bundle will be created from node_modules added to the "vendor" array in webpack.config.js
* Some SASS helper classes are available in `src/css/_helpers.scss`
* Add the class 'appear' to any html element to give it a fade-in/fade-out effect when it scrolls into/out-of view
* Set Google Analytics ID in `globals.js`
* Favicons: go to https://realfavicongenerator.net/ and put the generated favicons into `src/favicons`

## DEVELOPMENT

```yarn dev``` (to prepare files, start server, and watch files)

**Development Features:**
* CSS updates without browser reload; browser auto-reloads upon JS and HTML updates
* Source maps for SASS and JS files for easier debugging

## PRODUCTION

```yarn build```

**Production Features:**
* Minification for CSS (with Autoprefixer), JS (with Babel), and HTML files
* Filename hashing for css and js files (for cache busting)
* Easy Code-splitting. Hookup code that won't change often (like libraries and packages) in src/js/commmon/index.js
* Tree-shaking and uglyfication from Webpack
* Project info banner prepended to the top of JS and CSS files

**Other Features:**
* Use the latest JavaScript syntax thanks to babel-preset-stage-0
* A polyfills file from Polyfill.io file that only loads if the client doesn't have certain features
* CSS helpers, including classes for "show/hide on scroll" behavior, "split-box" classes for grid behavior, and more in `_helpers.scss`
* `print.scss` for common css fixes when printing a web page
* Prettier instead of EsLint - `npm run prettier`; /prettier.config.js

**Included Libraries:**
* *Sanitize.css* - common CSS resets. The evolution of Normalize.css
* *Font Awesome* - I mainly use it for icons
* *bling.js* - the 1% of jQuery you use 99% of the time)
* *sanitize-html* - should use this on any user-inputted data)
* *lodash.throttle* - already used in the CSS helper classes that show/hide an element on-scroll)
* *include-media* - so you can do things in `sass` like `@include media('>=358px', '<850px') { }`
* *HTML5Boilerplate* - includes presets in html & css for web best practices, and includes a .htaccess file
