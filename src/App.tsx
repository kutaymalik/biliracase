// src/App.tsx
import React from 'react';
import AssetTable from './components/AssetTable';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <AssetTable />
    </div>
  );
};

export default App;
