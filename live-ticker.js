const API_KEY = '4981616436fa40c48c553349791ca2b3'; // Make sure your API key is here

const FOREX_AND_CRYPTO_SYMBOLS = ['XAU/USD', 'XAG/USD', 'EUR/USD', 'USD/JPY', 'GBP/USD', 'INR/USD', 'AUD/USD', 'USOIL', 'USTEC', 'BTC/USD', 'ETH/USD'];
const INDIAN_STOCK_SYMBOLS = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'IREDA', 'HINDCOPPER', 'PHARMABEES'];

// Combine all symbol arrays into one list for the ticker
const SYMBOLS = [...FOREX_AND_CRYPTO_SYMBOLS, ...INDIAN_STOCK_SYMBOLS];

async function fetchStockData(symbol) {
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data for ${symbol}: ${response.statusText}`);
        }
        const data = await response.json();
        return data.price;
    } catch (error) {
        console.error(error);
        return 'N/A'; // Return 'N/A' on error
    }
}

async function updateTicker() {
    const tickerSection = document.querySelector('.ticker-section');
    tickerSection.innerHTML = ''; // Clear existing ticker items

    for (let i = 0; i < SYMBOLS.length; i++) {
        const symbol = SYMBOLS[i];
        const price = await fetchStockData(symbol);
        
        const tickerItem = document.createElement('div');
        tickerItem.classList.add('ticker-item');
        
        // Add alternating animation classes
        if (i % 2 === 0) { // Even items get the 'ticker-right' animation
            tickerItem.classList.add('ticker-right');
        } else { // Odd items get the 'ticker-left' animation
            tickerItem.classList.add('ticker-left');
        }
        
        tickerItem.innerHTML = `<span class="symbol">${symbol}</span><span class="price">${parseFloat(price).toFixed(2)}</span>`;
        tickerSection.appendChild(tickerItem);
    }
}

updateTicker(); // Initial fetch
setInterval(updateTicker, 60000); // Update every 60 seconds (1 minute)
