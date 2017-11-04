// Add selectors here and they will all have the class 'scroll-visible'
// added to them when they scroll into view
const selectors = [
    $('.appear')
]

let animElements = []
let windowHeight = null
let lastWindowScrollY = 0
let offset = 150
let isAnimating = false

window.on('load', function() {
    // make sure items in view when page loads become visible
    setTimeout(showItemsInView, 300)
    setTimeout(showItemsInView, 600)
    setTimeout(showItemsInView, 900)
    setTimeout(showItemsInView, 1200)

    // re-initialize every 2 seconds in case of page resizing
    setInterval(function() {
        showItemsInView()
    }, 2000)

    document.on('scroll', onScroll)
})

function showItemsInView() {
    windowHeight = window.innerHeight
    offset = windowHeight * .1
    lastWindowScrollY = getWindowScrollY()
    getPositions()
    requestPlayAnimations()
}

function onScroll() {
    lastWindowScrollY = getWindowScrollY()
    
    requestPlayAnimations()
}

function requestPlayAnimations() {
    if (!isAnimating) {
        requestAnimationFrame(playAnimations)
    }
    
    isAnimating = true
}

function getPositions() {
    animElements = []
    
    selectors.forEach(selector => {
        selector && selector.forEach(element => {
            animElements.push({element,  position: null})
        })
    })

    animElements.forEach(el => {
        el.position = el.element.getBoundingClientRect().top + windowScroll()
    })
}

function playAnimations() {
    animElements.forEach(el => {
        const triggerPoint = +el.position - +windowHeight + +offset
        if(lastWindowScrollY > triggerPoint)
            el.element.classList.add('scroll-visible')
        else
            el.element.classList.remove('scroll-visible')
    })
    
    isAnimating = false
}

const getWindowScrollY = (function() {
    const supportPageOffset = (pageXOffset !== undefined)
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
    
    return function() {
        return supportPageOffset
            ? pageYOffset
            : isCSS1Compat
                ? document.documentElement.scrollTop
                : document.body.scrollTop
    }
})()

