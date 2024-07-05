import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { initializeAssets, updateAsset, addErrorIcon } from '../store/assetsSlice';
import useWebSocket from '../hooks/useWebSocket';
import { Asset } from '../types/Asset';
import './style/AssetTable.css';

const AssetTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector((state: RootState) => state.assets.assets);
  const iconMap = useSelector((state: RootState) => state.assets.iconMap);
  const errorIcons = useSelector((state: RootState) => state.assets.errorIcons);
  const symbolMap = useSelector((state: RootState) => state.assets.symbolMap);
  const nameMap = useSelector((state: RootState) => state.assets.nameMap); // Coin isimlerini eklemek için
  const data = useWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

  useEffect(() => {
    dispatch(initializeAssets());
  }, [dispatch]);

  useEffect(() => {
    if (assets.length > 0) {
      data.forEach((asset: Asset) => {
        dispatch(updateAsset(asset));
      });
    }
  }, [data, dispatch, assets.length]);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h Change
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h Sparkline
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.filter(asset => parseFloat(asset.c) !== 0 && parseFloat(asset.q) !== 0).map((asset) => (
              <tr key={asset.s} className={asset.priceChanged ? 'flash' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <img
                      src={iconMap[asset.s] || 'default-icon.png'}
                      alt={asset.s}
                      className="inline-block w-6 h-6 mr-2"
                      onError={(e) => {
                        if (!errorIcons.includes(asset.s)) {
                          e.currentTarget.src = 'default-icon.png';
                          e.currentTarget.alt = 'default-icon';
                          dispatch(addErrorIcon(asset.s));
                        }
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        {symbolMap[asset.s] || asset.s}
                      </div>
                      <div className="text-xs text-gray-500">
                        {nameMap[asset.s] || asset.s.replace('USDT', '')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm price ${parseFloat(asset.p) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.c}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm value text-gray-500">
                  {asset.q}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm change ${parseFloat(asset.P) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.P}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.klineData && (
                    <Sparkline data={asset.klineData} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Sparkline = ({ data }: { data: number[] }) => {
  const width = 100;
  const height = 20;
  const strokeWidth = 1;

  const min = Math.min(...data);
  const max = Math.max(...data);

  const xScale = (value: number) => (value / (data.length - 1)) * width;
  const yScale = (value: number) => height - ((value - min) / (max - min)) * height;

  const linePath = data.map((d, i) => [xScale(i), yScale(d)].join(',')).join(' L ');

  const color = data[data.length - 1] > data[0] ? 'green' : data[data.length - 1] < data[0] ? 'red' : 'black';

  return (
    <svg width={width} height={height}>
      <path d={`M ${linePath}`} fill="none" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default AssetTable;
