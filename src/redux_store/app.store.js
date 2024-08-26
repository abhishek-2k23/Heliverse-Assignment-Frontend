import {configureStore} from '@reduxjs/toolkit';
import navSlice from './slices/nav.slice';

export const store = configureStore({
    reducer: {
        nav: navSlice,
    },
})