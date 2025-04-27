// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from './reducers/lessonReducer';
import iapReducer from './reducers/iapReducer'; // You'll need to create this

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    iap: iapReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;