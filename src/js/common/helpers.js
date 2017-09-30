/* bling.js - https://gist.github.com/paulirish/12fb951a8b893a454b32 */

window.$ = function(selector) {
    let query = document.querySelectorAll(selector)
    return (query.length === 1)
        ? query[0]
        : query
}

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
}

Object.prototype.pipe = function (fn) {
    return fn(this)
}

/* END bling.js */
