# ejs-sass-static-boilerplate
Boilerplate for a Static website using EJS and SASS.

## DEVELOPMENT
**Usage:** Run the following scripts in 4 different terminal tabs:
1. ```npm run setup-for-dev``` and then ```npm start```
2. ```npm run watch:html```
3. ```npm run watch:css```
4. ```npm run watch:js```

**Features:**
- Watch css, js, and html files and recompile on change


## PRODUCTION

**Usage:** ```npm run prod```

**Features:**
- Hashes css and js filenames in production for cache busting
- Minification for CSS, JS, and HTML files
- Autoprefix css

### Other Features
- Generate favicons for all devices and media
- Use the latest JavaScript (babel-preset-stage-0)
