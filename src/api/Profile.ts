import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
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
    uploadProfileImage: builder.mutation({
        query:(formData) =>({
            url: '/profile/p-image',
            method:'POST',
            body: formData,
        })
    })

  })

});

export const { useUploadProfileImageMutation } = profileApiSlice;