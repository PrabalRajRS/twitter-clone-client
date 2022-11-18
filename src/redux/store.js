import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth'
import usersReducer from './slice/users'
import themeReducer from './slice/theme'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    themeReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)