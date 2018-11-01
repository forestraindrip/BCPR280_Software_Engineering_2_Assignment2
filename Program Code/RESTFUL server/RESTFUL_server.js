// http://127.0.0.1:8888/API/CAL/TestData1.txt,TestData2.txt
const { createServer } = require("http")
const fs = require("fs")
const Calculator = require("./src/Calculator.js")

//Setting
let hostname = "127.0.0.1"
let port = 8888

const calculator = new Calculator()
const server = createServer((request, response) => {
  calculator.setup()
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })

  if (request.url.includes("API/CAL/")) {
    let indexStart = request.url.indexOf("API/CAL/") + 8
    let address = request.url.slice(indexStart)
    let arrayInput = address.split(",")
    processInput(arrayInput)
    let xData = calculator.arrayData[0]
    let yData = calculator.arrayData[1]
    let result = {
      correlation: calculator.correlation,
      coefficientOfDetermination: calculator.coefficientOfDetermination,
      beta0X: xData.beta0,
      beta1X: xData.beta1,
      beta0Y: yData.beta0,
      beta1Y: yData.beta1
    }
    let display = JSON.stringify(result)
    response.write(display)
  }
  response.end()
})

server.listen(port, hostname, () => {
  console.log(`The RESTFUL server is running at http://${hostname}:${port}/`)
})

///////////////////////////////////////////////////////////
function processInput(arrayAddress) {
  if (arrayAddress.length !== 2) {
    throw Error("Wrong input length")
  } else {
    for (let address of arrayAddress) {
      let anArray = decryptUploadFile(`./${address}`)
      calculator.inputArrayNumbers(anArray)
    }
    console.log('Start calculation')
    calculator.startCalculation()
    console.log('Calculation completed')
  }
}

function decryptUploadFile(address) {
  let anArray = fs
    .readFileSync(address)
    .toString()
    .split("\r\n")
    .map(Number)
  console.log("File reading finished.")

  return anArray
}
