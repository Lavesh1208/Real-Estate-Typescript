import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/userApi';
import userReducer from './reducers/userReducer';
import { persistReducer, persistStore } from 'redux-persist';
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
   middleware: (getDefault) => getDefault().concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
