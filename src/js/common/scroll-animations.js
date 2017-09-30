// Add selectors here and they will all have the class 'scroll-visible'
// added to them when they scroll into view
import throttle from 'lodash/throttle'

const selectors = [
    $('.appear')
]

let animElements = []

const supportPageOffset = (pageXOffset !== undefined)
const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
const windowScroll = function() {
    return supportPageOffset ? pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
}
let windowHeight = null
let offset = 150

const _populateElements = function () {
    animElements = []
    selectors.forEach(selector => {
        selector.forEach(element => {
            animElements.push({element,  position: null})
        })
    })
}

const _getPositions = function () {
    _populateElements()

    animElements.forEach(el => {
        el.position = el.element.getBoundingClientRect().top + windowScroll()
    })
}

const playAnimations = function () {
    animElements.forEach(el => {
        const triggerPoint = +el.position - +windowHeight + +offset
        if(windowScroll() > triggerPoint)
            el.element.classList.add('scroll-visible')
        else
            el.element.classList.remove('scroll-visible')
    })
}

const onScroll = function () {
    playAnimations()
}

const _showItemsInView = function () {
    windowHeight = window.innerHeight
    offset = windowHeight * .1
    _getPositions()
    playAnimations()
}

window.on('load', function() {
    // make sure items in view when page loads become visible
    setTimeout(_showItemsInView, 300)
    setTimeout(_showItemsInView, 600)
    setTimeout(_showItemsInView, 900)
    setTimeout(_showItemsInView, 1200)

    // re-initialize every 2 seconds in case of page resizing
    setInterval(function() {
        _showItemsInView()
    }, 2000)

    document.on('scroll', throttle(onScroll, 100))
})

export { playAnimations }
