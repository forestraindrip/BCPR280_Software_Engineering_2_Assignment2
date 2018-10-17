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
describe("Calculator", function() {
  var calculator
  beforeEach(function() {
    calculator = new Calculator()
  })
  it("should have arrayData", function() {
    expect(calculator.hasOwnProperty("arrayData")).toBeTruthy()
  })
  it("should have arrayXTimesY", function() {
    expect(calculator.hasOwnProperty("arrayXTimesY")).toBeTruthy()
  })
  it("should have sumXTimesY", function() {
    expect(calculator.hasOwnProperty("sumXTimesY")).toBeTruthy()
  })
  it("should have correlation", function() {
    expect(calculator.hasOwnProperty("correlation")).toBeTruthy()
  })
  it("should have coefficientOfDetermination", function() {
    expect(calculator.hasOwnProperty("coefficientOfDetermination")).toBeTruthy()
  })

  describe("calculator.setup()", function() {
    it("should reset values", function() {
      // debugger
      calculator.setup()
      expect(calculator.arrayData).toEqual([])
      expect(calculator.arrayXTimesY).toEqual([])
      expect(calculator.sumXTimesY).toEqual(0)
      expect(calculator.correlation).toEqual(0)
      expect(calculator.coefficientOfDetermination).toEqual(0)
    })
  })
  describe("calculator.inputArrayNumbers()", function() {
    it("should input array of numbers", function() {
      let lengthArray = generateRandomInteger(1, 100)
      let arrayInput = generateArrayOfNumbers(lengthArray)

      // input arrays to the calculator
      for (let i = 0; i < lengthArray; i++) {
        calculator.inputArrayNumbers(arrayInput[i])
      }
      // examine correctness
      for (let j = 0; j < lengthArray; j++) {
        expect(calculator.arrayData[j].arrayNumbers).toEqual(arrayInput[j])
      }
    })
  })
  describe("calculator.hasTheSameInputLength()", function() {
    it("should compare the lengths of two arrays", function() {
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
  describe("calculator.calculateSum() ", function() {
    it("should return the sum of an array", function() {
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
  describe("calculator.calculateNumberSquared()", function() {
    it("should return an array of numbers sqared ", function() {
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
  describe("calculator.calculateAverage()", function() {
    it("should return average of an array", function() {
      let length = generateRandomInteger(1, 100)
      let anArrayInput = generateArrayOfNumbers(length)

      for (let i = 0; i < anArrayInput.length; i++) {
        let sum = 0
        let anInput = anArrayInput[i]

        anInput.map(num => (sum += num))
        let answer = sum / anInput.length

        let data = {
          arrayNumbers: anInput,
          arrayNumberSquared: [],
          length: anInput.length,
          sum: 0,
          sumSquared: 0
        }
        let average = calculator.calculateAverage(data)
        // debugger
        expect(average).toEqual(answer)
      }
    })
  })

  describe("calculator.startCalculation（）", function() {
    let arrayX = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961]
    let arrayY = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]

    let calculator = new Calculator()
    calculator.inputArrayNumbers(arrayX)
    calculator.inputArrayNumbers(arrayY)
    calculator.startCalculation()
    describe("calculator.calculateCorrelation()", function() {
      it("should return correlation", function() {
        let answer = 0.95449
        let correlation = floorNumber(calculator.correlation, 5)
        expect(correlation).toEqual(answer)
      })
    })

    describe("calculator.calculateRegression()", function() {
      let ansBetaX = [-22.55254, 1.72793]
      let ansBetaY = [45.93578, 0.52725]
      // debugger
      let beta0X = floorNumber(calculator.arrayData[0].beta0, 5)
      let beta1X = floorNumber(calculator.arrayData[0].beta1, 5)
      let beta0Y = floorNumber(calculator.arrayData[1].beta0, 5)
      let beta1Y = floorNumber(calculator.arrayData[1].beta1, 5)
      it("should return regression beta0, beta1 of X and Y", function() {
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
