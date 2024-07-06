import axios from 'axios';
import { fetchExchangeInfo, fetchAssets, fetchKlineData } from './apiService';

jest.mock('axios');

describe('API Service', () => {
  beforeAll(() => {
    process.env.REACT_APP_API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
    process.env.REACT_APP_EXCHANGE_INFO_URL = 'https://api.binance.com/api/v3/exchangeInfo';
    process.env.REACT_APP_KLINE_URL = 'https://api.binance.com/api/v3/klines';
  });

  it('fetchExchangeInfo should return data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { symbols: [] } });

    const data = await fetchExchangeInfo();
    expect(data).toEqual({ symbols: [] });
  });

  it('fetchAssets should return data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    const data = await fetchAssets();
    expect(data).toEqual([]);
  });

  it('fetchKlineData should return data', async () => {
    const klineData = [{ 4: '100' }, { 4: '200' }];
    (axios.get as jest.Mock).mockResolvedValue({ data: klineData });

    const data = await fetchKlineData('BTCUSDT');
    expect(data).toEqual([100, 200]);
  });
});
