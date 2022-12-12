import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    PersistConfig,
} from 'redux-persist';

import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';

import authSlice from './reducers/authSlice';
import imeiSlice from './reducers/imeiSlice';

export type NvRootState = ReturnType<typeof reducers>;

const persistorConfig: PersistConfig<NvRootState> = {
    key: 'root/NvMobile',
    storage: AsyncStorage,
    writeFailHandler: (error) => {
        console.log('ERRO PERSIST\n' + error);
    },
    debug: true,
    // blacklist: [''],
};

const reducers = combineReducers({
    auth: authSlice.reducer,
    imei: imeiSlice.reducer,
});

const persistedReducer = persistReducer(persistorConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store, {}, () => {
    console.log('PERSISTING...');
});

export { store, persistor };
