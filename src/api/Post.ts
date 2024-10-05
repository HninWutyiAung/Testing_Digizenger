import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postUploadSlice = createApi({
  reducerPath: 'postUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://152.42.254.187:8080/api/v1',
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
        url: '/posts/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    getPost: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: `posts/getPost?_page=${page}&_limit=${limit}`,
      }),
    }),
    setLikeOrUnlike: builder.mutation({
      query: (postId) =>({
        url: `posts/isLike/${postId}`,
        method: 'POST',
      })
    })
  }),
});

export const { useUploadPostMutation , useGetPostQuery ,useSetLikeOrUnlikeMutation} = postUploadSlice;
