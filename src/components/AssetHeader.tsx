// src/components/AssetHeader.tsx
import React from 'react';

const AssetHeader: React.FC = () => {
  return (
    <div className="bg-gray-200 mx-0">
      <div className="flex py-1">
        <div className="flex-1 py-2 text-left text-xs font-medium text-gray-500 tracking-wider ml-9">
          Crypto
        </div>
        <div className="flex-1 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">
          Price
        </div>
        <div className="flex-1 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">
          Market Value
        </div>
        <div className="flex-1 py-2 text-right text-xs font-medium text-gray-500 tracking-wider">
          24h Change
        </div>
        <div className="flex-1 py-2 text-right text-xs font-medium text-gray-500 tracking-wider" style={{ marginRight: '10px' }}>
        </div>
      </div>
    </div>
  );
};

export default AssetHeader;
