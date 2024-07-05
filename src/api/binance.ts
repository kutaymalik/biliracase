import axios from 'axios';

const API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const EXCHANGE_INFO_URL = 'https://api.binance.com/api/v3/exchangeInfo';
const KLINE_URL = 'https://api.binance.com/api/v3/klines';

export const fetchExchangeInfo = async () => {
  try {
    const response = await axios.get(EXCHANGE_INFO_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange info', error);
    throw error;
  }
};

export const fetchAssets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching assets', error);
    throw error;
  }
};

export const fetchKlineData = async (symbol: string) => {
  try {
    const response = await axios.get(KLINE_URL, {
      params: {
        symbol,
        interval: '1h', // You can change the interval based on your requirement
        limit: 24, // Fetching the last 24 hours of data
      },
    });
    return response.data.map((kline: any) => parseFloat(kline[4])); // Extracting the closing prices
  } catch (error) {
    console.error('Error fetching kline data', error);
    throw error;
  }
};


