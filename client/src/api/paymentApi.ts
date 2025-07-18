import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const rpzPaymentApi = createApi({
    reducerPath: 'rpzPaymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token)
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: (build) => ({
        rpzPayment: build.mutation<any, { planId: string }>({
            query: (planId) => ({
                url: '/buy-uc/pay',
                method: 'POST',
                body: planId
            })
        }),
        rpzPaymentVerify: build.mutation<any, { razorpay_order_id: string }>({
            query: (razorpay_order_id) => ({
                url: '/buy-uc/verify-pay',
                method: 'POST',
                body: razorpay_order_id
            })
        })
    })
});

export const { useRpzPaymentMutation, useRpzPaymentVerifyMutation } = rpzPaymentApi;