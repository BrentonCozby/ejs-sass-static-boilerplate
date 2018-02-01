// Avoid `console` errors in browsers that lack a console.
let method
const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn',
]
let { length } = methods
const console = window.console || {}

while (length > 0) {
    length -= 1

    method = methods[length]

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = () => {}
    }
}
