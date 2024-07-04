import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store'; 
import { fetchCoinGeckoData } from '../api/coingecko';

interface Asset {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
  image: string; // Include image property
}

interface AssetsState {
  assets: Asset[];
  iconMap: { [key: string]: string };
  errorIcons: string[];
}

const initialState: AssetsState = {
  assets: [],
  iconMap: JSON.parse(localStorage.getItem('iconMap') || '{}'),
  errorIcons: [],
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setInitialAssets(state, action: PayloadAction<Asset[]>) {
      const sortedAssets = action.payload.sort((a, b) => a.name.localeCompare(b.name));
      state.assets = sortedAssets;
      state.iconMap = sortedAssets.reduce((map, asset) => {
        map[asset.id] = asset.image; // Use image URL from CoinGecko
        return map;
      }, {} as { [key: string]: string });
      localStorage.setItem('iconMap', JSON.stringify(state.iconMap));
    },
    updateAsset(state, action: PayloadAction<Asset>) {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...action.payload };
      }
    },
    addErrorIcon(state, action: PayloadAction<string>) {
      if (!state.errorIcons.includes(action.payload)) {
        state.errorIcons.push(action.payload);
      }
    },
  },
});

export const { setInitialAssets, updateAsset, addErrorIcon } = assetsSlice.actions;
export default assetsSlice.reducer;

export const initializeAssets = () => async (dispatch: AppDispatch) => {
  try {
    const coinData = await fetchCoinGeckoData();
    const filteredAssets = coinData.filter((asset: Asset) => asset.current_price > 0 && asset.market_cap > 0);
    dispatch(setInitialAssets(filteredAssets));
  } catch (error) {
    console.error('Error initializing assets', error);
  }
};
