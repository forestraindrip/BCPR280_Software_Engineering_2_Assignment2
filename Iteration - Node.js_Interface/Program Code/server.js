const { createServer } = require("http")
const { readFile } = require("fs")

//Setting
let hostname = "127.0.0.1"
let port = 3000

const server = createServer((request, response) => {
  response.writeHeader(200, { "Content-Type": "text/html" })
  readFile("./index.html", null, (error, data) => {
    if (error) {
      throw error
    }
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write(data)
    response.end()
  })
})
server.listen(port, hostname, () => {
  console.log(`The server is running at http://${hostname}:${port}/`)
})

// https://gist.github.com/rickdaalhuizen90/d64eb7b1ad44e4613066e9cb9e9708fe