import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL2,GET_CHAT_LIST ,GET_CHAT_MESSAGES} from "./apiConfig";

export const chatApiSlice = createApi({
    reducerPath: 'chatApi',
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL2,
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
        getChatList: builder.query({
            query: ()=>({
            url: GET_CHAT_LIST,
            method : 'Get',
            })
        }),
        getChatHistory: builder.query({
            query: ({activeChatRoom , page ,limit}) =>({
                url: `${GET_CHAT_MESSAGES}${activeChatRoom}?_page=${page}&_limit=${limit}`,
                method : 'Get',
            })
        })
    }),

})

export const {useGetChatListQuery , useGetChatHistoryQuery} = chatApiSlice;