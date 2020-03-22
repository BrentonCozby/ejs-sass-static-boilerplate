/** Variables available in all js files:
 * all the exported constants from globals.js
 */

/** Directories available as aliases
 * all the paths within Dir in globals.js
 */

import dompurify from 'dompurify'

import 'picturefill'
import 'utils/helpers'
import 'utils/errors'
import 'utils/scroll-animations'

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

const clock = setInterval(() => {
    if ($('#time')) {
        $('#time').innerHTML = ` - <b>${new Date().toLocaleTimeString()}</b>`
    }
}, 1000)

const mainForm = $('#main-form')

if (mainForm) {
    mainForm.on('submit', e => {
        e.preventDefault()

        $('#submitted-message').innerHTML = `<b>Sanitized Message</b>: ${dompurify.sanitize(mainForm.message.value)}`

        import(/* webpackChunkName: "lazy-module.lazy" */ './lazy-module').then(module => {
            const foo = module.default

            foo()
        })
    })
}
