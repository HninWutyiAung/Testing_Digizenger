import cover from '/images/cover.png';
import john from '/images/john doe.jpg';
import mark from '/images/mark2.png';
import { useRef, useState } from 'react';
import { FaCamera } from "react-icons/fa6";
import { PiPresentationChartFill } from "react-icons/pi";
import { PiMegaphoneSimpleFill } from "react-icons/pi";
import { PiPencilSimpleFill } from "react-icons/pi";
import { selectFirstName, selectLastName } from '../../feature/authSlice';
import { useAppSelector , useAppDispatch} from '../../hook/Hook';
import { setProfileBox} from '../../feature/profileSlice';
import { ProfileDto } from '../../page/ProfilePage/profileService';

 
function ProfileCover (){
    const firstName = useAppSelector(selectFirstName);
    const lastName = useAppSelector(selectLastName);
    const dispatch = useAppDispatch();

    const profileHandleBox = () =>{
        dispatch(setProfileBox(true));
    }

    return(
        <section className=" flex flex-col pb-6 items-center self-stretch rounded-lg border border-solid border-[#C9DCDE] bg-white">
                    {/* Cover Image & Profile Image */}
                    <div className="h-60 relative">
                        {/* Cover Image */}
                        <div className="rounded-t-lg">
                            <input type="file"className='hidden'/>
                            <img src={cover} className="h-[160px]"  alt="Cover" />
                            <div className="w-7 h-7 right-[10px] top-[16px] absolute bg-[#ecf1f4] rounded-full shadow flex justify-center items-center">
                                <FaCamera className='text-[#2C3E50]' />
                            </div>
                        </div>
                        {/* Profile Image */}
                        <div className="w-[150px] h-[150px] left-[15px] top-[60px] flex items-center justify-center absolute ">
                            <input type="file"  className='hidden' /> 
                            <img className="w-[150px] h-[150px] absolute rounded-full border-4 border-solid border-white" src={ProfileDto.profileImageUrl} alt="Profile" />
                            <div className="w-7 h-7 left-[110px] top-[115px] absolute bg-[#ecf1f4] rounded-full shadow flex justify-center items-center" onClick={profileHandleBox}>
                                <FaCamera className='text-[#2C3E50]' />
                            </div>
                        </div>
                    </div>
 
                    {/* Profile Name & Information & Action Button */}
                    <div className="h-[192px] flex flex-col items-start pl-[1rem] gap-3">
                        {/* Profile Name & Email */}
                        <div className="self-stretch h-[52px] flex flex-col justify-start items-start gap-1">
                            <div className="h-[24px] self-stretch flex items-center gap-1">
                                <div className=" h-[20px] text-[#2C3E50] text-[25px] font-bold font-['DM Sans'] flex items-center">{`${firstName} ${lastName}`}</div>
                                <div className="flex items-center justify-center w-6 h-6">
                                    <img className="w-[19.20px] h-[19.20px]" src={mark} alt="" />
                                </div>
                            </div>
                            <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans'] leading-normal">@john332</div>
                        </div>
 
                        {/* Profile's Information */}
                        <div className=" h-[76px] flex flex-col justify-start items-start gap-1">
                            <div className="h-[24px] flex justify-start items-start gap-1">
                                <div className="text-[#0097A7] text-base font-bold font-['DM Sans'] leading-normal">Digital Creator</div>
                            </div>
                            <div className="h-[48px] text-[#2C3E50] text-base font-normal font-['DM Sans'] leading-normal text-left">I am an environmentalist who values growth and harmony in my personal and professional life.</div>
                        </div>
 
                        {/* Action Button */}
                        <div className="h-[40px] flex justify-start items-start gap-3">
                            <div className=" h-10 p-3 bg-[#0097A7] rounded-lg justify-center items-center gap-2 flex">
                                <PiPresentationChartFill className="w-6 h-6 relative text-white"/>
                                <div className="text-white text-[0.9rem] font-bold font-['DM Sans']">Dashboard</div>
                            </div>
                            <div className="h-[40px] p-3 bg-[#ECF1F4] rounded-lg justify-center items-center gap-2 flex">
                                <PiMegaphoneSimpleFill className="w-6 h-6 relative text-[#2C3E50]"/>
                                <div className="text-[#2C3E50] text-[0.9rem] font-bold font-['DM Sans']">Create Ads</div>
                            </div>
                            <div className="w-[91px] h-[40px] p-3 bg-[#ECF1F4] rounded-lg justify-center items-center gap-2 flex">
                                <PiPencilSimpleFill className="w-6 h-6 relative text-[#2C3E50]"/>
                                <div className="text-[#2C3E50] text-[0.9rem] font-bold font-['DM Sans']">Edit</div>
                            </div>
                        </div>
                    </div>
            </section>
    )
}


export default ProfileCover;
