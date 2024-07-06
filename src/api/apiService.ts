import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const EXCHANGE_INFO_URL = process.env.REACT_APP_EXCHANGE_INFO_URL;
const KLINE_URL = process.env.REACT_APP_KLINE_URL;

if (!API_URL || !EXCHANGE_INFO_URL || !KLINE_URL) {
  throw new Error("API URLs are not defined in the environment variables");
}

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
  const cacheKey = `klineData_${symbol}`;
  const cachedData = localStorage.getItem(cacheKey);
  const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
  
  if (cachedData && cacheTimestamp) {
    const age = Date.now() - parseInt(cacheTimestamp, 10);
    if (age < 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
      return JSON.parse(cachedData);
    }
  }

  try {
    const response = await axios.get(KLINE_URL, {
      params: {
        symbol,
        interval: '1h',
        limit: 24,
      },
    });

    const klineData = response.data.map((kline: any) => parseFloat(kline[4]));
    localStorage.setItem(cacheKey, JSON.stringify(klineData));
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

    return klineData;
  } catch (error) {
    console.error('Error fetching kline data', error);
    throw error;
  }
};
