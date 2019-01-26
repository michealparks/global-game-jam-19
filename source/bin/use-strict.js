module.exports = function (src) {
  this.cacheable()
  return '\'use strict\';\n' + src
}