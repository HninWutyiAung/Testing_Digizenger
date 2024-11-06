import { useEffect } from "react";

export let ProfileDto;
export let userDto;


export const IMageForMyProfile = (profileData) => {
    console.log(profileData);

    if (profileData && profileData.userDto) {
        ProfileDto = profileData.userDto; 
        console.log("this is my post" , ProfileDto);
    } else {
        console.error("Invalid profile data structure:", profileData);
    }
};

