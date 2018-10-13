class Calculator {
  constructor() {
    this.arrayDataset = []
    this.arrayXTimesY = []
    this.sumXTimesY = 0
    this.correlation = 0 //r
    this.coefficientOfDetermination = 0 // r*r
    this.arrayRegressionX = []
    this.arrayRegressionY = []
    this.averageX = 0
    this.averageY = 0
  }

  setup() {
    this.arrayDataset = []
    this.arrayXTimesY = []
    this.sumXTimesY = 0
    this.correlation = 0 //r
    this.coefficientOfDetermination = 0 // r*r
    this.arrayRegressionX = []
    this.arrayRegressionY = []
    this.averageX = 0
    this.averageY = 0
  }

  inputArrayNumbers(arrayNumbers) {
    let aDataset = new Dataset(arrayNumbers)
    this.arrayDataset.push(aDataset)
    // console.log(this.arrayDataset)
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

  calculateNumberSquared(anArrayNumbers) {
    let arrayNumberSquared = anArrayNumbers.map(n => {
      return n * n
    })
    return arrayNumberSquared
  }

  calculateCorrelation(XDataset, YDataset) {
    let length = XDataset.length

    let correlation =
      (length * this.sumXTimesY - XDataset.sum * YDataset.sum) /
      Math.sqrt(
        (length * XDataset.sumSquared - XDataset.sum ** 2) *
          (length * YDataset.sumSquared - YDataset.sum ** 2)
      )
    return correlation
  }

  calculateAverage(aDataset){
    let sum = 0
    let length = aDataset.length
    aDataset.arrayNumbers.map(n => {sum += n})
    let average = sum/ length
    return average
  }

  calculateRegression(XDataset) {
    let length = XDataset.length

    let b = (this.sumXTimesY - length *this.averageX * this.averageY) / 
                     (XDataset.sumSquared - length * (this.averageX**2))
    let a = this.averageY - b * this.averageX
    let arrayRegression = [a,b]
    return arrayRegression
  }

  startCalculation() {
    // this.arrayDataset.push([83, 116, 186, 81, 114])
    // this.arrayDataset.push([11.2, 9.3, 21.6, 6.9, 10.2])

    let XDataset = this.arrayDataset[0]
    let YDataset = this.arrayDataset[1]

    // Calculate sum of numbers
    XDataset.sum = this.calculateSum(XDataset.arrayNumbers)
    YDataset.sum = this.calculateSum(YDataset.arrayNumbers)

    // Calculate squared numbers
    XDataset.arrayNumberSquared = this.calculateNumberSquared(
      XDataset.arrayNumbers
    )
    YDataset.arrayNumberSquared = this.calculateNumberSquared(
      YDataset.arrayNumbers
    )

    // Calcualte sum of squared number
    XDataset.sumSquared = this.calculateSum(XDataset.arrayNumberSquared)
    YDataset.sumSquared = this.calculateSum(YDataset.arrayNumberSquared)

    // Calculate X*Y
    for (let i = 0; i < XDataset.length; i++) {
      let xTimesY = XDataset.arrayNumbers[i] * YDataset.arrayNumbers[i]
      this.arrayXTimesY.push(xTimesY)
    }
    // Calculate sum of X*Y
    this.sumXTimesY = this.calculateSum(this.arrayXTimesY)

    this.correlation = this.calculateCorrelation(XDataset, YDataset)
    this.coefficientOfDetermination = this.correlation ** 2
    console.log("correlation:"+ this.correlation)
    this.averageX = this.calculateAverage(XDataset)
    this.averageY = this.calculateAverage(YDataset)
    this.arrayRegressionX =  this.calculateRegression(XDataset)
    console.log("X reg: " + this.arrayRegressionX)
    this.arrayRegressionY =  this.calculateRegression(YDataset)
    console.log("Y reg: " + this.arrayRegressionY)
  }
  examineRelationship() {}
}
