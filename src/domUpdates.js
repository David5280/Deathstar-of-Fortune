import Game from "./game";

export default {
  removeSpinValue: function() {
    $('.spin-value').remove()
  },
  addPlayerBorder: function(id) {
    $('.player-scorecard').css('border', "none")
    $('.'+id).css('border', "white solid 2px")
  },
  changeScore: function(player1, player2, player3) {
    $('#player-1-score').text(player1)
    $('#player-2-score').text(player2)
    $('#player-3-score').text(player3)
  }
} 