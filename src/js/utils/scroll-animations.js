import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

// Add selectors here and they will all have the class 'scroll-visible'
// added to them when they scroll into view
const selectors = [document.querySelectorAll('.appear')]

let animElements = []
let windowHeight = null
let lastWindowScrollY = 0
let offset = 150

const supportPageOffset = window.pageXOffset !== undefined
const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat'

const getWindowScrollY = () => {
    if (supportPageOffset) {
        return window.pageYOffset
    } else if (isCSS1Compat) {
        return document.documentElement.scrollTop
    }

    return document.body.scrollTop
}

function getPositions() {
    animElements = []

    selectors.forEach(selector => {
        if (selector) {
            selector.forEach(element => {
                animElements.push({
                    element,
                    position: element.getBoundingClientRect().top + getWindowScrollY(),
                })
            })
        }
    })
}

function playAnimations() {
    animElements.forEach(el => {
        const triggerPoint = Number(el.position) + Number(-windowHeight) + Number(offset)

        if (lastWindowScrollY > triggerPoint) {
            el.element.classList.add('scroll-visible')
        } else {
            el.element.classList.remove('scroll-visible')
        }
    })
}

function showItemsInView() {
    windowHeight = window.innerHeight
    offset = windowHeight * 0.1
    lastWindowScrollY = getWindowScrollY()
    getPositions()
    playAnimations()
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn()
    } else {
        document.on('DOMContentLoaded', fn)
    }
}

ready(() => {
    // make sure items that are in view when page loads become visible
    showItemsInView()

    setInterval(showItemsInView, 2000)

    document.on(
        'resize',
        debounce(() => {
            showItemsInView()
        }, 100)
    )

    document.on(
        'scroll',
        throttle(
            () => {
                lastWindowScrollY = getWindowScrollY()

                playAnimations()
            },
            100,
            { leading: true }
        )
    )
})
