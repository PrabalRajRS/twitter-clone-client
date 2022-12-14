import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isNightMode: false
    },
    reducers: {
        setTheme: (state, action) => {
            return {
                ...state,
                isNightMode: action.payload
            };
        }
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer;
