const API_KEY = '4981616436fa40c48c553349791ca2b3'; // Make sure your API key is here

const FOREX_AND_CRYPTO_SYMBOLS = ['XAU/USD', 'XAG/USD', 'EUR/USD', 'USD/JPY', 'GBP/USD', 'INR/USD', 'AUD/USD', 'USOIL', 'USTEC', 'BTC/USD', 'ETH/USD'];
const INDIAN_STOCK_SYMBOLS = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'IREDA', 'HINDCOPPER', 'PHARMABEES', 'BAJFINANCE', 'ITC', 'LT', 'HCLTECH', 'NTPC'];

async function fetchStockData(symbol) {
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data for ${symbol}: ${response.statusText}`);
        }
        const data = await response.json();
        const price = parseFloat(data.price);
        if (isNaN(price)) {
            return 'N/A';
        }
        return price.toFixed(3); // 3 decimal places
    } catch (error) {
        console.error(error);
        return 'N/A'; // Return 'N/A' on error or invalid data
    }
}

function getRandomColorClass() {
    // Generates a random class to simulate positive or negative trends
    return Math.random() > 0.5 ? 'positive' : 'negative';
}

async function updateTicker(containerId, symbols) {
    const tickerSection = document.getElementById(containerId);
    if (!tickerSection) {
        console.error(`Ticker section with ID '${containerId}' not found.`);
        return;
    }
    tickerSection.innerHTML = '';

    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const price = await fetchStockData(symbol);
        
        const tickerItem = document.createElement('div');
        tickerItem.classList.add('ticker-item');
        
        // Apply color class for price trend
        const priceColorClass = getRandomColorClass();
        
        tickerItem.innerHTML = `
            <span class="symbol">${symbol}</span>
            <span class="price ${priceColorClass}">${price}</span>
        `;
        tickerSection.appendChild(tickerItem);
    }
}

// Update the two different tickers separately
updateTicker('forex-crypto-ticker', FOREX_AND_CRYPTO_SYMBOLS);
updateTicker('indian-stocks-ticker', INDIAN_STOCK_SYMBOLS);

// Set interval for updates
setInterval(() => {
    updateTicker('forex-crypto-ticker', FOREX_AND_CRYPTO_SYMBOLS);
    updateTicker('indian-stocks-ticker', INDIAN_STOCK_SYMBOLS);
}, 60000); // Update every 60 seconds (1 minute)
