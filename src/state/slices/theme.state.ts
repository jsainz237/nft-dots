import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ThemeState {
    primaryOverride: string;
}

const initialState: ThemeState = {
    primaryOverride: null,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setPrimaryOverride: (state, action: PayloadAction<string>) => {
            state.primaryOverride = action.payload;
        },
        clearPrimaryOverride: (state) => {
            state.primaryOverride = null;
        }
    }
});

export const { setPrimaryOverride, clearPrimaryOverride } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.primaryOverride;

export default themeSlice.reducer;
