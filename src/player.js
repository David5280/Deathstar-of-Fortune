class Player {
  constructor(name, id) {
    this.name = name
    this.id = id
    this.score = 0
    this.bank = 0
  }
  getPlayerName() {
    return this.name
  }
  getPlayerScore() {
    return this.score
  }
}

export default Player;