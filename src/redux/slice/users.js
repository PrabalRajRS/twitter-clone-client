import { createSlice } from '@reduxjs/toolkit';
const isEmpty = require("is-empty");

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: {},
    },
    reducers: {
        setUsers: (state, action) => {
            return {
                ...state,
                users: action.payload
            };
        }
    }
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer;
