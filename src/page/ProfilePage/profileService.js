import { useEffect } from "react";

export let ProfileDto;
export let userDto;


export const IMageForMyProfile = (profileData) => {
    console.log(profileData);

    if (profileData && profileData.userDto) {
        ProfileDto = profileData.userDto; 
    } else {
        console.error("Invalid profile data structure:", profileData);
    }
};

