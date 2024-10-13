import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface LoginUserToken {
    token: string;
    isLogged: boolean; // login state
}

const initialState: LoginUserToken = {
    token: "",
    isLogged: false, // default is not logged in
};

const loginUserTokenSlice = createSlice({
    name: "loginUserToken",
    initialState,
    reducers: {
        setLoginUserToken: (state, action: PayloadAction<{ token: string }>) => {
            localStorage.setItem("user", JSON.stringify({ token: action.payload.token }));
            state.token = action.payload.token;
            state.isLogged = !!action.payload.token; // true if token exists
        },
        clearLoginUserToken: (state) => {
            localStorage.removeItem("user"); // clear localStorage
            state.token = "";
            state.isLogged = false; // set as logged out
        }
    }
});

export const { setLoginUserToken, clearLoginUserToken } = loginUserTokenSlice.actions;
export const selectToken = (state: RootState) => state.loginUserToken.token;
export const selectIsLogged = (state: RootState) => state.loginUserToken.isLogged;

export default loginUserTokenSlice.reducer;
