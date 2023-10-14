import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/userApi';

export const store = configureStore({
   reducer: {
      [userApi.reducerPath]: userApi.reducer,
   },
   middleware: (getDefault) => getDefault().concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
