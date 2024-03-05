import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { characterApi } from './api/character';
import { episodeApi } from './api/episode';
import { locationApi } from './api/location';

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    [episodeApi.reducerPath]: episodeApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      characterApi.middleware,
      episodeApi.middleware,
      locationApi.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
