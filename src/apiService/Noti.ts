import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,GET_ALL_NOTIFICATION } from "./apiConfig";

export const likeNotiApiSlice = createApi({
    reducerPath: 'likeNotiApi',
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL,
        prepareHeaders: (headers)=>{
            const usertoken = localStorage.getItem('user');
            if(usertoken){
                const token = JSON.parse(usertoken);
                headers.set('Authorization', `Bearer ${token.token}`)
                console.log(token.token);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllNoti : builder.query({
            query: ()=>({
            url: GET_ALL_NOTIFICATION,
            method : 'Get',
            })
        })
    })
})

export const {useGetAllNotiQuery } = likeNotiApiSlice;