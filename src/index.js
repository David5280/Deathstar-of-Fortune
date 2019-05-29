// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/styles.scss';
import './css/index.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/starwarsbackground.jpg'
import './images/death-star.png'
import Player from './player';
import testData from '../data/test_data_set'
import Puzzle from './puzzle';
import PuzzleBank from './puzzleBank';
import Turn from './turn';
import Wheel from './wheel';
import Round from './round';
import Game from './game';
let wheel;
let turn;
let round;
let game;

var data;
fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    data = parsedData.data
    console.log(data)
  })
  .catch(err => console.error(err));



function createGame(Player1, Player2, Player3) {
  let players = createPlayers(Player1, Player2, Player3)
  let game = new Game(players)
  return game
}

function createPlayers(Player1, Player2, Player3) {
  let player1 = new Player(Player1, 1)
  let player2 = new Player(Player2, 2)
  let player3 = new Player(Player3, 3)
  return [player1, player2, player3]
}

function startGame(data) {
  game = createGame()
  game.makeSelectedPuzzle(data)
  game.makeBonusPuzz(data);
  game.createWheel(data.wheel)
  game.start(data.wheel)
  console.log(game.selectedPuzzles)
}

// const currentCategory = game.selectedPuzzles[game.roundCounter].category;
// const currentDescription = game.selectedPuzzles[game.roundCounter].description;

$(document).ready(function() {

  $('#deathstar').hide();
  $('.main-letters').hide();
  $('.turn-controls').hide();
  $('.1').css('border', "white solid 2px")

  $('.guess-word-input').hide()
  $('.guess-word-submit').hide()

  $('.middle-section').append(`
  <section class='pre-game-form'>
    <form class='player-names'>
      <input type='text' placeholder='Player 1' class='player-name-inputs p1'>
      <input type='text' placeholder='Player 2' class='player-name-inputs p2'>
      <input type='text' placeholder='Player 3' class='player-name-inputs p3'>
      <button id='start-game-btn' class='player-name-inputs'>Continue</button>
    </form>
  </section>`)

  $('#start-game-btn').click(function(event) {
    event.preventDefault();
    startGame(data);
    $('.pre-game-form').fadeOut();
    $('.pregame-prompt-container').append(`
      <section class='pre-game-form prompt'>
        <h3 class='pregame-prompt'>Welcome!  Use the buttons below to take your turn, and keep track of points in the boxes to the left!</h3>
        </section>
    `).delay(3000).fadeOut();
    $('#js-player1-name').text($('.p1').val() || 'Player 1');
    $('#js-player2-name').text($('.p2').val() || 'Player 2');
    $('#js-player3-name').text($('.p3').val() || 'Player 3');
    $('.main-letters').delay(3000).fadeIn();
    $('#deathstar').delay(3000).fadeIn();
    $('.turn-controls').delay(3000).fadeIn();
    $('.header-round-indicator').append(`Round ${game.roundCounter}`)

  });

  $('.spin').click(function() {
    game.round.spinWheel()
    $('.con').attr('disabled', false);
    let spinValue =  game.round.wheel.spinValue;
    $('.spin').attr('disabled', true);
    $('.guess-word').attr('disabled', true);
    $('.puzzle').append(`<h3 class='spin-value roll-in'>${spinValue}</h3>`);
    if (spinValue === 'BANKRUPT' || spinValue === 'LOSE A TURN') {
      $(".spin-value").show().delay(2000).fadeOut();
      $('.con').attr('disabled', true);
      $('.spin').attr('disabled', false);
      $('.guess-word').attr('disabled', false);
    }
    $('.buy-vowel').attr('disabled', true);
  });
  

  $('.main-letters').click(function(event) { 
    console.log(event.target.className)
    if (event.target.className.includes('con')) {
      $('.spin').attr('disabled', false);
      $('.guess-word').attr('disabled', false);
      let playerGuess = $(event.target).text()
      if (game.round.guessLetter(playerGuess) > 0 ) {
        $('.' + playerGuess).show()
        $(".spin-value").remove()
      }
      $('.con').attr('disabled', true);
      $(event.target).removeClass('con');
    }
  })

  $('.guess-word-submit').click(function() {
    if (game.roundCounter > 4) {
      console.log('bonus-round-submit')
      $('.puzzle').text('')
      $('.puzzle').append(`<p class='game-over'>GAME OVER.  YOU WON!</p>`)
    }
  })

  $('.guess-word').click(function(event) {
    event.preventDefault()
    $('.guess-word-input').show()
    $('.guess-word-submit').show()
    $('.turn-buttons').hide();
    $('.con').attr('id', 'guess-word-letters')
    $('.vow').attr('id', 'guess-word-letters')
  })

  $('.guess-word-submit').click(function(event) {
    event.preventDefault()
    let wordValue = $('.guess-word-input').val()
    game.round.guessAnswer(wordValue);
    game.turn.guessAnswer(wordValue) ?  
      $('.puzzle-letters').children().show() : 
      $('.guess-word-input').val("");
    $('.guess-word-input').hide().fadeOut();
    $('.guess-word-submit').hide().fadeOut();
    $('.turn-buttons').show().fadeIn();
    $('.con').attr('id', '')
    $('.vow').attr('id', '')
    $('.buy-vowel').attr('disabled', true);
  })

  $('.buy-vowel').click(function() {
    $('.vow').attr('disabled', false);
    $('.spin').attr('disabled', true);
    $('.guess-word').attr('disabled', true);
  })

  $('.main-letters').click(function(event) {
    if (event.target.className.includes('vow')) {
      let playerGuess = $(event.target).text()
      if (game.round.buyVowel(playerGuess) > 0 ) {
        $('.' + playerGuess).show()
      }
      $('.spin').attr('disabled', false);
      $('.guess-word').attr('disabled', false);
      $('.vow').attr('disabled', true);
      $(event.target).removeClass('vow');
    }
  })
  $('.turn-buttons').click(function(event) {
    console.log(event.target)
    console.log(event.target.className)
    if (event.target.className.includes('spin-bonus')) {
      console.log('hi')
      game.bonusRound.createBonusWheel()
      let spinValue = game.bonusRound.bonusValue
      $('.puzzle').append(`<h3 class='spin-value roll-in'>${spinValue}</h3>`);
      $('.con').attr('disabled', false);
      $('.vow').attr('disabled', false);
    }
  })
  $('.main-letters').click(function(event) {
    if (game.roundCounter > 4 && event.target.className.includes('con')) {
      game.bonusRound.turnCountConstInc()
    } else if (game.roundCounter > 4 && event.target.className.includes('vow')) {
      game.bonusRound.turnCountVowInc()
    }
    if (game.roundCounter > 4 && game.bonusRound.turnCountConst < 3) {
      $('.con').attr('disabled', false);
    } else if (game.roundCounter > 4 && game.bonusRound.turnCountVow < 1) {
      $('.vow').attr('disabled', false);
    }
  })
});
