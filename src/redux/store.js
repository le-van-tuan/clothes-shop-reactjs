import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";
import storage from "redux-persist/lib/storage";
import errorRedux from "./errorRedux";
import thunk from 'redux-thunk';

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["error"]
};

const rootReducer = combineReducers({user: userReducer, error: errorRedux});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk),
});

export const persistor = persistStore(store);
