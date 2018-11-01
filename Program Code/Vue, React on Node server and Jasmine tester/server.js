// http://127.0.0.1:8000
const { createServer } = require("http")
const fs = require("fs")

//Setting
let hostname = "127.0.0.1"
let port = 8000

// Create a server
const server = createServer((request, response) => {
  // console.log(request.url)

  // Determine path
  let path = request.url === "/" ? "./index_vue.html" : `.${request.url}`
  console.log(`Asking for '${path}'`)

  // Read the file from the URL address
  fs.readFile(path, null, (error, data) => {
    if (error) {
      throw error
    }
    // Get the extension
    let extension = getExtension(request.url)
    // Write the type of the extension to the response header
    /* Reference: https://gist.github.com/rickdaalhuizen90/d64eb7b1ad44e4613066e9cb9e9708fe */
    response.writeHeader(200, {
      "Content-Type": getMimeType(extension)
    })

    // Response data
    response.write(data)
    // End the response
    response.end()
  })
})
// start listening request
server.listen(port, hostname, () => {
  console.log(`The server is running at http://${hostname}:${port}/`)
})
function getExtension(anURL){
  let indexStart = anURL.indexOf(".")
  let extension = anURL.slice(indexStart)
  return extension
}


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
