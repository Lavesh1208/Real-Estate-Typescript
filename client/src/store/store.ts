import { Store, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/authApi';
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
   auth: authApi.reducer,
   userApi: userApi.reducer,
});

const persistConfig = {
   key: 'root',
   storage,
   version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store = configureStore({
   reducer: persistedReducer,
   //@ts-ignore
   middleware: (getDefault) =>
      getDefault({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat([authApi.middleware, userApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
