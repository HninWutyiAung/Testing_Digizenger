import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../apiService/Auth.ts";
import chatReducer from './chatSlice.ts';
import registerInfoReducer from './authSlice.ts';
import uploadPostReducer from './postSlice.ts';
import { postUploadSlice } from '../apiService/Post.ts';
import loginUserTokenReducer from './loginToken.ts';
import { profileApiSlice} from "../apiService/Profile.ts";
import profileDataReducer from './profileSlice.ts';

export const store = configureStore({
    reducer:{
        chat: chatReducer,
        loginUserToken: loginUserTokenReducer,
        uploadPost : uploadPostReducer,
        registerInfo: registerInfoReducer,
        profileData : profileDataReducer,
        [authApi.reducerPath] : authApi.reducer,
        [postUploadSlice.reducerPath]: postUploadSlice.reducer,
        [profileApiSlice.reducerPath] : profileApiSlice.reducer,
    },
    middleware : (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(authApi.middleware, postUploadSlice.middleware,profileApiSlice.middleware),
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);