import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from './store';

interface registerState {
    email : string | null;
    phone : string | null;
    firstName: string | null;
    lastName: string | null;

}

const initialState : registerState = {
    email : null,
    phone : null,
    firstName: null,
    lastName: null
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
            localStorage.setItem("registerInfo", JSON.stringify({firstName: action.payload.firstName, lastName: action.payload.lastName}));
            
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;

        }
    }
})

export const {setEmailOrPhone ,setRegisterInfo} = registerInfoSlice.actions;
export default registerInfoSlice.reducer;
export const selectEmail = (state: RootState) => state.registerInfo.email;
export const selectPhone = (state: RootState) => state.registerInfo.phone;
export const selectFirstName = (state: RootState) => state.registerInfo.firstName;  
export const selectLastName = (state: RootState) => state.registerInfo.lastName;