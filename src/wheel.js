class Wheel {
  constructor(values) {
    this.values = values
    this.currentValues = []
  }
  selectCurrentValues() {
    for (let i = 1; i <= 6; i++) {
      let index = Math.floor(Math.random() * this.values.length)
      this.currentValues.push(this.values.splice(index, 1)[0])
    }
    return this.currentValues 
  }
  spin() {
    const index = Math.floor(Math.random() * this.currentValues.length)
    return this.currentValues[index]
  }
}

export default Wheel