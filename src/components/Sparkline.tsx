// src/components/Sparkline.tsx
import React from 'react';

const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const width = 80;
  const height = 30;
  const strokeWidth = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);

  const xScale = (value: number) => (value / (data.length - 1)) * width;
  const yScale = (value: number) => height - ((value - min) / (max - min)) * height;

  const linePath = data.map((d, i) => [xScale(i), yScale(d)].join(',')).join(' L ');

  const color = data[data.length - 1] > data[0] ? 'green' : data[data.length - 1] < data[0] ? 'red' : 'black';

  return (
    <svg width={width} height={height} style={{ display: 'block', marginLeft: 'auto', paddingRight: '10px' }}>
      <path d={`M ${linePath}`} fill="none" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default Sparkline;
