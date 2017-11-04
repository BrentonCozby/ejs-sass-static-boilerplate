// Add selectors here and they will all have the class 'scroll-visible'
// added to them when they scroll into view
const selectors = [
    document.querySelectorAll('.appear'),
]

let animElements = []
let windowHeight = null
let lastWindowScrollY = 0
let offset = 150
let isAnimating = false

const getWindowScrollY = (() => {
    const supportPageOffset = (window.pageXOffset !== undefined)
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

    return () => {
        if (supportPageOffset) {
            return window.pageYOffset
        } else if (isCSS1Compat) {
            return document.documentElement.scrollTop
        }

        return document.body.scrollTop
    }
})()

function getPositions() {
    animElements = []

    selectors.forEach((selector) => {
        if (selector) {
            selector.forEach((element) => {
                animElements.push({
                    element,
                    position: element.getBoundingClientRect().top + getWindowScrollY(),
                })
            })
        }
    })
}

function playAnimations() {
    animElements.forEach((el) => {
        const triggerPoint = Number(el.position) + Number(-windowHeight) + Number(offset)
        if (lastWindowScrollY > triggerPoint) {
            el.element.classList.add('scroll-visible')
        } else {
            el.element.classList.remove('scroll-visible')
        }
    })

    isAnimating = false
}

function requestPlayAnimations() {
    if (!isAnimating) {
        requestAnimationFrame(playAnimations)
    }

    isAnimating = true
}

function onScroll() {
    lastWindowScrollY = getWindowScrollY()

    requestPlayAnimations()
}

function showItemsInView() {
    windowHeight = window.innerHeight
    offset = windowHeight * 0.1
    lastWindowScrollY = getWindowScrollY()
    getPositions()
    requestPlayAnimations()
}

window.on('load', () => {
    // make sure items in view when page loads become visible
    setTimeout(showItemsInView, 300)
    setTimeout(showItemsInView, 600)
    setTimeout(showItemsInView, 900)
    setTimeout(showItemsInView, 1200)

    // re-initialize every 2 seconds in case of page resizing
    setInterval(() => {
        showItemsInView()
    }, 2000)

    document.on('scroll', onScroll)
})
