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

  $('.middle-section').append(`
    <section class='pre-game-form'>
    <form class='player-names'>
      <input type='text' placeholder='Player 1' class='player-name-inputs'>
      <input type='text' placeholder='Player 2' class='player-name-inputs'>
      <input type='text' placeholder='Player 3' class='player-name-inputs'>
      <button id='start-game-btn' class='player-name-inputs'>Start Game!</button>
    </form>
  </section>`)

  $('#start-game-btn').click(function(event) {
    event.preventDefault();
    $('.pre-game-form').fadeOut();
    $('.main-letters').show();
    $('#deathstar').show();
  });

  $('.category-hint').append(`<h4>${currentCategory}:</h4><p> ${currentDescription} <p>`);

  function displayPuzzle() {
    let gameBoardPuzzle = game.round.returnCurrentAnswer()
    gameBoardPuzzle.map(letter => {
      if (letter !== " ") {
        $('.puzzle-container').append(`<li class ="puzzle-letters ${letter}">${letter}</li>`)
        $('.puzzle-letters').css('color', 'white')
      }
    }) 
  }
  
  $('.main-letters').click(function(event) { 
    let playerGuess = $(event.target).text()
    if(game.round.guessLetter(playerGuess) > 0 ) {
      console.log('working')
      console.log(game.round.guessLetter(playerGuess))
      $('.'+playerGuess).css('color', "black")
    }
  })











  // $('.category-hint').append();
  
  //   <section class='pre-game-form'>
  //   <form class='player-names'>
  //     <input type='text' placeholder='Player 1' class='player-name-inputs'>
  //     <input type='text' placeholder='Player 2' class='player-name-inputs'>
  //     <input type='text' placeholder='Player 3' class='player-name-inputs'>
  //   </form>
  // </section>

  displayPuzzle()

});
