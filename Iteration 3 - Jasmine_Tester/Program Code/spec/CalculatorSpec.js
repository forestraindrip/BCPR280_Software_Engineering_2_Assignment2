function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateArrayOfNumbers(lengthArray) {
  let anArray = []
  for (let n = 0; n < lengthArray; n++) {
    let anInput = []
    let length = generateRandomInteger(1, 100)
    for (let i = 0; i < length; i++) {
      let aNumber = generateRandomInteger(1, 100)
      anInput.push(aNumber)
    }
    anArray.push(anInput)
  }
  return anArray
}

function floorNumber(anNumber, digit) {
  return Math.floor(anNumber * 10 ** digit) / 10 ** digit
}
/************************************************************/
describe("Calculator", function () {
  var calculator
  beforeEach(function () {
    calculator = new Calculator()
  })
  it("should have arrayDataset", function () {
    expect(calculator.hasOwnProperty("arrayDataset")).toBeTruthy()
  })
  it("should have arrayXTimesY", function () {
    expect(calculator.hasOwnProperty("arrayXTimesY")).toBeTruthy()
  })
  it("should have sumXTimesY", function () {
    expect(calculator.hasOwnProperty("sumXTimesY")).toBeTruthy()
  })
  it("should have correlation", function () {
    expect(calculator.hasOwnProperty("correlation")).toBeTruthy()
  })
  it("should have coefficientOfDetermination", function () {
    expect(calculator.hasOwnProperty("coefficientOfDetermination")).toBeTruthy()
  })
  it("should have arrayRegressionX", function () {
    expect(calculator.hasOwnProperty("arrayRegressionX")).toBeTruthy()
  })
  it("should have arrayRegressionY", function () {
    expect(calculator.hasOwnProperty("arrayRegressionY")).toBeTruthy()
  })
  it("should have averageX", function () {
    expect(calculator.hasOwnProperty("averageX")).toBeTruthy()
  })
  it("should have averageY", function () {
    expect(calculator.hasOwnProperty("averageY")).toBeTruthy()
  })
  describe("calculator.setup()", function () {
    it("should reset values", function () {
      // debugger
      calculator.setup()
      expect(calculator.sumXTimesY).toEqual(0)
      expect(calculator.correlation).toEqual(0)
      expect(calculator.coefficientOfDetermination).toEqual(0)
      expect(calculator.arrayRegressionX).toEqual([])
      expect(calculator.arrayRegressionY).toEqual([])
      expect(calculator.averageX).toEqual(0)
      expect(calculator.averageY).toEqual(0)
    })
  })
  describe("calculator.inputArrayNumbers()", function () {
    it("should input array of numbers", function () {
      let lengthArray = generateRandomInteger(1, 100)
      let arrayInput = generateArrayOfNumbers(lengthArray)

      // input arrays to the calculator
      for (let i = 0; i < lengthArray; i++) {
        calculator.inputArrayNumbers(arrayInput[i])
      }
      // examine correctness
      for (let j = 0; j < lengthArray; j++) {
        expect(calculator.arrayDataset[j].arrayNumbers).toEqual(arrayInput[j])
      }
    })
  })
  describe("calculator.hasTheSameInputLength()", function () {
    it("should compare the lengths of two arrays", function () {
      let length = generateRandomInteger(0, 50)
      let arrayX = generateArrayOfNumbers(length)
      length = generateRandomInteger(51, 100)
      let arrayY = generateArrayOfNumbers(length)

      calculator.inputArrayNumbers(arrayX)
      calculator.inputArrayNumbers(arrayY)
      let isTheSameLength = calculator.hasTheSameInputLength()
      expect(isTheSameLength === false).toBeTruthy()
    })
  })
  describe("calculator.calculateSum() ", function () {
    it("should return the sum of an array", function () {
      let length = generateRandomInteger(1, 100)
      let anArrayInput = generateArrayOfNumbers(length)
      for (let i = 0; i < anArrayInput.length; i++) {
        let answer = 0
        let anInput = anArrayInput[i]
        anInput.map(num => (answer += num))

        let sum = calculator.calculateSum(anInput)
        expect(sum).toEqual(answer)
      }
    })
  })
  describe("calculator.calculateNumberSquared()", function () {
    it("should return an array of numbers sqared ", function () {
      let length = generateRandomInteger(1, 100)
      let anArrayInput = generateArrayOfNumbers(length)
      for (let i = 0; i < anArrayInput.length; i++) {
        let anInput = anArrayInput[i]
        let answer = anInput.map(num => num ** 2)
        let arraySquared = calculator.calculateNumberSquared(anInput)
        expect(arraySquared).toEqual(answer)
      }
    })
  })
  describe("calculator.calculateAverage()", function () {
    it("should return average of an array", function () {
      let length = generateRandomInteger(1, 100)
      let anArrayInput = generateArrayOfNumbers(length)

      for (let i = 0; i < anArrayInput.length; i++) {
        let sum = 0
        let anInput = anArrayInput[i]

        anInput.map(num => (sum += num))
        let answer = sum / anInput.length

        let aDataset = new Dataset(anInput)
        let average = calculator.calculateAverage(aDataset)
        // debugger
        expect(average).toEqual(answer)
      }
    })
  })

  describe("calculator.startCalculation（）", function () {
    let arrayX = [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503]
    let arrayY = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]

    let calculator = new Calculator()
    calculator.inputArrayNumbers(arrayX)
    calculator.inputArrayNumbers(arrayY)
    calculator.startCalculation()
    // TODO:
    describe("calculator.calculateCorrelation()", function () {
      it("should return correlation", function () {
        let answer = 0.9978340665
        let correlation = floorNumber(calculator.correlation, 10)
        expect(correlation).toEqual(answer)
      })
    })

    // TODO:
    describe("calculator.calculateRegression()", function () {
      it("should return regression of two arrays", function () {
        let ansBetaX = [38.0051906115, 1.0913454583]
        let ansBetaY = [251.9417670907, 0.7027937393]

        let beta0X = floorNumber(calculator.arrayRegressionX[0], 10)
        let beta1X = floorNumber(calculator.arrayRegressionX[1], 10)
        let beta0Y = floorNumber(calculator.arrayRegressionY[0], 10)
        let beta1Y = floorNumber(calculator.arrayRegressionY[1], 10)

        expect([beta0X, beta1X]).toEqual(ansBetaX)
        expect([beta0Y, beta1Y]).toEqual(ansBetaY)
      })
    })

  })

  /*
  describe("calculator.", function() {})

  it("", function() {})
  */
})
