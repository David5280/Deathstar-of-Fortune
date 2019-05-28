import Game from "./game";
import $ from 'jquery';

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
    
  },
  displayPuzzle(gameBoardPuzzle) {
    gameBoardPuzzle.map(letter => {
      if (letter === '&') {
        $('.puzzle-container').append(`<li class ="puzzle-letters "><p class = ${letter}>${letter}</p></li>`)
      } else if (letter !== ' ') {
        $('.puzzle-container').append(`<li class ="puzzle-letters "><p class = ${letter}>${letter}</p></li>`)
        $('.' + letter).hide()
      } else {
        $('.puzzle-container').append(`<li class ="puzzle-letters-black"><p>'  '</p></li>`)
      }
    }) 
  },
  displayCategoryHint(currentCategory, currentDescription) {
    $('.category-hint').append(`<h4>${currentCategory}:</h4><p> ${currentDescription} <p>`);
  },
  removeDom() {
    $('.puzzle-container').text('')
    $('.category-hint').text('')
    $('.main-letters').text('')
  },
  appendLetters() {
  $('.main-letters').append(`
  <button class='vowel-a vow' disabled>A</button>
  <button class='consonant-b con'>B</button>
  <button class='consonant-c con'>C</button>
  <button class='consonant-d con'>D</button>
  <button class='vowel-e vow' disabled>E</button>
  <button class='consonant-f con'>F</button>
  <button class='consonant-g con'>G</button>
  <button class='consonant-h con'>H</button>
  <button class='vowel-i vow' disabled>I</button>
  <button class='consonant-i con'>J</button>
  <button class='consonant-j con'>K</button>
  <button class='consonant-k con'>L</button>
  <button class='vowel-o vow' disabled>O</button>
  <button class='consonant-l con'>M</button>
  <button class='consonant-m con'>N</button>
  <button class='consonant-n con'>P</button>
  <button class='consonant-o con'>Q</button>
  <button class='consonant-p con'>R</button>
  <button class='consonant-q con'>S</button>
  <button class='consonant-t con'>T</button>
  <button class='vowel-u vow' disabled>U</button>
  <button class='consonant-v con'>V</button>
  <button class='consonant-w con'>W</button>
  <button class='consonant-x con'>Y</button>
  <button class='consonant-y con'>X</button>
  <button class='consonant-z con'>Z</button>
  `)
  },
  removeLosersBonus(bonusPlayer) {
    $('.main-score-cards').text('');
    $('.main-score-cards').append(`
    <article class='player-scorecard player1 1'>
    <h2 id='js-player1-name'>${bonusPlayer.name}</h2>
    <h3>Score:<span id='${bonusPlayer}-score'> 0 </span></h3>
    <h3>Bank:<span id='${bonusPlayer}-bank'>${bonusPlayer.bank}</span></h3>
  </article>
  `)
  }
  displayBonusLetters(letters) {
    letters.forEach(letter => {
      $('.' + letter).show()
    })
  }
} 