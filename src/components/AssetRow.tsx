import React, { useEffect, useRef } from 'react';
import { Asset } from '../types/Asset';

interface AssetRowProps {
  asset: Asset;
  iconSrc: string;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset, iconSrc }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && !img.src.includes(iconSrc)) {
      img.src = iconSrc;
    }
  }, [iconSrc]);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {/* <img 
          ref={imgRef}
          src={iconSrc}
          alt={asset.s}
          className="inline-block w-6 h-6 mr-2"
          onError={(e) => {
            e.currentTarget.src = 'default-icon.png';  // Varsayılan ikonun yolunu buraya yazın
            e.currentTarget.alt = 'default-icon';
          }}
        /> */}
        {asset.s.replace(/USDT|BTC|BNB|ETH/g, '')}
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
        {/* Add your sparkline component here */}
      </td>
    </tr>
  );
};

export default React.memo(AssetRow);
