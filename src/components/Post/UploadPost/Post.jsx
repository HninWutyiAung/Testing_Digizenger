import React, { useRef , useState, useEffect } from 'react';
import john from '/images/john doe.jpg';
import active from '/images/active.jpg';
import mark from '/images/mark.jpg';
import publicIcon from '/images/public.png';
import { GoImage } from "react-icons/go";
import { PiGif } from "react-icons/pi";
import { useUploadPostMutation } from '../../../apiService/Post';
import { FaUsers, FaHome, FaUserFriends } from "react-icons/fa";
import { addPost, setCurrentPost } from '../../../feature/postSlice';
import { useAppDispatch, useAppSelector } from '../../../hook/Hook';
import { IoCloseOutline } from "react-icons/io5";
import { GrFormEdit } from "react-icons/gr";
import { profileImageUrl } from '../../Profile/profileEditService';

function Post({activeChat, setpostLoading}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [content, setContent] = useState('');
    const [showMedia , setShowMedia] = useState(false);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const uploadRef = useRef(null);
    const [uploadPost,{isLoading,isSuccess, isError}] = useUploadPostMutation();
    const [postStatus, setPostStatus] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState('Everyone');
    const dispatch = useAppDispatch();
    const statusRef = useRef();
    const loginInfo = JSON.parse(localStorage.getItem("LoginInfo") || "{}");
    const loginImage = JSON.parse(localStorage.getItem("ImageUrl") || "{}");
    const firstName = loginInfo.LoginFirstName;
    const lastName = loginInfo.LoginLastName;
    const uploadPImageUrl = loginImage.profileUploadImageUrl;

    console.log(uploadPImageUrl);

    const handleAudienceSelect = (audience) => {
        setSelectedAudience(audience); 
        setPostStatus(false); 
    };


    const getAudienceIcon = (audience) => {
        switch (audience) {
            case 'Everyone':
                return <FaUsers className='w-[16px] h-[16px] text-primary' />;
            case 'Neighbors':
                return <FaHome className='w-[16px] h-[16px] text-primary' />;
            case 'Followers':
                return <FaUserFriends className='w-[16px] h-[16px] text-primary' />;
            default:
                return null;
        }
    };

    const handlePostStatus = () => {
            setPostStatus(!postStatus)
    }

    const uploadImage = () => {
        if (uploadRef.current) {
            uploadRef.current.click(); 
        } else {
            console.log("ref is null");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            setImageFile(file);
            setImage(file);
            setIsEditing(false);
        }
    }

    const handleInput = (e) => {
        const target = e.target;
        target.style.height = 'auto'; 
        if (target.value === '') {
            target.style.height = '20px';
        } else {
            target.style.height = `${target.scrollHeight}px`;
        }
        
        setContent(target.value);
        setIsButtonDisabled(target.value.trim() === '');
        console.log(content);
    };

    const handlePostSubmit = async (e) => { 
        const startTimer = Date.now();
        e.preventDefault();
        setContent('');
        setImage(null);
        setImageFile(null);
        setpostLoading(true);
        const formData = new FormData();
        formData.append('description', content);
        formData.append('postType', selectedAudience.toUpperCase());
    
        if (imageFile) {
            formData.append('file', imageFile); 
        }

        const postData = {
            description: content,
            postType: selectedAudience.toUpperCase(),
            image: imageFile ? URL.createObjectURL(imageFile) : null, 
        };
        
        dispatch(setCurrentPost(postData))

        try {
            const result = await uploadPost(formData ).unwrap();
            console.log("Post uploaded successfully:", result);
            const endTimer = Date.now();
            const resultTime = endTimer - startTimer;
            console.log("Time taken to upload post:", resultTime);
            dispatch(addPost(result));

        } catch (error) {
            console.error("Failed to upload post:", error);
        }finally{
            setpostLoading(false);
            // setContent('');
            // setImage(null);
            // setImageFile(null);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Post uploaded successfully");
        }
        if (isError) {
            console.error("Failed to upload post");
        }
    })

    return (
        <section ref={statusRef}>
            <main className="flex flex-col items-center gap-[14px] p-[20px] rounded-[8px] self-stretch bg-background">
                <div className="flex flex-col items-center bg-background">

                    <div className="flex flex-col gap-[10px] items-start  self-stretch">
                        
                        <div className="flex items-start justify-between">

                            <div className="flex gap-[8px] w-[320px] responsive-post">

                                <div className="w-[38px] h-[38px]">
                                    <img src={profileImageUrl || uploadPImageUrl} className="w-[38px] h-[38px] rounded-full" alt="John" />
                                    <img src={active} className='relative top-[-11px] left-6' alt="Active" />
                               </div>

                                <div className='flex flex-col gap-2 items-start w-[250px]'>

                                    <div className='flex items-center h-[20px] gap-[8px]'>
                                        <span className='text-[16px] font-bold leading-8'>{`${firstName} ${lastName}`}</span>
                                        <img src={mark} alt="Mark" />
                                    </div>

                                    <div className='text-[14px] w-full font-normal text-[#7E7E8D]'>
                                        <textarea
                                            placeholder="Share Your Thought"
                                            className='outline-none w-full resize-none'
                                            value={content}
                                            onInput={handleInput}
                                            onClick={()=>setShowMedia(true)}
                                            style={{ overflow: 'hidden',  height: "20px" ,lineHeight : "1.2" }} // Set minimum height
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className={`flex justify-center p-[8px_20px] items-center rounded-[8px] h-[36px] bg-primary ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "opacity-1 cursor-pointer"}}`}>

                                <button onClick={handlePostSubmit} disabled={isButtonDisabled}>Post</button>

                            </div>
                        </div>

                        <div className='flex flex-col gap-1 items-start'>

                            <div className='flex gap-[12px]'>
                                <div className='w-[32px] h-[14px]'></div>

                                <div className='flex gap-[4px] items-center pointer' onClick={handlePostStatus}>
                                    {getAudienceIcon(selectedAudience)}
                                    <span className='text-[14px] text-primary font-medium leading-5'>{selectedAudience}</span>
                                </div>

                                {postStatus &&(
                                    <div className='flex flex-col gap-[10px] absolute items-start bg-accent left-16 top-200 z-20 p-[20px] w-[300px]'>
                                        <span>Who can see you post?</span>
                                        <span>Choose who can see your post.<br /></span>
                                        <span className='text-left'>Everyone you mentioned in the post can still see it.</span>
                                        <div className='flex flex-col gap-[5px]'>
                                            <div className='flex gap-[5px]' onClick={() => handleAudienceSelect('Everyone')}>
                                                <img src={publicIcon} className='w-[16px] h-[16px]' alt="Public Icon" />
                                                <span className='text-[14px] text-primary font-medium leading-5'>Everyone</span>
                                            </div>
                                            <div className='flex gap-[5px]' onClick={() => handleAudienceSelect('Neighbors')}>
                                                <img src={publicIcon} className='w-[16px] h-[16px]' alt="Public Icon" />
                                                <span className='text-[14px] text-primary font-medium leading-5'>Neighbor</span>
                                            </div>
                                            <div className='flex gap-[5px]'onClick={() => handleAudienceSelect('Followers')}>
                                                <img src={publicIcon} className='w-[16px] h-[16px]' alt="Public Icon" />
                                                <span className='text-[14px] text-primary font-medium leading-5'>Follower</span>
                                            </div>
                                        
                                        </div>

                                    </div>
                            )}

                            </div>

                            <div className='flex gap-[12px] items-center post-tag'>

                                <div className='w-[32px] h-[14px]'></div>

                                <div className='flex gap-[10px] responsive-post-tag'>
                                    <span className='text-[13px] font-normal leading-5'>Trending Now</span>

                                    <div className='flex gap-[8px]'>
                                        <span className='text-[13px] text-primary'>#appleevent</span>
                                        <span className='text-[13px] text-primary'>#ipone16</span>
                                        <span className='text-[13px] text-primary'>#myanmarwin</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {showMedia &&
                            <div className='flex items-start gap-[12px]'>

                                <div className='w-[36px] h-[14px]'></div>

                                <div className='flex flex-col gap-[5px]'>
                                    <div className="w-[340px] h-[1px] bg-accent responsive-post" ></div>

                                    {image ?
                                        (<div className='relative'>
                                            <img src={URL.createObjectURL(image)} className='w-[500px] h-[300px]'/>
                                            <div className='absolute top-2 right-2 p-1 bg-slate-50 bg-opacity-20 hover:bg-opacity-40 hover:float rounded-full'><i  className='text-accent'><IoCloseOutline /></i></div>
                                            <div className='absolute flex gap-[2px] top-2 left-2 px-2 py-[3px] rounded-[50px] bg-slate-50 bg-opacity-20 hover:bg-opacity-40'>
                                                <GrFormEdit className='text-accent'/>
                                                <span onClick={ uploadImage} className='text-[12px] text-accent'>Edit</span>
                                            </div>
                                        </div>) : 
                                        (<div className='flex gap-[10px]'>
                                            <i onClick={uploadImage}><GoImage size={25} className='text-primary'/></i>
                                            
                                            <i><PiGif size={25} className='text-primary'/></i>
                                        </div>)
                                    
                                    }
                                    <input ref={uploadRef} type='file' className='hidden' onChange={handleImageUpload}/>
                                    
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </main>
        </section>
    );
}

export default Post;
