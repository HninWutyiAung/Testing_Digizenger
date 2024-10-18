import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PROFILE_IMAGE_ENDPOINT, USERNAME_ENDPOINT, GET_PROFILE_ENDPOINT } from './apiConfig'; // Import from apiConfig.js

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
    prepareHeaders: (headers) => {
      const usertoken = localStorage.getItem('user');
      if (usertoken) {
        const token = JSON.parse(usertoken);
        headers.set('Authorization', `Bearer ${token.token}`);
        console.log(token.token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: PROFILE_IMAGE_ENDPOINT,
        method: 'POST',
        body: formData,
      }),
    }),

    uploadUsername: builder.mutation({
      query: (username) => ({
        url: USERNAME_ENDPOINT,
        method: 'POST',
        body: username,
      }),
    }),

    getProfile: builder.query({
      query: ({page,limit}) => ({
        url: `${GET_PROFILE_ENDPOINT}?_page=${page}&_limit=${limit}`, 
        method: 'GET',
      }),
    }),
  }),
});

export const { useUploadProfileImageMutation, useGetProfileQuery } = profileApiSlice;
