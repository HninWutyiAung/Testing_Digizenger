import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, REGISTER_ENDPOINT, VERIFY_ACCOUNT_ENDPOINT, LOGIN_ENDPOINT, RESEND_CODE_ENDPOINT } from './apiConfig'; 

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: REGISTER_ENDPOINT, 
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    verifyEmailOrPhone: builder.mutation({
      query: ({ emailOrPhone, otp }) => {
        return {
          method: 'PUT',
          url: VERIFY_ACCOUNT_ENDPOINT, 
          params: { emailOrPhone, otp },
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (credentials) => {
        return {
          url: LOGIN_ENDPOINT, 
          method: 'POST',
          body: credentials,
        };
      },
    }),
    resendCode: builder.mutation({
      query: (emailOrPhone) => {
        return {
          url: `${RESEND_CODE_ENDPOINT}?emailOrPhone=${emailOrPhone}`, 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useVerifyEmailOrPhoneMutation, useLoginUserMutation, useResendCodeMutation } = authApi;
