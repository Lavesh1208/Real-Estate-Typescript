import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/userApi';
import userReducer from './reducers/userReducer';

export const store = configureStore({
   reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
   },
   middleware: (getDefault) => getDefault().concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
