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
    // $('.main').hide()
  },
  displayPuzzle(gameBoardPuzzle) {
    gameBoardPuzzle.map(letter => {
      if (letter !== " ") {
        $('.puzzle-container').append(`<li class ="puzzle-letters "><p class = ${letter}>${letter}</p></li>`)
        $('.' + letter).hide()
      } else {
        $('.puzzle-container').append(`<li class ="puzzle-letters-black"><p>'  '</p></li>`)
        console.log('lettertest')
        // $('.' + letter).css('background-color', 'black')
      }
    }) 
  },
  displayCategoryHint(currentCategory, currentDescription) {
    $('.category-hint').append(`<h4>${currentCategory}:</h4><p> ${currentDescription} <p>`);
  },
  removeDom() {
    $('.puzzle-container').text('')
    $('.category-hint').text('')
  }
} 