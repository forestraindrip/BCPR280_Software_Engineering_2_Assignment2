// node Node_CMD_server.js TestData1.txt,TestData2.txt
const fs = require("fs")
const Calculator = require("./src/Calculator.js")

const calculator = new Calculator()
let addressInput = process.argv[2]
let arrayInput = addressInput.split(",")
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

fs.writeFile("./Result.txt", JSON.stringify(result), () => {
  console.log("Result.txt is written.")
})
////////////////////////////////////////////////////
function processInput(arrayAddress) {
  if (arrayAddress.length !== 2) {
    throw Error("Wrong input length")
  } else {
    for (let address of arrayAddress) {
      let anArray = decryptUploadFile(`./${address}`)
      calculator.inputArrayNumbers(anArray)
    }
    console.log("Start calculation")
    calculator.startCalculation()
    console.log("Calculation completed")
  }
}

function decryptUploadFile(address) {
  let anArray = fs
    .readFileSync(address)
    .toString()
    .split("\r\n")
    .map(Number)
  console.log("File has read.")

  return anArray
}
