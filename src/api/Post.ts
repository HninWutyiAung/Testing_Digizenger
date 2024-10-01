import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postUploadSlice = createApi({
  reducerPath: 'postUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://152.42.254.187:8080/api/v1',
    prepareHeaders: (headers) => {
      const usertoken = localStorage.getItem('user');
      if (usertoken) {
        const token = JSON.parse(usertoken);
        headers.set('Authorization', `Bearer ${token}`);
        console.log(token);
      }
      return headers;
      
    },
  }),
  endpoints: (builder) => ({
    uploadPost: builder.mutation({
      query: (postData) => ({
        url: '/posts/upload',
        method: 'POST',
        body: postData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    // getPost: builder.query({
    //   query: ({ pageCount }) => ({
    //     url: `posts/getPost?_page=${pageCount}&_limit=10`,
    //   }),
    // }),
  }),
});

export const { useUploadPostMutation } = postUploadSlice;
