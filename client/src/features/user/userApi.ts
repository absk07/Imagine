import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (build) => ({
        register: build.mutation<any, { username: string; email: string; password: string }>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData,
            }),
        }),
        login: build.mutation<any, { email: string; password: string }>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData,
            }),
        })
    })
});

export const { useRegisterMutation, useLoginMutation } = userApi;