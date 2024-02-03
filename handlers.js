import { gameState } from './gameState.js';
import { resetTable } from './utilities.js';
import { playGame } from './gameLogic.js';


function setupUI() {
    const stockDropdown = document.getElementById('stockDropdown');
    const buyStockBtn = document.getElementById('buyStockBtn');
    const playBtn = document.getElementById('playBtn');
    const rstBtn = document.getElementById('rstBtn');

    stockDropdown.addEventListener('change', () => displayStockDetails(stockDropdown.value));
    buyStockBtn.addEventListener('click', buyStock);
    playBtn.addEventListener('click', playGame);
    rstBtn.addEventListener('click', () => gameState.reset());

    populateDropdown();
}

function populateDropdown() {
    const stockDropdown = document.getElementById('stockDropdown');
    gameState.allStocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock.ticker;
        option.textContent = `${stock.name} (${stock.ticker})`;
        stockDropdown.appendChild(option);
    });
}

function displayStockDetails(ticker) {
    const stock = gameState.allStocks.find(s => s.ticker === ticker);
    const stockDetailsTable = document.getElementById('stockDetailsTable');
    if (stock) {
        resetTable('stockDetailsTable'); 

        const row = stockDetailsTable.insertRow();
        row.insertCell().textContent = stock.name;
        row.insertCell().textContent = stock.ticker;
        row.insertCell().textContent = stock.industry;
        row.insertCell().textContent = stock.marketCap;
        row.insertCell().textContent = stock.sharePrice;
        row.insertCell().textContent = stock.beta;
        document.getElementById('buyStockBtn').style.display = 'block';
    }
}


function buyStock() {
    const stockDropdown = document.getElementById('stockDropdown');
    gameState.selectedStock = gameState.allStocks.find(s => s.ticker === stockDropdown.value);
    if (gameState.selectedStock) {
        document.getElementById('playBtn').style.display = 'block';
        updateSelectedStockUI(gameState.selectedStock);
    }
}

function updateSelectedStockUI(stock) {
    document.getElementById("initialPrice").textContent = `$${stock.initialPrice.toFixed(2)}`;
    document.getElementById("currentPrice").textContent = `$${stock.currentPrice.toFixed(2)}`;
    document.getElementById("totalPerformance").textContent = `${stock.calculateTotalPerformance()}%`;
    document.getElementById("periodPerformance").textContent = `${stock.calculatePeriodPerformance()}%`;
    document.getElementById("playCount").textContent = gameState.playCount;
}

function updatePerformanceTable() {
    resetTable('stockPerformanceTable'); 
    const stockPerformanceTable = document.getElementById('stockPerformanceTable');

    gameState.allStocks.forEach(stock => {
        const row = stockPerformanceTable.insertRow();
        row.insertCell().textContent = stock.name;
        row.insertCell().textContent = `$${stock.initialPrice.toFixed(2)}`;
        row.insertCell().textContent = `$${stock.currentPrice.toFixed(2)}`;
        row.insertCell().textContent = `${stock.calculatePeriodPerformance()}%`;
        row.insertCell().textContent = `${stock.calculateTotalPerformance()}%`;
    });

    const mrMktPerf = gameState.calcMrMktPerf();
    document.getElementById("averageMarketPerformance").textContent = `${mrMktPerf}%`;
}

export { setupUI, populateDropdown, displayStockDetails, updateSelectedStockUI, updatePerformanceTable, buyStock };
