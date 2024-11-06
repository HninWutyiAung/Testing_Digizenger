import cover from '/images/cover.png';
import default_profile from '/images/default_profile.jpg';
import mark from '/images/mark2.png';
import { useRef, useState } from 'react';
import { FaCamera } from "react-icons/fa6";
import { PiPresentationChartFill } from "react-icons/pi";
import { PiMegaphoneSimpleFill } from "react-icons/pi";
import { PiPencilSimpleFill } from "react-icons/pi";
import { selectFirstName, selectLastName } from '../../feature/authSlice';
import { useAppSelector , useAppDispatch} from '../../hook/Hook';
import { setProfileBox ,setCoverBox} from '../../feature/profileSlice';
import { ProfileDto } from '../../page/ProfilePage/profileService';
import { profileImageUrl} from './profileEditService';
import {coverImageUrl} from './CoverEditService'

 
function ProfileCover (){
    const loginInfo = JSON.parse(localStorage.getItem("LoginInfo") || "{}");
    const firstName = loginInfo.LoginFirstName;
    const lastName = loginInfo.LoginLastName;
    const dispatch = useAppDispatch();

    const profileHandleBox = () =>{
        dispatch(setProfileBox(true));
    }

    const coverHandleBox = () =>{
        dispatch(setCoverBox(true))
    }
    console.log(ProfileDto?.profileDto.coverImageUrl)
    return(
        <section className=" flex flex-col pb-6 items-center self-stretch rounded-lg border border-solid border-[#C9DCDE] bg-white">

                    <div className="h-60 relative">

                        <div className="rounded-t-lg">
                            <input type="file"className='hidden'/>
                            <img src={coverImageUrl || ProfileDto?.profileDto?.coverImageUrl || cover} className="h-[160px] w-[600px]"  alt="Cover" />
                            <div className="w-7 h-7 right-[10px] top-[16px] absolute bg-[#ecf1f4] rounded-full shadow flex justify-center items-center" onClick={coverHandleBox}>
                                <FaCamera className='text-[#2C3E50]' />
                            </div>
                        </div>

                        <div className="w-[150px] h-[150px] left-[15px] top-[60px] flex items-center justify-center absolute ">
                            <input type="file"  className='hidden' /> 
                            <img className="w-[150px] h-[150px] absolute rounded-full border-4 border-solid border-white" src={profileImageUrl|| ProfileDto?.profileDto?.profileImageUrl || default_profile} alt="Profile" />
                            <div className="w-7 h-7 left-[110px] top-[115px] absolute bg-[#ecf1f4] rounded-full shadow flex justify-center items-center" onClick={profileHandleBox}>
                                <FaCamera className='text-[#2C3E50]' />
                            </div>
                        </div>
                    </div>
 

                    <div className="h-[192px] flex flex-col items-start pl-[1rem] gap-3">
                      
                        <div className="self-stretch h-[52px] flex flex-col justify-start items-start gap-1">
                            <div className="h-[24px] self-stretch flex items-center gap-1">
                                <div className=" h-[20px] text-[#2C3E50] text-[25px] font-bold font-['DM Sans'] flex items-center">{`${firstName} ${lastName}`}</div>
                                <div className="flex items-center justify-center w-6 h-6">
                                    <img className="w-[19.20px] h-[19.20px]" src={mark} alt="" />
                                </div>
                            </div>
                            <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans'] leading-normal">@john332</div>
                        </div>
 
                    
                        <div className=" h-[76px] flex flex-col justify-start items-start gap-1">
                            <div className="h-[24px] flex justify-start items-start gap-1">
                                <div className="text-[#0097A7] text-base font-bold font-['DM Sans'] leading-normal">Digital Creator</div>
                            </div>
                            <div className="h-[48px] text-[#2C3E50] text-base font-normal font-['DM Sans'] leading-normal text-left">I am an environmentalist who values growth and harmony in my personal and professional life.</div>
                        </div>
 
                        
                        <div className="h-[40px] flex justify-start items-start gap-3 responsive-profile-button">
                            <div className=" h-10 p-3 bg-primary rounded-lg justify-center items-center gap-2 flex responsive-profile-button-constainer">
                                <PiPresentationChartFill className="w-6 h-6 relative text-background responsive-profile-button-icon"/>
                                <div className="text-background text-[0.9rem] font-bold font-['DM Sans']">Dashboard</div>
                            </div>
                            <div className="h-[40px] p-3 bg-accent rounded-lg justify-center items-center gap-2 flex responsive-profile-button-constainer">
                                <PiMegaphoneSimpleFill className="w-6 h-6 relative text-[#2C3E50] responsive-profile-button-icon"/>
                                <div className="text-[#2C3E50] text-[0.9rem] font-bold font-['DM Sans']">Create Ads</div>
                            </div>
                            <div className="w-[91px] h-[40px] p-3 bg-accent rounded-lg justify-center items-center gap-2 flex responsive-profile-button-constainer">
                                <PiPencilSimpleFill className="w-6 h-6 relative text-[#2C3E50] responsive-profile-button-icon"/>
                                <div className="text-[#2C3E50] text-[0.9rem] font-bold font-['DM Sans']">Edit</div>
                            </div>
                        </div>
                    </div>
            </section>
    )
}


export default ProfileCover;