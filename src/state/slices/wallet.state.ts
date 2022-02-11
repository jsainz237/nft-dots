import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface WalletState {
    walletAddress: string;
}

const initialState: WalletState = {
    walletAddress: null,
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string>) => {
            state.walletAddress = action.payload;
        },
        clearAddress: (state) => {
            state.walletAddress = null;
        }
    }
});

export const { setAddress, clearAddress } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet.walletAddress;

export default walletSlice.reducer;
