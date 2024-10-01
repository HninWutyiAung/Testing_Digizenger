import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface LoginUserToken {
    token: string; 
}

const initialState: LoginUserToken = {
    token: "",

};

const loginUserTokenSlice = createSlice({
    name: "loginUserToken",
    initialState,
    reducers: {
        setLoginUserToken: (state, action: PayloadAction<{ token: string}>) => {
            localStorage.setItem("user", JSON.stringify({token:action.payload.token}));
            
            state.token = action.payload.token; 

        }
    }
});

export const selectToken =(state: RootState) => state.loginUserToken.token;

export const { setLoginUserToken } = loginUserTokenSlice.actions;
export default loginUserTokenSlice.reducer;
