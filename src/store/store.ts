import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './assetsSlice';

const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
