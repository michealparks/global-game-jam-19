'use strict'

const fs = require('fs')
const path = require('path')

const parse = (loader, source, context, cb) => {
  const imports = []
  const importPattern = /@import ([./\w_-]+);/gi
  let match = importPattern.exec(source)

  while (match != null) {
    imports.push({
      key: match[1],
      target: match[0],
      content: ''
    })
    match = importPattern.exec(source)
  }

  processImports(loader, source, context, imports, cb)
}

const processImports = (loader, source, context, imports, cb) => {
  if (imports.length === 0) {
    return cb(null, source)
  }

  const imp = imports.pop()

  loader.resolve(context, imp.key + '.glsl', (err, resolved) => {
    if (err) return cb(err)

    loader.addDependency(resolved)

    fs.readFile(resolved + '.min', 'utf-8', (err, src) => {
      if (err) return cb(err)

      parse(loader, src, path.dirname(resolved + '.min'), (err, bld) => {
        if (err) return cb(err)

        source = source.replace(imp.target, bld)
        processImports(loader, source, context, imports, cb)
      })
    })
  })
}

module.exports = function (source) {
  const cb = this.async()

  this.cacheable()
  parse(this, source, this.context, (err, bld) => {
    if (err) return cb(err)

    const str = JSON.stringify(bld
      .replace(/\n\n|\n\n\n|\n\t|\n\t\t/g, '\n'))

    cb(null, 'export default ' + str)
  })
}