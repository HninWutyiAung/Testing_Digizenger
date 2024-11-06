import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BASE_URL,
  PROFILE_IMAGE_ENDPOINT,
  USERNAME_ENDPOINT,
  GET_PROFILE_ENDPOINT,
  COVER_IMAGE_ENDPOINT,
  GET_ALL_IMAGES_ENDPOINT,
} from "./apiConfig"; 

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const usertoken = localStorage.getItem("user");
      if (usertoken) {
        const token = JSON.parse(usertoken);
        headers.set("Authorization", `Bearer ${token.token}`);
        console.log(token.token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: PROFILE_IMAGE_ENDPOINT,
        method: "POST",
        body: formData,
      }),
    }),

    uploadUsername: builder.mutation({
      query: (username) => ({
        url: USERNAME_ENDPOINT,
        method: "POST",
        body: username,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: GET_PROFILE_ENDPOINT,
        method: "GET",
      }),
    }),

    getMyPosts: builder.query({
      query: ({ page, limit }) => ({
        url: `${GET_PROFILE_ENDPOINT}posts?_page=${page}&_limit=${limit}`,
        method: "GET",
      }),
    }),

    uploadCoverImage: builder.mutation({
      query: (formData) => ({
        url: COVER_IMAGE_ENDPOINT,
        method: "POST",
        body: formData,
      }),
    }),
    getOtherProfile: builder.query({
      query: (username) => ({
        url: `${GET_PROFILE_ENDPOINT}${username}`,
        method: "GET",
      }),
    }),

    getAllImages: builder.query({
      query: ({ page, limit }) => ({
        url: `${GET_ALL_IMAGES_ENDPOINT}?_page=${page}&_limit=${limit}`,
        method: "GET",
      }),
    }),

    addCareerHistory: builder.mutation({
      query: (formData) => ({
        url: "/profile/career-history",
        method: "POST",
        body: formData,
      }),
    }),

    updateCareerHistory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/profile/career-history/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    addEducationHistory: builder.mutation({
      query: (formData) => ({
        url: "/profile/education-history",
        method: "POST",
        body: formData,
      }),
    }),

    updateEducationHistory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/profile/education-history/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    addServiceProvided: builder.mutation({
      query: (formData) => ({
        url: "/profile/service-provided",
        method: "POST",
        body: formData,
      }),
    }),

    deleteServiceProvided: builder.mutation({
      query: (id) => ({
        url: `/profile/service-provided/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useUploadProfileImageMutation,
  useGetProfileQuery,
  useUploadCoverImageMutation,
  useGetMyPostsQuery,
  useGetOtherProfileQuery,
  useGetAllImagesQuery,
  useAddCareerHistoryMutation,
  useUpdateCareerHistoryMutation,
  useAddEducationHistoryMutation,
  useUpdateEducationHistoryMutation,
  useAddServiceProvidedMutation,
  useDeleteServiceProvidedMutation,
} = profileApiSlice;
