let viewModel = new Vue({
  el: "#divCalculator",
  data: {
    calculator: Calculator,
    arrayNumberFirst: null,
    arrayNumberSecond: null,
    correlation: null,
    coefficientOfDetermination: null,
    myFileInput: null,
    xBeta0: 0,
    xBeta1: 0,
    yBeta0: 0,
    yBeta1: 0,
    arrayTableData: []
  },
  methods: {
    setup: function() {
      this.calculator = new Calculator()
      this.calculator.setup()
      this.arrayNumberFirst = null
      this.arrayNumberSecond = null
      this.correlation = null
      this.coefficientOfDetermination = null
      if (this.myFileInput) this.myFileInput.value = ""
      this.myFileInput = null
      this.xBeta0 = 0
      this.xBeta1 = 0
      this.yBeta0 = 0
      this.yBeta1 = 0
      this.arrayTableData = []
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
      }
    },

    updateValues: function() {
      this.correlation = this.calculator.correlation
      this.coefficientOfDetermination = this.calculator.coefficientOfDetermination
      this.xBeta0 = this.calculator.arrayRegressionX[0]
      this.xBeta1 = this.calculator.arrayRegressionX[1]
      this.yBeta0 = this.calculator.arrayRegressionY[0]
      this.yBeta1 = this.calculator.arrayRegressionY[1]
    },
    generateArrayTableData: function() {}
  }
})
