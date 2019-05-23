import Game from "./game";

export default {
  removeSpinValue: function() {
    $('.spin-value').remove()
  },
  addPlayerBorder: function(id) {
    $('.player-scorecard').css('border', "none")
    $('.'+id).css('border', "white solid 2px")
  }
} 