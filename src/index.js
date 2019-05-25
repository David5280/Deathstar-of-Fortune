// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

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

function createPlayers(Player1, Player2, Player3) {
  let player1 = new Player(Player1, 1)
  let player2 = new Player(Player2, 2)
  let player3 = new Player(Player3, 3)
  return [player1, player2, player3]
}

function createGame(Player1, Player2, Player3) {
  let players = createPlayers(Player1, Player2, Player3)
  let game = new Game(players)
  return game
}

let game = createGame()
game.makeSelectedPuzzle(testData)
game.createWheel(testData.wheel)
game.start(testData.wheel)



const currentCategory = game.selectedPuzzles[game.roundCounter].category;
const currentDescription = game.selectedPuzzles[game.roundCounter].description;

$(document).ready(function() {

  $('#deathstar').hide();
  $('.main-letters').hide();
  $('.turn-controls').hide();
  $('.1').css('border', "white solid 2px")

  $('.con').attr('disabled', true),
  $('.vow').attr('disabled', true)

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
    $('#deathstar').delay(3000).fadeIn();;
    $('.turn-controls').delay(3000).fadeIn();;
  });







  $('.category-hint').append(`<h4>${currentCategory}:</h4><p> ${currentDescription} <p>`);

  function displayPuzzle() {
    let gameBoardPuzzle = game.round.returnCurrentAnswer()
    gameBoardPuzzle.map(letter => {
      if (letter !== " ") {
        $('.puzzle-container').append(`<li class ="puzzle-letters "><p class = ${letter}>${letter}</p></li>`)
        // $('.puzzle-letters').css('color', 'white')
        $('.' + letter).hide()
      }
    }) 
  }

  $('.spin').click(function() {
    game.round.spinWheel()
    $('.con').attr('disabled', false);
    let spinValue =  game.round.wheel.spinValue;
    console.log(game.round.wheel.currentValues);
    $('.death-star-container').append(`<h3 class='spin-value'>${spinValue}</h3>`);
    if (spinValue === 'BANKRUPT' || spinValue === 'LOSE A TURN') {
      $(".spin-value").show().delay(2000).fadeOut();
      $('.con').attr('disabled', true);
    }
  });
  

  $('.main-letters').click(function(event) { 
    let playerGuess = $(event.target).text()
    if (game.round.guessLetter(playerGuess) > 0 ) {
      $('.' + playerGuess).show()
      $(".spin-value").remove()
    }
    $('.con').attr('disabled', true);
    $(event.target).removeClass('con');
  })

  $('.guess-word').click(function() {
    let wordValue = $('.guess-word-input').val()
    game.round.guessAnswer(wordValue)
    game.turn.guessAnswer(wordValue) ?  $('.puzzle-letters').children().show() : $('.guess-word-input').val("")
  })

  displayPuzzle()
  console.log(game.round.returnCurrentAnswer())

});
