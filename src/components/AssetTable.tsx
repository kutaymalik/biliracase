import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { initializeAssets, addErrorIcon } from '../store/assetsSlice';

const AssetTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector((state: RootState) => state.assets.assets);
  const iconMap = useSelector((state: RootState) => state.assets.iconMap);
  const errorIcons = useSelector((state: RootState) => state.assets.errorIcons);

  useEffect(() => {
    dispatch(initializeAssets());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Sparkline</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <img 
                    src={iconMap[asset.id] || 'default-icon.png'}
                    alt={asset.name}
                    className="inline-block w-6 h-6 mr-2"
                    onError={(e) => {
                      if (!errorIcons.includes(asset.id)) {
                        e.currentTarget.src = 'default-icon.png';
                        e.currentTarget.alt = 'default-icon';
                        dispatch(addErrorIcon(asset.id));
                      }
                    }}
                  />
                  {asset.name}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${asset.current_price > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${asset.current_price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${asset.market_cap.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${asset.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Sparkline data={asset.sparkline_in_7d.price} />
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

  const getColor = () => {
    const first = data[0];
    const last = data[data.length - 1];
    if (last > first) return 'green';
    if (last < first) return 'red';
    return 'black';
  };

  return (
    <svg width={width} height={height}>
      <path d={`M ${linePath}`} fill="none" stroke={getColor()} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default AssetTable;
