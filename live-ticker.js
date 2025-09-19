const API_KEY = '4981616436fa40c48c553349791ca2b3'; // Make sure your API key is here

const ALL_SYMBOLS = [
    // Indian Stocks & ETFs
    'NIFTYBEES', // Symbol for Nippon India Nifty 50 ETF
    'NIFTY',
    'SENSEX',
    'INFY', // Infosys Ltd.
    'ITC', // ITC Ltd.
    'BANKNIFTY',
    'RELIANCE', // Reliance Industries Ltd.
    'HDFCBANK' // HDFC Bank Ltd.
];

async function fetchAllData() {
    const promises = ALL_SYMBOLS.map(symbol => {
        const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error' || data.close === undefined) {
                    console.error(`API Error for ${symbol}:`, data.message);
                    return { symbol: symbol, price: '0.00', change: '0.00', percent_change: '0.00' };
                }

                const price = parseFloat(data.close);
                const change = parseFloat(data.change);
                const percentChange = parseFloat(data.percent_change);

                if (isNaN(price) || isNaN(change) || isNaN(percentChange)) {
                    return { symbol: symbol, price: '0.00', change: '0.00', percent_change: '0.00' };
                }

                return {
                    symbol: symbol,
                    price: price.toFixed(3),
                    change: change.toFixed(2),
                    percent_change: percentChange.toFixed(2)
                };
            })
            .catch(error => {
                console.error(`Fetch error for ${symbol}:`, error);
                return { symbol: symbol, price: '0.00', change: '0.00', percent_change: '0.00' };
            });
    });

    return Promise.all(promises);
}

async function updateTicker() {
    const tickerContainer = document.getElementById('live-ticker-container');
    if (!tickerContainer) return;
    
    tickerContainer.innerHTML = '';

    const allData = await fetchAllData();

    allData.forEach(item => {
        const tickerItem = document.createElement('div');
        tickerItem.classList.add('ticker-item');
        
        const changeClass = parseFloat(item.change) >= 0 ? 'positive' : 'negative';
        const changeArrow = parseFloat(item.change) >= 0 ? '▲' : '▼';
        const changeSign = parseFloat(item.change) >= 0 ? '+' : '';
        
        tickerItem.innerHTML = `
            <span class="symbol">${item.symbol}</span>
            <span class="price ${changeClass}">${item.price}</span>
            <span class="change-value ${changeClass}">${changeArrow} ${changeSign}${item.percent_change}%</span>
        `;
        tickerContainer.appendChild(tickerItem);
    });
}

// Initial update and set interval
updateTicker();
setInterval(updateTicker, 60000); // Update every 60 seconds (1 minute)
