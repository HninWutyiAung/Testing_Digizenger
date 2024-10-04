import cover from '/images/cover.png';
import john from '/images/john doe.jpg';
import mark from '/images/mark2.png';
import { useRef, useState } from 'react';
import { FaCamera } from "react-icons/fa6";
import { PiPresentationChartFill } from "react-icons/pi";
import { PiMegaphoneSimpleFill } from "react-icons/pi";
import { PiPencilSimpleFill } from "react-icons/pi";
import { useUploadProfileImageMutation} from '../api/Profile';
 
function ProfileCover (){
    const coverRef = useRef();
    const profileRef = useRef();
    const [coverImage, setcoverImage] = useState(null);
    const [coverImageUrl, setcoverImageUrl] = useState(null);
    const [profileImage, setprofileImage] = useState(null);
    const [profileImageUrl, setprofileImageUrl] = useState(null);
    const [uploadProfileImage,{isSuccess,isError, isLoading, error }] = useUploadProfileImageMutation();
    console.log(coverImageUrl)

    const onChangeCover = (e)=> {
        const coverFile = e.target.files[0];
        if(coverFile){
            setcoverImage(coverFile);
            setcoverImageUrl(URL.createObjectURL(coverFile));
        }
    }

    const onChangeProfile = (e)=> {
        const profileFile = e.target.files[0];
        if(profileFile){
            setprofileImage(profileFile);
            setprofileImageUrl(URL.createObjectURL(profileFile));
        }
    }
    const uploadProfileImg = ()=> {
        profileRef.current.click();
    }
    const uploadCoverImage = ()=>{
        coverRef.current.click();
    }

    const uploadProfile = async () => {
        const formData = new FormData();
        formData.append('file', profileImage);

        try{
            const res = await uploadProfileImage(formData).unwrap();
            console.log("Profile Image Uploaded", res) 
        }catch(err){
            console.log("Profile Image Upload failed", err)
    }
    }

    console.log(coverImage, profileImage)
    return(
        <section className="h-[484px] w-[640px] flex flex-col pb-6 items-center gap-7 self-stretch rounded-lg border border-solid border-[#C9DCDE] bg-white ">
                    {/* Cover Image & Profile Image */}
                    <div className="w-[640px] h-60 relative">
                        {/* Cover Image */}
                        <div className="w-[640px] h-[180px] left-0 top-0 absolute overflow-hidden rounded-t-lg">
                            <input type="file" ref={coverRef} onChange={onChangeCover} className='hidden'/>
                            {coverImageUrl ? (<img src={coverImageUrl} className="w-[640px] h-[180px]" onClick={uploadCoverImage}/>) :(<img className="w-[640px] h-[180px] left-0 top-0 absolute" src={cover} alt="Cover" />)}
                            <div className="w-7 h-7 left-[596px] top-[16px] absolute bg-[#ecf1f4] rounded-full shadow flex justify-center items-center" onClick={uploadCoverImage}>
                                <FaCamera className='text-[#2C3E50]' />
                            </div>
                        </div>
                        {/* Profile Image */}
                        <div className="w-[180px] h-[180px] left-[24px] top-[60px] absolute">
                            <input type="file" ref={profileRef} className='hidden' onChange={onChangeProfile}/> 
                            {profileImageUrl ? (<img className="w-[180px] h-[180px] left-0 top-0 absolute rounded-full border-4 border-solid border-white" src={profileImageUrl}  alt="Profile" />) : (<img className="w-[180px] h-[180px] left-0 top-0 absolute rounded-full border-4 border-solid border-white" src={john} alt="Profile" />)}
                            <div className="w-7 h-7 left-[136px] top-[141px] absolute bg-[#ecf1f4] rounded-full shadow flex justify-center items-center" onClick={uploadProfileImg}>
                                <FaCamera className='text-[#2C3E50]' />
                            </div>
                        </div>
                    </div>
 
                    {/* Profile Name & Information & Action Button */}
                    <div className="w-[592px] h-[192px] flex flex-col justify-start items-start gap-3">
                        {/* Profile Name & Email */}
                        <div className="self-stretch h-[52px] flex flex-col justify-start items-start gap-1">
                            <div className="h-[24px] self-stretch flex items-center gap-1">
                                <div className="w-[125px] h-[20px] text-[#2C3E50] text-[28px] font-bold font-['DM Sans'] flex items-center">John Doe</div>
                                <div className="flex items-center justify-center w-6 h-6">
                                    <img className="w-[19.20px] h-[19.20px]" src={mark} alt="" />
                                </div>
                            </div>
                            <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans'] leading-normal">@john332</div>
                        </div>
 
                        {/* Profile's Information */}
                        <div className="w-[431px] h-[76px] flex flex-col justify-start items-start gap-1">
                            <div className="w-[114px] h-[24px] flex justify-start items-start gap-1">
                                <div className="text-[#0097A7] text-base font-bold font-['DM Sans'] leading-normal">Digital Creator</div>
                            </div>
                            <div className="w-[431px] h-[48px] text-[#2C3E50] text-base font-normal font-['DM Sans'] leading-normal text-left">I am an environmentalist who values growth and harmony in my personal and professional life.</div>
                        </div>
 
                        {/* Action Button */}
                        <div className="w-[421px] h-[40px] flex justify-start items-start gap-3">
                            <div className="w-[152px] h-10 p-3 bg-[#0097A7] rounded-lg justify-center items-center gap-2 flex">
                                <PiPresentationChartFill className="w-6 h-6 relative text-white"/>
                                <div className="text-white text-lg font-bold font-['DM Sans']">Dashboard</div>
                            </div>
                            <div className="w-[154px] h-[40px] p-3 bg-[#ECF1F4] rounded-lg justify-center items-center gap-2 flex">
                                <PiMegaphoneSimpleFill className="w-6 h-6 relative text-[#2C3E50]"/>
                                <div className="text-[#2C3E50] text-lg font-bold font-['DM Sans']">Create Ads</div>
                            </div>
                            <div className="w-[91px] h-[40px] p-3 bg-[#ECF1F4] rounded-lg justify-center items-center gap-2 flex">
                                <PiPencilSimpleFill className="w-6 h-6 relative text-[#2C3E50]"/>
                                <div className="text-[#2C3E50] text-lg font-bold font-['DM Sans']">Edit</div>
                            </div>
                        </div>
                    </div>
                </section>
    )
}


export default ProfileCover;