import { gameState } from './gameState.js';
import { updatePerformanceTable, updateSelectedStockUI } from './handlers.js';

function playGame() {
    if(document.getElementById('pickWinner').textContent){return}
    gameState.updateAllStockPrices();
    if (gameState.selectedStock) {
        updateSelectedStockUI(gameState.selectedStock);
    }

    updatePerformanceTable();

    gameState.startQ++;
    if (gameState.startQ > 4) {
        gameState.startQ = 1;
        gameState.startY++;
    }
    document.getElementById("playCount").textContent = gameState.playCount;
    document.getElementById('rstBtn').style.display = 'block';

    if (gameState.startY >= 2030) {
        pickWinner();
    }
}

function pickWinner() {
    const mrMktPerf = gameState.calcMrMktPerf();
    const playerPerf = gameState.selectedStock.calculateTotalPerformance();
    let bannerText;

    if (parseFloat(mrMktPerf) > parseFloat(playerPerf)) {
        bannerText = 'Mr. Market wins!';
        gameState.mrMktWins += 1;
    } else if (parseFloat(mrMktPerf) === parseFloat(playerPerf)) {
        bannerText = 'It\'s a tie! (Next time just buy an ETF.)';
    } else {
        bannerText = 'You beat Mr. Market. You\'re a stock-picking pro!';
        gameState.playerWins += 1;
    }

    document.getElementById('pickWinner').textContent = bannerText;
    document.getElementById('mrMktScore').textContent = gameState.mrMktWins;
    document.getElementById('playerScore').textContent = gameState.playerWins;
}


export { playGame, pickWinner };
