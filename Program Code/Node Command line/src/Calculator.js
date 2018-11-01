class Calculator {
  constructor() {
    this.setup()
  }

  setup() {
    this.arrayData = []
    this.arrayXTimesY = []
    this.sumXTimesY = 0
    this.correlation = 0 //r
    this.coefficientOfDetermination = 0 // r*r
  }

  inputArrayNumbers(arrayNumbers) {
    let data = {
      arrayNumbers: arrayNumbers,
      arrayNumberSquared: [],
      length: arrayNumbers.length,
      sum: null,
      sumSquared: null,
      average: null,
      beta0: null,
      beta1: null
    }

    this.arrayData.push(data)
    // console.log(this.arrayData)
  }

  hasTheSameInputLength() {
    return this.arrayData[0].length === this.arrayData[1].length
  }

  calculateSum(anArray) {
    // console.log("anArray", anArray)
    let sum = 0
    anArray.map(n => (sum += n))
    return sum
  }

  calculateNumberSquared(anArrayNumbers) {
    let arrayNumberSquared = anArrayNumbers.map(n => {
      return this.floorNumber(n*n,5)
    })
    return  arrayNumberSquared
  }

  calculateCorrelation(XData, YData) {
    let length = XData.length

    let correlation =
      (length * this.sumXTimesY - XData.sum * YData.sum) /
      Math.sqrt(
        (length * XData.sumSquared - XData.sum ** 2) *
          (length * YData.sumSquared - YData.sum ** 2)
      )
    
    return this.floorNumber(correlation, 5)
  }

  calculateAverage(data) {
    let sum = 0
    let length = data.length
    data.arrayNumbers.map(n => {
      sum += n
    })
    let average = sum / length
    return this.floorNumber(average, 5)
  }

  calculateRegression(dataX, dataY) {
    let length = dataX.length

    let b =
      (this.sumXTimesY - length * dataX.average * dataY.average) /
      (dataX.sumSquared - length * dataX.average ** 2)
    let a = dataY.average - b * dataX.average
    dataX.beta0 = this.floorNumber(a, 5)
    dataX.beta1 = this.floorNumber(b, 5)
  }

  startCalculation() {
    // this.arrayData.push([83, 116, 186, 81, 114])
    // this.arrayData.push([11.2, 9.3, 21.6, 6.9, 10.2])

    let dataX = this.arrayData[0]
    let dataY = this.arrayData[1]

    // Calculate sum of numbers
    dataX.sum = this.calculateSum(dataX.arrayNumbers)
    dataY.sum = this.calculateSum(dataY.arrayNumbers)

    // Calculate squared numbers
    dataX.arrayNumberSquared = this.calculateNumberSquared(dataX.arrayNumbers)
    dataY.arrayNumberSquared = this.calculateNumberSquared(dataY.arrayNumbers)

    // Calcualte sum of squared number
    dataX.sumSquared = this.calculateSum(dataX.arrayNumberSquared)
    dataY.sumSquared = this.calculateSum(dataY.arrayNumberSquared)

    // Calculate X*Y
    for (let i = 0; i < dataX.length; i++) {
      let xTimesY = dataX.arrayNumbers[i] * dataY.arrayNumbers[i]
      xTimesY = this.floorNumber(xTimesY,5)
      this.arrayXTimesY.push(xTimesY)
    }
    // Calculate sum of X*Y
    this.sumXTimesY = this.floorNumber( this.calculateSum(this.arrayXTimesY),5)

    this.correlation = this.calculateCorrelation(dataX, dataY)
    this.coefficientOfDetermination = this.floorNumber(this.correlation ** 2,5)
    // console.log("correlation:" + this.correlation)
    dataX.average = this.calculateAverage(dataX)
    dataY.average = this.calculateAverage(dataY)
    this.calculateRegression(dataX, dataY)
    // console.log(`X reg:  ${dataX.beta0} , ${dataX.beta1}`)
    this.calculateRegression(dataY, dataX)
    // console.log(`Y reg:  ${dataY.beta0} , ${dataY.beta1}`)
  }
  // examineRelationship() {}
  floorNumber(anNumber, digit) {
    return Math.floor(anNumber * 10 ** digit) / 10 ** digit
  }
}

module.exports = Calculator