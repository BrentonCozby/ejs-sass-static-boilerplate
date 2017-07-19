import { resolve } from 'path'

export const DEV_PATH = __dirname
export const PUBLIC_PATH = '/'

export const SITE_TITLE = 'Static Boilerplate EJS-SASS'
export const SITE_NAME = 'ejs-sass-static-boilerplate'
export const DESCRIPTION = 'Boilerplate for a Static website using EJS and SASS'
export const SITE_URL = 'example.com'
export const DEVELOPER_NAME = 'Brenton Cozby'
export const DEVELOPER_URL = 'https://brentoncozby.com'

const Dir = {
    dist: resolve(__dirname, 'dist'),
    src: resolve(__dirname, 'src'),
    css: resolve(__dirname, 'src', 'css'),
    js: resolve(__dirname, 'src', 'js'),
    misc: resolve(__dirname, 'src', 'misc'),
    images: resolve(__dirname, 'src', 'images'),
    vendor: resolve(__dirname, 'src', 'vendor'),
    views: resolve(__dirname, 'src', 'views'),
    pages: resolve(__dirname, 'src', 'views', 'pages'),
    partials: resolve(__dirname, 'src', 'views', 'partials'),
}

export { Dir }
