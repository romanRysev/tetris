import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { themeSlice } from './reducers/themeSlice';
import { authSlice, leadersSlice } from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    leaders: leadersSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
