import swPrecache from 'sw-precache'
import { Dir, siteName, rootRelPath } from '../config.js'
import { resolve } from 'path'

swPrecache.write(resolve(Dir.dist, `service-worker.js`), {
    cacheId: siteName,
    filename: `service-worker.js`,
    stripPrefix: Dir.dist,
    staticFileGlobs: [
        `${Dir.dist}/**/*.{html,css,png,jpg,gif,svg,eot,ttf,woff}`,
        `${Dir.dist}/js/bundle.*.js`, // don't include the polyfills version
    ],
    dontCacheBustUrlsMatching: [
        /\.(js|json|css)$/, // I'm cache busting these files myself
    ],
    skipWaiting: true
}, (err) => {
    if (err) {
        reject(err);
    } else {
        resolve();
    }
});
