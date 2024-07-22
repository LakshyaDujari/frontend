import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Slice/dataSlice';
import { localStorageMiddleware, rehydrateState } from './middleware';
const preloadedState = rehydrateState();
const store = configureStore({

    reducer: {
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState,
});

export default store;