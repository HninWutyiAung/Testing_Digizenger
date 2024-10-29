import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from './store';


interface registerState {
    email : string | null;
    phone : string | null;
    firstName: string | null;
    lastName: string | null;
    LoginFirstName: string | null;
    LoginLastName: string | null;
    profileUploadImageUrl: string | null;
    userId: string | null;

}

const initialState : registerState = {
    email : null,
    phone : null,
    firstName: null,
    lastName: null,
    LoginFirstName: null,
    LoginLastName: null,
    profileUploadImageUrl: null,
    userId: null,
}

const registerInfoSlice = createSlice({
    name : "registerInfo",
    initialState,
    reducers : {
        setEmailOrPhone(state, action: PayloadAction<{email:string | null, phone: string | null , firstName: string | null, lastName: string | null}>){
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        setRegisterInfo: (state, action: PayloadAction<{ firstName: string | null, lastName: string | null}>) => {    
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;

        },
        setLoginInfo: (state, action: PayloadAction<{ LoginFirstName: string | null, LoginLastName: string | null , userId: string | null}>) =>{
            localStorage.setItem("LoginInfo", JSON.stringify({ LoginFirstName: action.payload.LoginFirstName , LoginLastName: action.payload.LoginLastName , userId: action.payload.userId}));
            state.LoginFirstName = action.payload.LoginFirstName;
            state.LoginLastName = action.payload.LoginLastName;
            state.userId = action.payload.userId;
        },
        setLoginImage : (state, action: PayloadAction<{profileUploadImageUrl: string | null; }>) =>{
            localStorage.setItem("ImageUrl", JSON.stringify({ profileUploadImageUrl : action.payload.profileUploadImageUrl}));
            state.profileUploadImageUrl = action.payload.profileUploadImageUrl;
        }
    }
})

export const {setEmailOrPhone ,setRegisterInfo, setLoginInfo ,setLoginImage} = registerInfoSlice.actions;
export default registerInfoSlice.reducer;
export const selectEmail = (state: RootState) => state.registerInfo.email;
export const selectPhone = (state: RootState) => state.registerInfo.phone;
export const selectFirstName = (state: RootState) => state.registerInfo.firstName;  
export const selectLastName = (state: RootState) => state.registerInfo.lastName;
export const selectLoginFirstName = (state: RootState) => state.registerInfo.LoginFirstName;  
export const selectLoginLastName = (state: RootState) => state.registerInfo.LoginLastName;
export const selectLoginProfileImage = (state : RootState) => state.registerInfo.profileUploadImageUrl;
export const selectUserId = (state: RootState) => state.registerInfo.userId;

