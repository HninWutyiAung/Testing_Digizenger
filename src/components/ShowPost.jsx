import badges from '/images/Badges.png';
import dot from '/images/dot.png';
import dotthree from '/images/dotthree.jpg';
import andrea from '/images/andrea.png';
import heart from '/images/heart2.jpg';
import flick from '/images/flick.png';
import graph from '/images/graph.png';
import heart1 from '/images/heart1.png';
import { useState } from 'react';


function ShowPost({activeChat, post}) {
    const [clickHeart, setClickHeart] =useState(true);
    const [showMore, setShowMore] = useState(false);
    const [count, setCount] = useState(0);
    const postText = post.description;

    const heartHandle = ()=>{
        setClickHeart(!clickHeart);
    }

    const toggleShowMore = () => {
        setShowMore(!showMore);
        setCount((prevCount) => prevCount + 1);
    };

    console.log("Uploading post with data:", 
       post.description , post.imageUrl
    );

    return(
        <>
            <div className="flex flex-col items-start justify-center rounded-[8px] bg-white ">
                <div className="flex flex-col items-start gap-[16px]">
                    <div className="flex flex-col items-start gap-[12px] p-[10px] self-stretch">
                        <div className={activeChat ? "flex justify-center items-center gap-[12px] self-stretch" : "flex justify-center items-center gap-[20px] self-stretch" }>
                            <div className='w-[48px] h-[48px]'>
                                <img src={andrea}/>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-[8px]">
                                <div className="flex justify-between items-center self-stretch">
                                    <div className={activeChat ? "flex items-center gap-[8px] w-[320px]" : "flex items-center gap-[8px] w-[500px]"}>
                                        <div className="flex gap-[2px] items-center">
                                            <span className="text-[20px] font-blod leading-7 text-[#2C3E50]">{`${post.userDto.firstName} ${post.userDto.lastName}`}</span>
                                            <img src={badges} className='w-[20px] h-[20px]'></img>
                                        </div>
                                        <div className='w-[4px] h-[4px]'>
                                            <img src={dot}></img>
                                        </div>
                                        <div>4m</div>
                                    </div>
                                    <div>
                                        <img src={dotthree}/>
                                    </div>
                                </div>
                                <div className='flex items-center gap-[8px] self-stretch'>
                                    <div className='text-[14px] font-normal leading-5 text-[#7E7E8D]'>Verified User</div>
                                    <img src={dot} className='w-[4px] h-[4px]'></img>
                                    <div className='text-[14px] font-normal leading-5 text-[#7E7E8D]'>{post.userDto.followers} Followers</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={activeChat ? 'flex gap-[12px] self-stretch items-start' : 'flex gap-[20px] self-stretch items-start'}>
                                    <div className='w-[48px]'></div>

                                    <div className={activeChat ? 'w-[330px] text-[15px]  text-[#7E7E8D] font-normal leading-6  text-left text-ellipsis ' : 'w-[500px] text-[15px]  text-[#7E7E8D] font-normal leading-6  text-justify text-ellipsis '}>
                                          {showMore ? postText : postText.split(' ').slice(0, 20).join(' ') + '...'} 
                                          <button onClick={toggleShowMore} className='mr-[20px] text-black font-semibold ml-[5px]'>{showMore ? " show less" : "show more"}</button>
                                          {post.imageUrl ? (
                                                <img src={post.imageUrl}  />
                                            ) : (
                                                " " 
                                           )}
                                    </div>

                                    

                            </div>
                        </div>
                        <div className={ activeChat ? 'flex items-start gap-[12px] self-stretch' : 'flex items-start gap-[20px] self-stretch'}>
                            <div className='w-[48px] self-stretch'></div>

                            <div className='flex justify-between items-center flex-grow flex-shrink-0 basis-0 p-[2px]'>
                                <div className={activeChat ? 'flex items-center gap-[4px]' : 'flex items-center gap-[10px]'}>
                                    <img src={heart} className='w-[16px] h-[16px]' onClick={heartHandle}/>
                                    <div className='text-[14px] font-medium leading-5 text-[#7E7E8D]'>
                                        You and 1.2K other
                                    </div>
                                </div>
                                <div className='text-[14px] font-medium leading-5 text-[#7E7E8D]'>
                                    428 Flicks
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={activeChat ? 'flex items-start gap-[14px] self-stretch mb-[10px]': 'flex items-start gap-[24px] self-stretch mb-[10px]'}>

                        <div className='w-[55px] self-stretch'></div>

                        <div className='flex justify-between items-start flex-grow flex-shrink-0 basis-0'>
                            <div className='flex w-[96px] h-[28px] items-center gap-[8px]'>
                                {clickHeart ? (<img src={heart1} className='w-[16px] h-[16px]' onClick={heartHandle}/>) : (<img src={heart} className='w-[16px] h-[16px]' onClick={heartHandle}/>)}
                                <span className='text-[14px] font-medium leading-4'>Love</span>
                            </div>
                           
                            <div className='flex w-[96px] h-[28px] items-center gap-[8px]'>
                                <img src={flick} className='w-[24px] h-[24px]'></img>
                                <span className='text-[14px] font-medium leading-4'>flick</span>
                            </div>
                            
                            <div className='flex w-[96px] h-[28px] items-center gap-[8px]'>
                                <img src={graph} className='w-[24px] h-[24px]'></img>
                                <span className='text-[14px] font-medium leading-4'>View</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowPost;