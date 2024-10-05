import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ProfileDetail{
    username : string;
    profileImage : string | null;
}

const initialState : ProfileDetail ={
    username: " ",
    profileImage: null

}

const profileSlice = createSlice({
    name: "profileData",
    initialState,
    reducers:{
        setProfile: (state, action: PayloadAction<ProfileDetail>) => {
            state.username = action.payload.username;
            state.profileImage = action.payload.profileImage;
          },
          updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
          },
          updateProfileImage: (state, action: PayloadAction<string | null>) => {
            state.profileImage = action.payload;
          },
    }
})

export const {setProfile,updateUsername,updateProfileImage} = profileSlice.actions;
export default profileSlice.reducer;
export const selectUsername = (state:RootState) => state.profileData.username;
export const selectProfileImg = (state:RootState) => state.profileData.profileImage;