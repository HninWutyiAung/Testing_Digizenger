import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://digizenger.org/api/v1',
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
        query:(formData) =>({
            url: '/profile/p-image',
            method:'POST',
            body: formData,
        })
    }),

    uploadUsername: builder.mutation({
      query: (username) =>({
        url: 'profile/username',
        method: 'POST',
        body: username,
      })
    })

  })

});

export const { useUploadProfileImageMutation } = profileApiSlice;