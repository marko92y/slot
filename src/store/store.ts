import { configureStore } from '@reduxjs/toolkit';

import potReducer from './potReducer'

export const store = configureStore({
  reducer: {
    pot: potReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

