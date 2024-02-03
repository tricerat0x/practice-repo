import { gameState } from './gameState.js';
import { setupUI } from './handlers.js';
import { playGame } from './gameLogic.js';

function startGame() {
    gameState.initialize(); 
    setupUI(); 

    document.getElementById('playBtn').addEventListener('click', playGame);

}

document.addEventListener('DOMContentLoaded', startGame);
