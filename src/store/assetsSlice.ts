import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { fetchExchangeInfo, fetchKlineData } from '../api/apiService';

interface Asset {
  s: string;
  c: string;
  p: string;
  q: string;
  P: string;
  klineData?: number[];
  priceChanged?: boolean;
  quoteAsset?: string;
}

interface AssetsState {
  assets: Asset[];
  iconMap: { [key: string]: string };
  errorIcons: string[];
  symbolMap: { [key: string]: string };
  nameMap: { [key: string]: string };
  stepSizeMap: { [key: string]: string };
}

const initialState: AssetsState = {
  assets: [],
  iconMap: {},
  errorIcons: [],
  symbolMap: {},
  nameMap: {},
  stepSizeMap: {},
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setInitialAssets(state, action: PayloadAction<Asset[]>) {
      state.assets = action.payload;
    },
    updateAsset(state, action: PayloadAction<Asset>) {
      const index = state.assets.findIndex(asset => asset.s === action.payload.s);
      if (index !== -1) {
        const previousPrice = parseFloat(state.assets[index].c);
        const newPrice = parseFloat(action.payload.c);
        state.assets[index] = {
          ...state.assets[index],
          ...action.payload,
          priceChanged: previousPrice !== newPrice
        };
      }
    },
    setKlineData(state, action: PayloadAction<{ symbol: string, klineData: number[] }>) {
      const index = state.assets.findIndex(asset => asset.s === action.payload.symbol);
      if (index !== -1) {
        state.assets[index].klineData = action.payload.klineData;
      }
    },
    addErrorIcon(state, action: PayloadAction<string>) {
      if (!state.errorIcons.includes(action.payload)) {
        state.errorIcons.push(action.payload);
      }
    },
    setIconMap(state, action: PayloadAction<{ [key: string]: string }>) {
      state.iconMap = action.payload;
    },
    setSymbolMap(state, action: PayloadAction<{ [key: string]: string }>) {
      state.symbolMap = action.payload;
    },
    setNameMap(state, action: PayloadAction<{ [key: string]: string }>) {
      state.nameMap = action.payload;
    },
    setStepSizeMap(state, action: PayloadAction<{ [key: string]: string }>) {
      state.stepSizeMap = action.payload;
    },
  },
});

export const {
  setInitialAssets, updateAsset, setKlineData, addErrorIcon,
  setIconMap, setSymbolMap, setNameMap, setStepSizeMap
} = assetsSlice.actions;
export default assetsSlice.reducer;

export const initializeAssets = () => async (dispatch: AppDispatch) => {
  try {
    const exchangeInfo = await fetchExchangeInfo();
    const assets = exchangeInfo.symbols.map((symbolInfo: { symbol: string, baseAsset: string, quoteAsset: string }) => ({
      s: symbolInfo.symbol,
      c: '0',
      p: '0',
      q: '0',
      P: '0',
      quoteAsset: symbolInfo.quoteAsset
    }));

    dispatch(setInitialAssets(assets));

    const symbolMap = exchangeInfo.symbols.reduce((map: { [key: string]: string }, symbolInfo: { symbol: string; baseAsset: string; quoteAsset: string }) => {
      map[symbolInfo.symbol] = `${symbolInfo.baseAsset}/${symbolInfo.quoteAsset}`;
      return map;
    }, {});
    
    const iconMap = assets.reduce((map: { [key: string]: string }, asset: Asset) => {
      const baseAsset = symbolMap[asset.s]?.split('/')[0].toLowerCase();
      if (baseAsset) {
        map[asset.s] = `https://assets.coincap.io/assets/icons/${baseAsset}@2x.png`;
      }
      return map;
    }, {});

    const nameMap = exchangeInfo.symbols.reduce((map: { [key: string]: string }, symbolInfo: { symbol: string, baseAsset: string }) => {
      map[symbolInfo.symbol] = symbolInfo.baseAsset;
      return map;
    }, {});

    const stepSizeMap = exchangeInfo.symbols.reduce((map: { [key: string]: string }, symbolInfo: { symbol: string, filters: any[] }) => {
      const priceFilter = symbolInfo.filters.find(filter => filter.filterType === 'PRICE_FILTER');
      if (priceFilter) {
        map[symbolInfo.symbol] = priceFilter.tickSize;
      }
      return map;
    }, {});

    dispatch(setIconMap(iconMap));
    dispatch(setSymbolMap(symbolMap));
    dispatch(setNameMap(nameMap));
    dispatch(setStepSizeMap(stepSizeMap));

    for (const asset of assets) {
      const klineData = await fetchKlineData(asset.s);
      dispatch(setKlineData({ symbol: asset.s, klineData }));
    }

  } catch (error) {
    console.error('Error initializing assets with icon map', error);
  }
};
