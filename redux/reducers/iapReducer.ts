// redux/reducers/iapReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IapState {
  isPremium: boolean;
  boughtNoAdsTime: string | null;
}

const initialState: IapState = {
  isPremium: false,
  boughtNoAdsTime: null,
};

const iapSlice = createSlice({
  name: 'iap',
  initialState,
  reducers: {
    setPremium: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },
    setBoughtNoAdsTime: (state, action: PayloadAction<string | null>) => {
      state.boughtNoAdsTime = action.payload;
    },
  }
});

export const { setPremium, setBoughtNoAdsTime } = iapSlice.actions;
export default iapSlice.reducer;