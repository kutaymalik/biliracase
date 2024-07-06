import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Asset } from '../types/Asset';
import { addErrorIcon } from '../store/assetsSlice';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import Sparkline from './Sparkline';

const AssetRow: React.FC<{ asset: Asset }> = ({ asset }) => {
  const dispatch = useDispatch<AppDispatch>();
  const iconMap = useSelector((state: RootState) => state.assets.iconMap);
  const errorIcons = useSelector((state: RootState) => state.assets.errorIcons);
  const symbolMap = useSelector((state: RootState) => state.assets.symbolMap);
  const nameMap = useSelector((state: RootState) => state.assets.nameMap);
  const stepSizeMap = useSelector((state: RootState) => state.assets.stepSizeMap);

  const formatPrice = (price: string, stepSize: string) => {
    const decimalPlaces = stepSize.indexOf('1') - 1;
    return decimalPlaces >= 0 ? parseFloat(price).toFixed(decimalPlaces) : parseFloat(price).toFixed(2);
  };

  return (
    <div className={`flex py-1 ${asset.priceChanged ? 'flash' : ''}`}>
      <div className="flex-1 px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
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
      </div>
      <div className="flex-1 px-1 py-1 whitespace-nowrap text-sm price text-right">
        <span className="font-bold text-black">{formatPrice(asset.c, stepSizeMap[asset.s])}</span> <span className="text-gray-500 text-xs">{asset.quoteAsset}</span>
      </div>
      <div className="flex-1 px-1 py-1 whitespace-nowrap text-sm value text-gray-500 text-right">
        <span className="font-bold text-black">{parseFloat(asset.q).toFixed(2)}</span> <span className="text-gray-500 text-xs">{asset.quoteAsset}</span>
      </div>
      <div className={`flex-1 px-1 py-1 whitespace-nowrap text-sm change text-right ${parseFloat(asset.P) > 0 ? 'text-green-500' : parseFloat(asset.P) < 0 ? 'text-red-500' : 'text-black'}`}>
        <span className="font-bold">{parseFloat(asset.P).toFixed(2)}%</span> {parseFloat(asset.P) > 0 ? <NorthEastIcon style={{ fontSize: '20px' }} /> : parseFloat(asset.P) < 0 ? <SouthWestIcon style={{ fontSize: '16px' }} /> : ''}
      </div>
      <div className="flex-1 px-1 py-1 mr-5 whitespace-nowrap text-sm text-gray-500 font-bold text-right sparkline-cell">
        {asset.klineData && <Sparkline data={asset.klineData} />}
      </div>
    </div>
  );
};

export default AssetRow;
