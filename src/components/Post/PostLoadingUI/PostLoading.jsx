import badges from '/images/Badges.png';
import dot from '/images/dot.png';
import dotthree from '/images/dotthree.jpg';
import andrea from '/images/andrea.png';
import heart from '/images/heart2.jpg';
import flick from '/images/flick.png';
import graph from '/images/graph.png';
import heart1 from '/images/heart1.png';
import { useState  } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { EffectFlip } from 'swiper/modules';
import { useSetLikeOrUnlikeMutation } from '../../../apiService/Post.ts';


function PostLoading({activeChat, post , setPosts}) {
    const [clickHeart, setClickHeart] =useState(post.liked);
    const [showMore, setShowMore] = useState(false);
    const [count, setCount] = useState(0);
    const [setLikeOrUnlike] = useSetLikeOrUnlikeMutation();

    const postText = post.description;
    const wordLength =post.description.split(" ");

    const heartHandle = async () => {

        const newLikedState = !clickHeart;
        setClickHeart(newLikedState);

        // Optimistically update the like count based on the new liked state
        const updatedLikeCount = newLikedState ? post.likeCount + 1 : post.likeCount - 1;

        // Update the post state immediately with the new like count
        const updatedPost = {
            ...post,
            liked: newLikedState,
            likeCount: updatedLikeCount,
        };

        setPosts((prevPosts) =>
            prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
        );
        try {
          console.log(post.id);
          const response = await setLikeOrUnlike(post.id).unwrap();
          console.log(response);    
          const updatedPost = {...post};
          if (updatedPost.liked) {
            updatedPost.likeCount -= 1;
        } else {
            updatedPost.likeCount += 1;
        }
        updatedPost.liked = !updatedPost.liked;

        setClickHeart(updatedPost.liked);

        setPosts((prevPosts) =>
            prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
        );

        } catch (error) {
          console.error('Failed to update like:', error);
        }
      };

    const toggleShowMore = () => {
        setShowMore(!showMore);
        setCount((prevCount) => prevCount + 1);
    };


    return(
        <>
            <div className="flex flex-col items-start justify-center bg-white ">
                <div className="flex flex-col items-start gap-[16px]">
                    <div className="flex flex-col items-start gap-[12px] p-[10px] self-stretch">
                        <div className="flex justify-center items-center gap-[12px] self-stretch">
                            <div className='w-[48px] h-[48px]'>
                                <img src={andrea} className='rounded-[50px] w-[48px] h-[48px]'/>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-[8px]">
                                <div className="flex justify-between items-center self-stretch">
                                    <div className="flex items-center gap-[8px] w-[320px]">
                                        <div className="flex gap-[2px] items-center">
                                            <span className="font-bold leading-7 text-[#2C3E50] text-[15px]">Hnin wutyi aung</span>
                                            <img src={badges} className='w-[20px] h-[20px]'></img>
                                        </div>
                                        <div className='w-[4px] h-[4px]'>
                                            <img src={dot}></img>
                                        </div>
                                        <div>Just Now</div>
                                    </div>
                                    <div>
                                        <img src={dotthree}/>
                                    </div>
                                </div>
                                <div className='flex items-center gap-[8px] self-stretch'>
                                    <div className='text-[14px] font-normal leading-5 text-[#7E7E8D]'>Verified User</div>
                                    <img src={dot} className='w-[4px] h-[4px]'></img>
                                    <div className='text-[14px] font-normal leading-5 text-[#7E7E8D]'>12 Followers</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-[12px] self-stretch items-start'>
                                    <div className='w-[48px]'></div>

                                    <div className='w-[330px] text-[15px]  text-[#7E7E8D] font-normal leading-6  text-left text-ellipsis '>
                                          {showMore ? postText : postText.split(' ').slice(0, 20).join(' ') + '...'} 
                                          {wordLength>= 20 && (<button onClick={toggleShowMore} className='mr-[20px] text-black font-semibold ml-[5px]'>{showMore ? " show less" : "show more"}</button>)}
                                          {post.image ? (
                                                <img src={post.image} className='h-[200px] w-[300px] rounded-md mt-[10px]'/>
                                            ) : (
                                                " " 
                                           )}
                                    </div>

                                    

                            </div>
                        </div>
                        <div className='flex items-start gap-[12px] self-stretch' >
                            <div className='w-[48px] self-stretch'></div>

                            <div className='flex justify-between items-center flex-grow flex-shrink-0 basis-0 p-[2px]'>
                                <div className='flex items-center gap-[4px]'>
                                    <img src={heart} className='w-[16px] h-[16px]' onClick={heartHandle}/>
                                    <div className='text-[14px] font-medium leading-5 text-[#7E7E8D]'>
                                        12 other
                                    </div>
                                </div>
                                <div className='text-[14px] font-medium leading-5 text-[#7E7E8D]'>
                                    428 Flicks
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-start gap-[14px] self-stretch mb-[10px]'>

                        <div className='w-[55px] self-stretch'></div>

                        <div className='flex justify-between items-start flex-grow flex-shrink-0 basis-0'>
                            <div className='flex w-[96px] h-[28px] items-center gap-[8px]'>
                                {clickHeart ? (<img src={heart} className='w-[16px] h-[16px]' onClick={heartHandle}/>) : (<img src={heart1} className='w-[16px] h-[16px]' onClick={heartHandle}/>)}
                                <span className='text-[14px] font-medium leading-4'>Love</span>
                            </div>
                           
                            <div className='flex w-[96px] h-[28px] items-center gap-[8px]'>
                                <img src={flick} className='w-[24px] h-[24px]' alt="Flick Icon"></img>
                                <span className='text-[14px] font-medium leading-4'>flick</span>
                            </div>
                            
                            <div className='flex w-[96px] h-[28px] items-center gap-[8px]'>
                                <img src={graph} className='w-[24px] h-[24px]' alt="view Icon"></img>
                                <span className='text-[14px] font-medium leading-4'>View</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PostLoading;