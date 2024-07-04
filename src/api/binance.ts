import axios from 'axios';

const API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const EXCHANGE_INFO_URL = 'https://api.binance.com/api/v3/exchangeInfo';

export const fetchAssets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching assets', error);
    throw error;
  }
};

export const fetchExchangeInfo = async () => {
  try {
    const response = await axios.get(EXCHANGE_INFO_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange info', error);
    throw error;
  }
};
