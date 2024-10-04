import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/Auth";
import chatReducer from './chatSlice.ts'
import registerInfoReducer from './authSlice.ts';
import uploadPostReducer from './postSlice.ts';
import { postUploadSlice } from '../api/Post.ts';
import loginUserTokenReducer from './loginToken.ts';
import { profileApiSlice, useUploadProfileImageMutation } from "../api/Profile.ts";

export const store = configureStore({
    reducer:{
        chat: chatReducer,
        loginUserToken: loginUserTokenReducer,
        registerInfo: registerInfoReducer,
        uploadPost : uploadPostReducer,
        [authApi.reducerPath] : authApi.reducer,
        [postUploadSlice.reducerPath]: postUploadSlice.reducer,
        [profileApiSlice.reducerPath] : profileApiSlice.reducer,
    },
    middleware : (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(authApi.middleware, postUploadSlice.middleware),
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);