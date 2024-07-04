import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const fetchCoinGeckoData = async () => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true, // Ensure sparkline data is fetched
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching CoinGecko data', error);
    throw error;
  }
};
