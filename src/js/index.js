/* Variables available in all js files:

    From config.js and webpack:
        NODE_ENV
        PP
        SITE_TITLE
        SITE_NAME
        DESCRIPTION
        SITE_URL
        SITE_IMAGE
        DEVELOPER_NAME
        DEVELOPER_URL
        GOOGLE_ANALYTICS_ID
        DEV_PATH

    From js/common/index.js:
        $
        jQuery
        throttle
        sanitizeHTML
*/

console.log(`NODE_ENV: ${NODE_ENV}`)

setInterval(function() {
    $('#time').text((new Date).toGMTString())
}, 1000)
