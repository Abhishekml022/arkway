import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { arkwayReducer } from './reducer';

//redux persist config

const persistConfig = {
  key: 'Arkway',
  storage: AsyncStorage,
};

//middleware
const persistedReducer = persistReducer(persistConfig,arkwayReducer )

//redux: store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  }),
});

let persister = persistStore(store);

export {store, persister}