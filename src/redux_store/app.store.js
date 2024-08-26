import {configureStore} from '@reduxjs/toolkit';
import navSlice from './slices/nav.slice';
import userReducer from './slices/user.slice'; // userReducer === userSlice
export const store = configureStore({
    reducer: {
        nav: navSlice,
        users: userReducer,
    },
})