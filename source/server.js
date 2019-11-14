const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 3000

const contentTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'text/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mp3',
  '.woff2': 'font/woff2'
}

function handleError (err, res) {
  if (err.code === 'ENOENT') {
    res.writeHead(200)
    res.end('404: Not Found')
  } else {
    res.writeHead(500)
    res.end('500: Internal Server Error')
  }
}

const server = http.createServer(function (req, res) {
  const filePath = req.url === '/'
    ? './public/index.html'
    : `./public${req.url}`

  const ext = path.extname(filePath)
  const contentType = contentTypes[ext]

  fs.readFile(filePath, function (err, content) {
    if (err) return handleError(err, res)

    res.writeHead(200, {'Content-Type': contentType})
    res.end(content, 'utf-8')
  })
})

server.listen(port)
console.log(`Server running on port ${port}!`)
