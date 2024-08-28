import {configureStore} from '@reduxjs/toolkit';
import navSlice from './slices/nav.slice';
import userReducer from './slices/user.slice'; // userReducer === userSlice
import teamSlice from './slices/team.slice';
export const store = configureStore({
    reducer: {
        nav: navSlice,
        users: userReducer,
        team: teamSlice,
    },
})