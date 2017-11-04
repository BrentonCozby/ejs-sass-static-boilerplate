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
        sanitizeHTML

    From js/common/helpers.js
        $ - querySelectorAll
*/

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${NODE_ENV}`)

// import libraries from window.libs (src/js/common/index.js)
const { sanitizeHTML } = libs

setInterval(() => {
    if ($('#time')) {
        $('#time').innerHTML = ` - <b>${(new Date()).toLocaleTimeString()}</b>`
    }
}, 1000)

const mainForm = $('#main-form')

if (mainForm) {
    mainForm.on('submit', (e) => {
        e.preventDefault()

        $('#submitted-message')
            .innerHTML = `<b>Sanitized Message</b>: ${sanitizeHTML(mainForm.message.value)}`
    })
}
