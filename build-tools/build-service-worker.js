import { resolve } from 'path'
import swPrecache from 'sw-precache' // eslint-disable-line import/no-extraneous-dependencies
import { Dir, SITE_NAME } from '../config'

swPrecache.write(resolve(Dir.dist, 'service-worker.js'), {
    cacheId: SITE_NAME,
    filename: 'service-worker.js',
    stripPrefix: Dir.dist,
    staticFileGlobs: [
        `${Dir.dist}/**/*.{html,js,json,css,xml,txt,png,jpg,gif,svg,eot,ttf,woff}`,
    ],
    dontCacheBustUrlsMatching: [
        /\.(js|json|css)$/, // I'm cache busting these files myself
    ],
    skipWaiting: true,
}, (err) => {
    if (err) {
        throw Error(err)
    }
})
