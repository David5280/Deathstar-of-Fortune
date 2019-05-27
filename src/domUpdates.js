import Game from "./game";

export default {
  removeSpinValue() {
    $('.spin-value').remove()
  },
  addPlayerBorder(id) {
    $('.player-scorecard').css('border', "none");
    $('.'+id).css('border', "white solid 2px");
  },
  changeScore(player1, player2, player3) {
    $('#player-1-score').text(player1);
    $('#player-2-score').text(player2);
    $('#player-3-score').text(player3);
  },
  enableBuyVowel(currentPlayer) {
    currentPlayer >= 100 ? $('.buy-vowel').attr('disabled', false) : null
  },
  changeBank(player1, player2, player3) {
    $('#player-1-bank').text(player1);
    $('#player-2-bank').text(player2);
    $('#player-3-bank').text(player3);
  },
  roundOver() {
    $('.main').hide()
  }
} 