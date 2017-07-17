import { resolve } from 'path'

export const rootAbsPath = __dirname
export const rootRelPath = ''

export const siteTitle = 'Static Boilerplate EJS-SASS'
export const description = 'Boilerplate for a Static website using EJS and SASS'
export const siteUrl = 'example.com'

const Dir = {
    dist: resolve(__dirname, 'dist'),
    src: resolve(__dirname, 'src'),
    css: resolve(__dirname, 'src', 'css'),
    js: resolve(__dirname, 'src', 'js'),
    vendor: resolve(__dirname, 'src', 'vendor'),
    views: resolve(__dirname, 'src', 'views'),
    pages: resolve(__dirname, 'src', 'views', 'pages'),
    partials: resolve(__dirname, 'src', 'views', 'partials')
}

export { Dir }
