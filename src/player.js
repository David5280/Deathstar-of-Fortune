class Player {
  constructor(name, id) {
    this.name = name
    this.score = 0
    this.id = id
    this.bank = 0
  }
  getPlayerName() {
    return this.name
  }
  getPlayerScore() {
    return this.score
  }
}