import { resolve } from 'path'

// The following variables are used in ./build-tools/ejs-to-html.js in the 'transformer' function
export const DEV_PATH = __dirname
export const PUBLIC_PATH = '/'
export const SITE_TITLE = 'Static Boilerplate EJS-SASS'
export const SITE_NAME = 'ejs-sass-static-boilerplate'
export const DESCRIPTION = 'Boilerplate for a Static website using EJS and SASS'
export const SITE_URL = 'example.com'
export const SITE_IMAGE = ''
export const DEVELOPER_NAME = 'Brenton Cozby'
export const DEVELOPER_URL = 'https://brentoncozby.com'

const Dir = {
    dist: resolve(__dirname, 'dist'),
    src: resolve(__dirname, 'src'),
    css: resolve(__dirname, 'src', 'css'),
    js: resolve(__dirname, 'src', 'js'),
    copyToDist: resolve(__dirname, 'src', 'copy-to-dist'),
    images: resolve(__dirname, 'src', 'images'),
    videos: resolve(__dirname, 'src', 'videos'),
    vendor: resolve(__dirname, 'src', 'vendor'),
    views: resolve(__dirname, 'src', 'views'),
    pages: resolve(__dirname, 'src', 'views', 'pages'),
    partials: resolve(__dirname, 'src', 'views', 'partials'),
}

export { Dir }
