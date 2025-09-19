const API_KEY = '4981616436fa40c48c553349791ca2b3'; // Make sure your API key is here

const FOREX_AND_CRYPTO_SYMBOLS = ['XAU/USD', 'XAG/USD', 'EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/INR', 'AUD/USD', 'USOIL', 'USTEC', 'BTC/USD', 'ETH/USD'];
const INDIAN_STOCK_SYMBOLS = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'IREDA', 'HINDCOPPER', 'PHARMABEES', 'BAJFINANCE', 'ITC', 'LT', 'HCLTECH', 'NTPC'];

async function fetchStockData(symbol) {
    const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data for ${symbol}: ${response.statusText}`);
        }
        const data = await response.json();

        // Check for common API errors
        if (data.status === 'error' || data.price === undefined) {
            console.error(`API Error for ${symbol}:`, data.message);
            return {
                price: 'N/A',
                change: 'N/A',
                percent_change: 'N/A',
                status: 'error'
            };
        }

        const price = parseFloat(data.close);
        const change = parseFloat(data.change);
        const percentChange = parseFloat(data.percent_change);

        if (isNaN(price) || isNaN(change) || isNaN(percentChange)) {
            return {
                price: 'N/A',
                change: 'N/A',
                percent_change: 'N/A',
                status: 'NaN'
            };
        }

        return {
            price: price.toFixed(3), // 3 decimal places
            change: change.toFixed(2), // 2 decimal places for change value
            percent_change: percentChange.toFixed(2), // 2 decimal places for percentage
            status: 'ok'
        };

    } catch (error) {
        console.error(error);
        return {
            price: 'N/A',
            change: 'N/A',
            percent_change: 'N/A',
            status: 'error'
        };
    }
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
        const data = await fetchStockData(symbol);
        
        if (data.status !== 'ok') {
            // Handle error case to prevent NaN
            const errorItem = document.createElement('div');
            errorItem.classList.add('ticker-item');
            errorItem.innerHTML = `<span class="symbol">${symbol}</span> <span class="price">N/A</span>`;
            tickerSection.appendChild(errorItem);
            continue;
        }

        const tickerItem = document.createElement('div');
        tickerItem.classList.add('ticker-item');
        
        // Determine color based on real trend
        const changeClass = data.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = data.change >= 0 ? '▲' : '▼';
        
        tickerItem.innerHTML = `
            <span class="symbol">${symbol}</span>
            <span class="price ${changeClass}">${data.price}</span>
            <span class="change-value ${changeClass}">${changeSymbol} ${data.change} (${data.percent_change}%)</span>
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
