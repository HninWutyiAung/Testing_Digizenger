import { useEffect } from "react";

export let ProfileDto;
export let userDto;

export const IMageForMyProfile = (profileData) => {
    console.log(profileData);

    if (profileData && profileData.profileDto) {
        ProfileDto = profileData.profileDto; 
        userDto = profileData.profileDto.userForProfileDto;
    } else {
        console.error("Invalid profile data structure:", profileData);
    }
};

