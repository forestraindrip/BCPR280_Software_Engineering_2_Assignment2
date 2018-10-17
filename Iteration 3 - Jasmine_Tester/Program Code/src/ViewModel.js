let viewModel = new Vue({
  el: "#divCalculator",
  data: {
    calculator: Calculator,
    arrayNumberFirst: [],
    arrayNumberSecond: [],
    correlation: 0,
    coefficientOfDetermination: 0,
    myFileInput: null,
    sumX: null,
    sumY: null,
    sumSquaredX: null,
    sumSquaredY: null,
    sumXTimesY: null,
    beta0X: null,
    beta1X: null,
    beta0Y: null,
    beta1Y: null,
    averageX: null,
    averageY: null,
    arrayTableData: null
  },
  methods: {
    setup: function() {
      this.calculator = new Calculator()
      this.calculator.setup()
      this.arrayNumberFirst = []
      this.arrayNumberSecond = []
      this.correlation = 0
      this.coefficientOfDetermination = 0
      if (this.myFileInput) this.myFileInput.value = ""
      this.myFileInput = null
      this.sumX = null
      this.sumY = null
      this.sumSquaredX= null
      this.sumSquaredY= null
      this.sumXTimesY= null
      this.beta0X= null
      this.beta1X= null
      this.beta0Y= null
      this.beta1Y= null
      this.averageX= null
      this.averageY = null
      this.arrayTableData = null
    },
    inputFiles: async function(event) {
      this.setup()
      this.myFileInput = event.target
      let filesInputed = this.myFileInput.files

      if (filesInputed.length !== 2) {
        alert("Please select TWO files")
        this.setup()
        return
      } else {
        for (let file of filesInputed) {
          let arrayNumbers = await this.decryptUploadFile(file)
          this.calculator.inputArrayNumbers(arrayNumbers)
        }
        if (!this.calculator.hasTheSameInputLength()) {
          alert("Please make sure both files have the same data length")
          this.setup()
          return
        }
        this.startCalculation()
      }
    },

    decryptUploadFile: function(aFile) {
      return new Promise((resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.onerror = () => {
          fileReader.abort()
          reject(new DOMException("Problem parsing input file."))
        }
        fileReader.onload = () => {
          let arrayNumbers = event.target.result.split("\r\n").map(Number)
          resolve(arrayNumbers)
        }
        fileReader.readAsText(aFile)
      })
    },
    startCalculation: function() {
      {
        this.arrayNumberFirst = this.calculator.arrayDataset[0].arrayNumbers
        this.arrayNumberSecond = this.calculator.arrayDataset[1].arrayNumbers

        this.calculator.startCalculation()
        this.updateValues()
        this.generateArrayTableData()
      }
    },

    updateValues: function() {
      let xData = this.calculator.arrayDataset[0]
      let yData = this.calculator.arrayDataset[1]
      this.correlation = this.calculator.correlation
      this.coefficientOfDetermination = this.calculator.coefficientOfDetermination
      this.beta0X = this.calculator.arrayRegressionX[0]
      this.beta1X = this.calculator.arrayRegressionX[1]
      this.beta0Y = this.calculator.arrayRegressionY[0]
      this.beta1Y = this.calculator.arrayRegressionY[1]
      this.sumX = xData.sum
      this.sumY = yData.sum
      this.sumXTimesY =this.calculator.sumXTimesY
      this.sumSquaredX = xData.sumSquared
      this.sumSquaredY = yData.sumSquared
      this.averageX = this.calculator.averageX
      this.averageY = this.calculator.averageY
    },
    generateArrayTableData: function() {
      let aTable = []
      let xData = this.calculator.arrayDataset[0]
      let yData = this.calculator.arrayDataset[1]
      for(let n=0;n< xData.length;n++){
        let aRow = {
          x : xData.arrayNumbers[n],
          y : yData.arrayNumbers[n],
          xSquare : xData.arrayNumberSquared[n],
          ySquare: yData.arrayNumberSquared[n],
          xTimesY: this.calculator.arrayXTimesY[n]
        }
        aTable.push(aRow)
      }

      this.arrayTableData = aTable
    }
  }
})
