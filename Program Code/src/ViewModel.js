let viewModel = new Vue({
  el: "#divCalculator",
  data: {
    calculator: Calculator,
    dataSet: null,
    correlation: null,
    myFileInput: null
  },
  methods: {
    setup: function() {
      this.calculator = new Calculator()
      this.calculator.setup()
      this.dataSet = null
      this.correlation = null
      if (this.myFileInput) this.myFileInput.value = ""
      this.myFileInput = null
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
          let arrayNumbers = await this.readUploadFileAsNumber(file)
          this.calculator.inputData(arrayNumbers)
        }
        this.calculateCorrelation()
      }
    },

    readUploadFileAsNumber: function(aFile) {
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
    calculateCorrelation: function() {
      if (!this.calculator.hasTheSameInputLength()) {
        alert("Please make sure both files have the same data length")
        this.setup()
        return
      } else {
        this.dataSet = this.calculator.arrayDataset

        this.correlation = this.calculator.calculateCorrelation()
      }
    },

    getRegression: function() {}
  }
})
