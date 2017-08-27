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

// import libraries from window.libs (src/js/common/index.js)
const { $, sanitizeHTML } = libs

setInterval(function() {
    $('#time').html(` - <b>${(new Date).toLocaleTimeString()}</b>`)
}, 1000)

const $mainForm = $('#main-form')
$mainForm.submit(e => {
    e.preventDefault()

    $('#submitted-message').html(
        `<b>Sanitized Message</b>: ${sanitizeHTML($mainForm[0].message.value)}`
    )
})
