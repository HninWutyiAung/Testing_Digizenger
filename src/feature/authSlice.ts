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

}

const initialState : registerState = {
    email : null,
    phone : null,
    firstName: null,
    lastName: null,
    LoginFirstName: null,
    LoginLastName: null,
    profileUploadImageUrl: null,
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
        setLoginInfo: (state, action: PayloadAction<{ LoginFirstName?: string | null; LoginLastName?: string | null; profileUploadImageUrl: string | null }>) => {
            state.LoginFirstName = action.payload.LoginFirstName ?? state.LoginFirstName;
            state.LoginLastName = action.payload.LoginLastName ?? state.LoginLastName;
        
            state.profileUploadImageUrl = action.payload.profileUploadImageUrl;
        
            const currentLoginInfo = {
                LoginFirstName: state.LoginFirstName,
                LoginLastName: state.LoginLastName,
                profileUploadImageUrl: state.profileUploadImageUrl,
            };
            localStorage.setItem("LoginInfo", JSON.stringify(currentLoginInfo));
        }
        
        
    }
})

export const {setEmailOrPhone ,setRegisterInfo, setLoginInfo} = registerInfoSlice.actions;
export default registerInfoSlice.reducer;
export const selectEmail = (state: RootState) => state.registerInfo.email;
export const selectPhone = (state: RootState) => state.registerInfo.phone;
export const selectFirstName = (state: RootState) => state.registerInfo.firstName;  
export const selectLastName = (state: RootState) => state.registerInfo.lastName;
export const selectLoginFirstName = (state: RootState) => state.registerInfo.LoginFirstName;  
export const selectLoginLastName = (state: RootState) => state.registerInfo.LoginLastName;
export const selectLoginProfileImage = (state : RootState) => state.registerInfo.profileUploadImageUrl;

