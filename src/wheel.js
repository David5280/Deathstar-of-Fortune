class Wheel {
  constructor(values) {
    this.values = values
    this.currentValues = []
    this.spinValue = ''
  }
  selectCurrentValues() {
    this.currentValues = []
    for (let i = 1; i <= 6; i++) {
      let index = Math.floor(Math.random() * this.values.length)
      this.currentValues.push(this.values[index])
    }
    return this.currentValues;
  }
  spin() {
    const index = Math.floor(Math.random() * this.currentValues.length)
    this.spinValue = this.currentValues[index]
    return this.currentValues[index]
  }



}

export default Wheel