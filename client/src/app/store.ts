import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user';
import { userApi } from '../features/user/userApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;