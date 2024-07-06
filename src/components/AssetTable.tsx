// src/components/AssetTable.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { initializeAssets, updateAsset } from '../store/assetsSlice';
import useWebSocket from '../hooks/useWebSocket';
import AssetRow from './AssetRow';
import AssetHeader from './AssetHeader';
import '../style/AssetTable.css';

const AssetTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector((state: RootState) => state.assets.assets);
  const data = useWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

  useEffect(() => {
    dispatch(initializeAssets());
  }, [dispatch]);

  useEffect(() => {
    if (assets.length > 0) {
      data.forEach((asset) => {
        dispatch(updateAsset(asset));
      });
    }
  }, [data, dispatch, assets.length]);

  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <AssetHeader />
          <div className="bg-white">
            {assets.filter(asset => parseFloat(asset.c) !== 0 && parseFloat(asset.q) !== 0).map((asset) => (
              <AssetRow key={asset.s} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
