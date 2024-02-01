import { stocksArray } from './stocksArray.js';

const marketVol = 0.1;
const annualRiskFreeRate = 1.025;
let randomizer;

class Stock {
    constructor(name, ticker, industry, marketCap, sharePrice, beta) {
        this.name = name;
        this.ticker = ticker;
        this.industry = industry;
        this.marketCap = marketCap;
        this.sharePrice = sharePrice; 
        this.beta = beta;
        this.initialPrice = this.sharePrice;
        this.currentPrice = this.initialPrice;
        this.previousPrice = this.initialPrice; 
    }

    updateStockPrice() {
        this.previousPrice = this.currentPrice;

        const adjustedRandomizer = 1 + (randomizer - 1) * this.beta;
        this.currentPrice = this.previousPrice * annualRiskFreeRate * adjustedRandomizer;
    }

    calculateTotalPerformance() {
        const totalPerformance = ((this.currentPrice - this.initialPrice) / this.initialPrice) * 100;
        return totalPerformance.toFixed(2) + '%';
    }

    calculatePeriodPerformance() {
        const periodPerformance = ((this.currentPrice - this.previousPrice) / this.previousPrice) * 100;
        return periodPerformance.toFixed(2) + '%';
    }

    getNumericMarketCap() {
        const multiplier = this.marketCap.endsWith('B') ? 1e9 : (this.marketCap.endsWith('M') ? 1e6 : 1);
        return parseFloat(this.marketCap) * multiplier;
    }
}

const allStocks = stocksArray.map(stock => {
    return new Stock(stock.name, stock.ticker, stock.industry, stock.marketCap, stock.sharePrice, stock.beta);
});

const stockDropdown = document.getElementById('stockDropdown');
const stockDetailsTable = document.getElementById('stockDetailsTable');
const stockPerformanceTable = document.getElementById('stockPerformanceTable');
const buyStockBtn = document.getElementById('buyStockBtn');
const playBtn = document.getElementById('playBtn');

let selectedStock = null;
let playCount = 2023; 



function populateDropdown() {
    allStocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock.ticker;
        option.textContent = `${stock.name} (${stock.ticker})`;
        stockDropdown.appendChild(option);
    });
}

function displayStockDetails(ticker) {
    const stock = allStocks.find(s => s.ticker === ticker);
    if (stock) {
        while (stockDetailsTable.rows.length > 1) {
            stockDetailsTable.deleteRow(1);
        }

        const row = stockDetailsTable.insertRow();
        row.insertCell().textContent = stock.name;
        row.insertCell().textContent = stock.ticker;
        row.insertCell().textContent = stock.industry;
        row.insertCell().textContent = stock.marketCap;
        row.insertCell().textContent = stock.sharePrice;
        row.insertCell().textContent = stock.beta;
        buyStockBtn.style.display = 'block';
    }
}

function buyStock() {
    selectedStock = allStocks.find(s => s.ticker === stockDropdown.value);
    if (selectedStock) {
        playBtn.style.display = 'block';
        document.getElementById("initialPrice").textContent = "$" + selectedStock.initialPrice.toFixed(2);
        document.getElementById("currentPrice").textContent = "$" + selectedStock.currentPrice.toFixed(2);
        document.getElementById("totalPerformance").textContent = selectedStock.calculateTotalPerformance();
        document.getElementById("periodPerformance").textContent = selectedStock.calculatePeriodPerformance();
    }
}

function generateMarketRandomizer() {
    let sum = 0;
    const numberOfRandomVars = 6;

    for (let i = 0; i < numberOfRandomVars; i++) {
        sum += Math.random();
    }

    randomizer = 1 + ((sum / numberOfRandomVars) - 0.5) * (marketVol * 2);
}


function updateAllStockPrices() {
    generateMarketRandomizer(); 
    allStocks.forEach(stock => stock.updateStockPrice());
}

function calculateAverageMarketPerformance() {
    let totalPerformance = 0;
    let totalMarketCap = 0;

    allStocks.forEach(stock => {
        const marketCap = stock.getNumericMarketCap();
        const performance = parseFloat(stock.calculateTotalPerformance());
        totalPerformance += performance * marketCap;
        totalMarketCap += marketCap;
    });

    return (totalMarketCap > 0) ? (totalPerformance / totalMarketCap) : 0;
}

function updatePerformanceTable() {
    while (stockPerformanceTable.rows.length > 1) {
        stockPerformanceTable.deleteRow(1);
    }

    allStocks.forEach(stock => {
        const row = stockPerformanceTable.insertRow();
        row.insertCell().textContent = stock.name;
        row.insertCell().textContent = "$" + stock.initialPrice.toFixed(2);
        row.insertCell().textContent = "$" + stock.currentPrice.toFixed(2);
        row.insertCell().textContent = stock.calculatePeriodPerformance();
        row.insertCell().textContent = stock.calculateTotalPerformance();
    });

    const averagePerformance = calculateAverageMarketPerformance();
    document.getElementById("averageMarketPerformance").textContent = averagePerformance.toFixed(2) + '%';
}


function playGame() {
    updateAllStockPrices(); 

    if (selectedStock) {
        document.getElementById("currentPrice").textContent = "$" + selectedStock.currentPrice.toFixed(2);
        document.getElementById("totalPerformance").textContent = selectedStock.calculateTotalPerformance();
        document.getElementById("periodPerformance").textContent = selectedStock.calculatePeriodPerformance();
    }

    updatePerformanceTable(); 

    playCount++;
    document.getElementById("playCount").textContent = playCount;
}

stockDropdown.addEventListener('change', () => {
    displayStockDetails(stockDropdown.value);
});

buyStockBtn.addEventListener('click', buyStock);
playBtn.addEventListener('click', playGame);

populateDropdown()