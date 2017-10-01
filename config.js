import { resolve } from 'path'

// Use the following variables in src/views. They are made available in
// build-tools/ejs-to-html.js in the 'transformer' function

// PP (public path) must begin and end with '/' unless it is just '/'
export const PP = process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
export const SITE_TITLE = 'Static Boilerplate EJS-SASS'
export const SITE_NAME = 'ejs-sass-static-boilerplate'
export const DESCRIPTION = 'Boilerplate for a Static website using EJS and SASS'
export const SITE_URL = 'example.com'
export const SITE_IMAGE = ''
export const DEVELOPER_NAME = 'Brenton Cozby'
export const DEVELOPER_URL = 'https://brentoncozby.com'
export const GOOGLE_ANALYTICS_ID = ''
export const DEV_PATH = __dirname

export const Dir = {
    dist: resolve(__dirname, 'dist'),
    src: resolve(__dirname, 'src'),
    css: resolve(__dirname, 'src', 'css'),
    js: resolve(__dirname, 'src', 'js'),
    static: resolve(__dirname, 'src', 'static'),
    images: resolve(__dirname, 'src', 'static', 'images'),
    videos: resolve(__dirname, 'src', 'static', 'videos'),
    vendor: resolve(__dirname, 'src', 'vendor'),
    views: resolve(__dirname, 'src', 'views'),
    pages: resolve(__dirname, 'src', 'views', 'pages'),
    partials: resolve(__dirname, 'src', 'views', 'partials'),
}
