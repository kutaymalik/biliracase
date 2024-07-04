import { useEffect, useState } from 'react';
import { fetchAssets } from '../api/binance';

const useLiveData = (interval: number) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const assets = await fetchAssets();
      setData(assets);
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return data;
};

export default useLiveData;
