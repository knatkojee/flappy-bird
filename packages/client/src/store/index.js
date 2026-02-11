import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { LeaderBoardApi } from './leaderboardApi';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [LeaderBoardApi.reducerPath]: LeaderBoardApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(LeaderBoardApi.middleware),
});
