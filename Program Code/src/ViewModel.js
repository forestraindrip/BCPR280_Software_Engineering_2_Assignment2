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
      this.dataSet =null
      this.calculator.setup()
      this.correlation = null
      if (this.myFileInput) this.myFileInput.value = ""
      this.myFileInput = null
    },
    inputFiles: function(event) {
      this.setup()
      this.myFileInput = event.target
      let filesInputed = this.myFileInput.files

      if (filesInputed.length !== 2) {
        alert("Please select TWO files")
        this.setup()
        return
      } else {
        let promise1 = new Promise(() => this.processFile(filesInputed[0]))
        let promise2 = new Promise(() => this.processFile(filesInputed[1]))

        Promise.all([promise1, promise2])
          .then(value => console.log(value))
          .catch(error => console.log(error))
      }
      /* {
        for (let aFile of filesInputed) {
          let fileReader = new FileReader()
          fileReader.onload = this.processFile
          fileReader.readAsText(aFile)
        }
      } */
    },
    processFile: function(aFile) {
      // console.log(aFile)
      return new Promise((resolve, reject) => {
        let fileReader = new FileReader()

        fileReader.onload = () => {
          let arrayStrings = event.target.result
          let arrayNumbers = arrayStrings.split("\r\n").map(Number)
          this.calculator.inputData(arrayNumbers)
          resolve(arrayNumbers)
        }
        fileReader.readAsText(aFile)
      })

      // let arrayStrings = event.target.result
      // let arrayNumbers = arrayStrings.split("\r\n").map(Number)
      // this.calculator.inputData(arrayNumbers)
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
