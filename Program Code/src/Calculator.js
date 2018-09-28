class Calculator {
  constructor() {
    this.arrayDataset = []
    this.arrayX = []
    this.arrayY = []
    this.sumX = 0
    this.sumY = 0
    this.sumXSquared = 0
    this.sumYSquared = 0
    this.sumXTimesY = 0
  }

  setup() {
    this.arrayDataset = []
    this.arrayX = []
    this.arrayY = []
    this.sumX = 0
    this.sumY = 0
    this.sumXSquared = 0
    this.sumYSquared = 0
    this.sumXTimesY = 0
  }

  inputData(arrayStrings) {
    console.log(arrayStrings, this.arrayDataset)
    let arrayNumbers = arrayStrings.split("\r\n").map(Number)
    this.arrayDataset.push(arrayNumbers)
    console.log(this.arrayDataset)
  }

  hasTheSameInputLength() {
    return this.arrayDataset[0].length === this.arrayDataset[1].length
  }

  calculateSum(anArray) {
    // console.log("anArray", anArray)
    let sum = 0
    for (let number of anArray) {
      sum += number
    }
    return sum
  }

  calculateCorrelation() {
    // this.arrayDataset.push([83, 116, 186, 81, 114])
    // this.arrayDataset.push([11.2, 9.3, 21.6, 6.9, 10.2])

    this.arrayX = this.arrayDataset[0]
    this.arrayY = this.arrayDataset[1]

    this.sumX = this.calculateSum(this.arrayX)
    this.sumY = this.calculateSum(this.arrayY)

    let arrayXSquared = this.arrayX.map(n => {
      return n * n
    })
    this.sumXSquared = this.calculateSum(arrayXSquared)

    let arrayYSquared = this.arrayY.map(n => {
      return n * n
    })
    this.sumYSquared = this.calculateSum(arrayYSquared)

    let arrayXTimesY = []
    for (let i = 0; i < this.arrayX.length; i++) {
      let xTimesY = this.arrayX[i] * this.arrayY[i]
      arrayXTimesY.push(xTimesY)
    }
    this.sumXTimesY = this.calculateSum(arrayXTimesY)

    let lengthData = this.arrayX.length
    let correlation =
      (lengthData * this.sumXTimesY - this.sumX * this.sumY) /
      Math.sqrt(
        (lengthData * this.sumXSquared - Math.pow(this.sumX, 2)) *
          (lengthData * this.sumYSquared - Math.pow(this.sumY, 2))
      )
    this.correlation = correlation
    console.log(correlation)
    return correlation
  }

  examineRelationship() {}

  calculateRegression() {}
}
