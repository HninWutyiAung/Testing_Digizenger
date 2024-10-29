import emma from '/images/emma.jpg';
import threeDot from '/images/dotthree.jpg';
import { formatDistanceToNow } from 'date-fns';
import { customLocale } from '../../Post/AllPostForNewfeed/ShowPostService';

function FollowNotiLayout ({noti}){
    const createdDate = noti.createDate; 
    const utcDate = new Date(createdDate);
    const timeAgo = formatDistanceToNow(utcDate, { addSuffix: true ,locale: customLocale});


    const text = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt alias dolorem corporis non labore vitae modi?";
    return(
        <div className="flex flex-col items-start self-stretch w-full px-[10px]">
            <div className="flex items-center justify-start self-stretch gap-[5px] ">
                <div className='h-[40px] w-[45px]'>
                   <img src={emma} className='h-[40px] w-[40px] rounded-full'/>
                </div>
                <div className='flex flex-col self-stretch w-full'>
                    <div className='flex justify-between self-stretch items-end '>
                        <div className='text-[14px] text-darkBlue leading-6 '>
                            <span className='font-bold'>{noti.message}</span>
                        </div>
                        <div className='items-center'>
                            <span className='text-[10px] leading-6 font-normal text-textGrey2'>{timeAgo}</span>
                        </div>
                    </div>
                    <div className='flex justify-between self-stretch items-start'>
                        <div className='bg-primary w-[110px] h-[25px]  rounded-[100px]  hover:bg-secondary px-[14px] '>
                            <div className='hover:scale-[1.12]  w-[80px] h-[24px] rounded-[100px] '>
                                <button className=' text-[12px] font-bold text-background leading-5 '>Follow back</button>
                            </div>
                            
                        </div>
                        <div className='h-[32px] w-[32px]'>
                            <img src={threeDot} className='text-black'/>
                        </div>
                    </div>

                </div>

            </div>
            <div className='self-stretch h-[1px] bg-accent'></div>
        </div>
    )
}

export default FollowNotiLayout;  
