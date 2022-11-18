import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: {
            primaryButton: "#1d9bf0"
        },
    },
    reducers: {
        setTheme: (state, action) => {
            return {
                ...state,
                theme: action.payload
            };
        }
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer;
