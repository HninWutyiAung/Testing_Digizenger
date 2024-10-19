import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ProfileDetail{
    username : string;
    profileUploadImage : string | null;
    profilePreviewImage : string | null;
    profileBox : boolean;
    coverBox: boolean;
}

const initialState : ProfileDetail ={
    username: " ",
    profileUploadImage: null,
    profilePreviewImage : null,
    profileBox: false,
    coverBox: false,

}

const profileSlice = createSlice({
    name: "profileData",
    initialState,
    reducers:{
        setProfile: (state, action: PayloadAction<ProfileDetail>) => {
            state.username = action.payload.username;
            state.profileUploadImage = action.payload.profileUploadImage;
          },
          updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
          },
          uploadProfile: (state, action: PayloadAction<string | null>) => {
            console.log(action.payload);
            state.profileUploadImage = action.payload;
          },
          setProfileBox:(state, action: PayloadAction<boolean>) =>{
            state.profileBox = action.payload;
          },
          setProfilePreivewImage: (state, action: PayloadAction<string | null>) => {
            state.profilePreviewImage = action.payload;
          },
          setCoverBox:(state,action:PayloadAction<boolean>) => {
            state.coverBox = action.payload;
          }
    }
})

export const {setProfile,updateUsername,uploadProfile , setProfileBox , setProfilePreivewImage , setCoverBox} = profileSlice.actions;
export default profileSlice.reducer;
export const selectUsername = (state:RootState) => state.profileData.username;
export const selectProfileImg = (state:RootState) => state.profileData.profileUploadImage;
export const selectProfileBox = (state: RootState) => state.profileData.profileBox;
export const selectProfilePreview = (state: RootState) => state.profileData.profilePreviewImage;