/** Variables available in all js files:
 * all the exported constants from config.js
*/

/** Directories available as aliases
 * all the paths within Dir in config.js
*/

import sanitizeHTML from 'sanitize-html'

import 'picturefill'
import 'lazysizes'
import './utils/helpers'
import './utils/errors'
import './utils/scroll-animations'

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

        $('#submitted-message').innerHTML = `<b>Sanitized Message</b>: ${sanitizeHTML(mainForm.message.value)}`
    })
}
