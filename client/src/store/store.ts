import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/userApi';
import userReducer from './reducers/userReducer';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
   user: userReducer,
   [userApi.reducerPath]: userApi.reducer,
});

const persistCongig = {
   key: 'root',
   storage,
   version: 1,
};

const persistedReducer = persistReducer(persistCongig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefault) =>
      getDefault({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
