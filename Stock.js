import { getRandomPercentage } from './utilities.js';
import { gameState } from './gameState.js';

class Stock {
    constructor({ name, ticker, industry, marketCap, sharePrice, beta }) {
        this.name = name;
        this.ticker = ticker;
        this.industry = industry;
        this.marketCap = marketCap;
        this.sharePrice = sharePrice;
        this.beta = beta;
        this.initialPrice = sharePrice;
        this.currentPrice = sharePrice;
        this.previousPrice = sharePrice;
    }

    updateStockPrice() {
        const randomizer = getRandomPercentage(-5, 5);
        const volatilityEffect = 1 + (gameState.mktVol / 100 * this.beta);
        const randomEffect = 1 + (randomizer / 100);
        this.previousPrice = this.currentPrice;
        this.currentPrice *= volatilityEffect * randomEffect;
    }

    calculateTotalPerformance() {
        return ((this.currentPrice - this.initialPrice) / this.initialPrice * 100).toFixed(2);
    }

    calculatePeriodPerformance() {
        return ((this.currentPrice - this.previousPrice) / this.previousPrice * 100).toFixed(2);
    }
}

export { Stock }









