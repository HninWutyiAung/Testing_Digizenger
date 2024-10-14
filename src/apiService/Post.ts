import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, UPLOAD_POST_ENDPOINT, GET_POSTS_ENDPOINT, LIKE_POST_ENDPOINT } from './apiConfig'; 

export const postUploadSlice = createApi({
  reducerPath: 'postUploadApi',
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
    uploadPost: builder.mutation({
      query: (formData) => ({
        url: UPLOAD_POST_ENDPOINT,
        method: 'POST',
        body: formData,
      }),
    }),
    getPost: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: `${GET_POSTS_ENDPOINT}?_page=${page}&_limit=${limit}`,
      }),
    }),
    setLikeOrUnlike: builder.mutation({
      query: (postId) => ({
        url: `${LIKE_POST_ENDPOINT}${postId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useUploadPostMutation, useGetPostQuery, useSetLikeOrUnlikeMutation } = postUploadSlice;
