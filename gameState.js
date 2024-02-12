import { stocksArray } from './stocksArray.js';
import { Stock } from './Stock.js';
import { getRandomPercentage, resetTable } from './utilities.js';

const gameState = {
    annualRFR: 1.075,
    mktVol: null,
    selectedStock: null,
    startQ: 1,
    startY: 2024,
    allStocks: [],
    mrMktWins: 0,
    playerWins: 0,
    
    get playCount() {
        return `Q${this.startQ}, ${this.startY}`;
    },

    updateMarketVolatility() {
        const quarterlyRFR = 1 + (this.annualRFR - 1) / 4;
        this.mktVol = quarterlyRFR + getRandomPercentage(-5, 5);
    },

    updateAllStockPrices() {
        this.updateMarketVolatility();
        this.allStocks.forEach(stock => stock.updateStockPrice());
    },

    calcMrMktPerf() {
        let totalPerformance = 0;
        let totalMarketCap = 0;
        this.allStocks.forEach(stock => {
            const marketCap = parseInt(stock.marketCap, 10);
            const performance = parseFloat(stock.calculateTotalPerformance());
            totalPerformance += performance * marketCap;
            totalMarketCap += marketCap;
        });
        return totalMarketCap > 0 ? (totalPerformance / totalMarketCap).toFixed(2) : '0.00';
    },

    initialize() {
        this.updateMarketVolatility();
        console.log("Market volatility updated:", this.mktVol);
        this.allStocks = stocksArray.map(stockData => new Stock(stockData));
        console.log("All stocks populated:", this.allStocks);
    },    
    reset() {
        this.selectedStock = null;
        this.startQ = 1;
        this.startY = 2024;
        document.getElementById("initialPrice").textContent = "";
        document.getElementById("currentPrice").textContent = "";
        document.getElementById("totalPerformance").textContent = "";
        document.getElementById("periodPerformance").textContent = "";
        document.getElementById("playCount").textContent = '';
        document.getElementById('buyStockBtn').style.display = 'none';
        document.getElementById('playBtn').style.display = 'none';
        resetTable('stockDetailsTable');
        resetTable('stockPerformanceTable');
        document.getElementById("averageMarketPerformance").textContent = "";
        document.getElementById('rstBtn').style.display = 'none';
        document.getElementById('pickWinner').textContent = '';
    }
};

export { gameState };
