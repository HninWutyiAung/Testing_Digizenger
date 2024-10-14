import { useEffect } from "react";
export let ProfileIMageUrl;

console.log(ProfileIMageUrl);

const profileIMageForMyProfile = (isSuccess , data) =>{
    useEffect(()=>{
        if(isSuccess){
            ProfileIMageUrl = data.profileDto.profileIMageUrl;
        }
    })
}

export default profileIMageForMyProfile;