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

  $('.middle-section').append(`
    <section class='pre-game-form'>
    <form class='player-names'>
      <input type='text' placeholder='Player 1' class='player-name-inputs p1'>
      <input type='text' placeholder='Player 2' class='player-name-inputs p2'>
      <input type='text' placeholder='Player 3' class='player-name-inputs p3'>
      <button id='start-game-btn' class='player-name-inputs'>Start Game!</button>
    </form>
  </section>`)

  $('#start-game-btn').click(function(event) {
    event.preventDefault();
    $('#js-player1-name').text($('.p1').val());
    $('#js-player2-name').text($('.p2').val());
    $('#js-player3-name').text($('.p3').val());

    $('.pre-game-form').fadeOut();
    $('.main-letters').show();
    $('#deathstar').show();
    $('.turn-controls').fadeIn();
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
    game.round.wheel.spin()
    let spinValue =  game.round.wheel.spinValue
    $('.death-star-container').append(`<h3 class='spin-value'>${spinValue}</h1>`)
  })
  
  $('.main-letters').click(function(event) { 
    let playerGuess = $(event.target).text()
    if(game.round.guessLetter(playerGuess) > 0 ) {
      $('.'+playerGuess).show()
    }
  })

  

  $('.guess-word').click(function() {
    let wordValue = $('.guess-word-input').val()
    game.round.guessAnswer(wordValue)
    game.turn.guessAnswer(wordValue) ?  $('.puzzle-letters').children().show() : $('.guess-word-input').val("")
  })

  displayPuzzle()
  console.log(game.round.returnCurrentAnswer())

});
