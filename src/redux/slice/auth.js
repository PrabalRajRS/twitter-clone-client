import { createSlice } from '@reduxjs/toolkit';
const isEmpty = require("is-empty");

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
    },
    reducers: {
        setCurrentUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            };
        },
        setLoginData: (state, action) => {
            return {
                ...state,
                user: action.payload
            };
        }
    }
})

export const { setCurrentUser, setLoginData } = authSlice.actions

export default authSlice.reducer;
