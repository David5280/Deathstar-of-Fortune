// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
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



console.log('This is the JavaScript entry file - your code begins here.');


let player1 = new Player('Him', 1)
let player2 = new Player('Her', 2)
let player3 = new Player('Mantis', 3)
let game = new Game([player1, player2, player3])
game.makeSelectedPuzzle(testData)
console.log()
game.start()
// console.log(game.start())
console.log(round)