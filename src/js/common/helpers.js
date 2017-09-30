/* bling.js - https://gist.github.com/paulirish/12fb951a8b893a454b32 */

window.$ = function(selector) {
    let query = document.querySelectorAll(selector)
    return (query.length <= 1)
        ? query[0]
        : query
}

NodeList.prototype.__proto__ = Array.prototype

Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn)
}

Node.prototype.off = window.off = function (name, fn) {
    this.removeEventListener(name, fn)
}

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
    this.forEach(function (elem) {
        elem.on(name, fn)
    })
}

NodeList.prototype.off = NodeList.prototype.removeEventListener = function (name, fn) {
    this.forEach(function (elem) {
        elem.off(name, fn)
    })
}

/* END bling.js */

Object.prototype.pipe = function (fn) {
    return fn(this)
}
