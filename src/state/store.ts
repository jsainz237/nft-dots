import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/wallet.state';
import themeReducer from './slices/theme.state';

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        theme: themeReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;