const { createServer } = require("http")
const { readFile } = require("fs")
const url = require("url")

//Setting
let hostname = "127.0.0.1"
let port = 3000

const server = createServer((request, response) => {
  // console.log(request.url)
  let indexStart = request.url.indexOf(".")
  let extension = request.url.slice(indexStart)
  // console.log(getMimeType(extension))

  response.writeHeader(200, {
    "Content-Type": getMimeType(extension)
  })

  let path = (request.url === "/") ? "./index_react.html" : `.${request.url}`
  console.log(path)

  readFile(path, null, (error, data) => {
    if (error) {
      throw error
    }
    // https://gist.github.com/rickdaalhuizen90/d64eb7b1ad44e4613066e9cb9e9708fe
    response.writeHead(200, {
      "Content-Type": getMimeType(extension)
    })
    response.write(data)
    response.end()
  })
})
server.listen(port, hostname, () => {
  console.log(`The server is running at http://${hostname}:${port}/`)
})

function getMimeType(url) {
  switch (url) {
    case ".ico":
      return "image/x-icon"
    case ".html":
      return "text/html"
    case ".js":
      return "text/javascript"
    case ".json":
      return "application/json"
    case ".css":
      return "text/css"
    case ".png":
      return "image/png"
    case ".jpg":
      return "image/jpeg"
    case ".wav":
      return "audio/wav"
    case ".mp3":
      return "audio/mpeg"
    case ".svg":
      return "image/svg+xml"
    case ".pdf":
      return "application/pdf"
    case ".doc":
      return "application/msword"
    case ".eot":
      return "appliaction/vnd.ms-fontobject"
    case ".ttf":
      return "aplication/font-sfnt"
    default:
      return "text/html"
  }
}

///////////////////////////////////////////////////////////
/* 
const http = require("http")
const url = require("url")
const fs = require("fs")
const path = require("path")
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000
// maps file extention to MIME types
const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".eot": "appliaction/vnd.ms-fontobject",
  ".ttf": "aplication/font-sfnt"
}
http
  .createServer(function(req, res) {
    console.log(`${req.method} ${req.url}`)
    // parse URL
    const parsedUrl = url.parse(req.url)
    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    // by limiting the path to current directory only
    const sanitizePath = path
      .normalize(parsedUrl.pathname)
      .replace(/^(\.\.[\/\\])+/, "")
    let pathname = path.join(__dirname, sanitizePath)
    fs.exists(pathname, function(exist) {
      if (!exist) {
        // if the file is not found, return 404
        res.statusCode = 404
        res.end(`File ${pathname} not found!`)
        return
      }
      // if is a directory, then look for index.html
      if (fs.statSync(pathname).isDirectory()) {
        pathname += "/index.html"
      }
      // read file from file system
      fs.readFile(pathname, function(err, data) {
        if (err) {
          res.statusCode = 500
          res.end(`Error getting the file: ${err}.`)
        } else {
          // based on the URL path, extract the file extention. e.g. .js, .doc, ...
          const ext = path.parse(pathname).ext
          // if the file is found, set Content-type and send data
          res.setHeader("Content-type", mimeType[ext] || "text/plain")
          res.end(data)
        }
      })
    })
  })
  .listen(parseInt(port))
console.log(`Server listening on port ${port}`) 
*/
