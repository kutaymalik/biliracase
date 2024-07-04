import { useState, useEffect } from 'react';
import { Asset } from '../types/Asset';

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Asset[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const parsedData: Asset[] = JSON.parse(event.data);
      setData(parsedData);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
