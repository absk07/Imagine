import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { userApi } from '../api/userApi';
import { imageGenApi } from '../api/imageApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [imageGenApi.reducerPath]: imageGenApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(imageGenApi.middleware),
    devTools: import.meta.env.VITE_ENV !== 'production'
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;