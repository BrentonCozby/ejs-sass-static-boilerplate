/** Variables available in all js files:
 * NODE_ENV
 * PP
 * SITE_TITLE
 * SITE_NAME
 * DESCRIPTION
 * SITE_URL
 * SITE_IMAGE
 * DEVELOPER_NAME
 * DEVELOPER_URL
 * GOOGLE_ANALYTICS_ID
 * DEV_PATH
*/

/** Directories available as aliases
 * dist
 * src
 * css
 * js
 * static
 * images
 * videos
 * vendor
 * views
 * pages
 * partials
*/

import sanitizeHTML from 'sanitize-html'

import './helpers'
import './errors'
import './scroll-animations'

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${NODE_ENV}`)

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
