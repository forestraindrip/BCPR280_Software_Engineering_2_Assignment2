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
    inputFiles: function(event) {
      this.setup()
      this.myFileInput = event.target
      let filesInputed = this.myFileInput.files

      if (filesInputed.length !== 2) {
        alert("Please select TWO files")
        this.setup()
        return
      } else {
        for (let aFile of filesInputed) {
          let fileReader = new FileReader()
          fileReader.onload = this.processFile
          fileReader.readAsText(aFile)
        }
      }
    },
    aPromise: function(){
      
    }
    ,
    processFile: function(event) {
      let arrayStrings = event.target.result
      this.calculator.inputData(arrayStrings)
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
