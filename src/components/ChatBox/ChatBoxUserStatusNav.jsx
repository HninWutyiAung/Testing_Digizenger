import andrea from '/images/andrea.png';
import mark from '/images/mark2.png';
import { TbPhone } from "react-icons/tb";
import { IoVideocamOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { otherProfileDetail } from '../../page/OtherProfilePage/OtherProfilePage';

function ChatBoxUserStatusNav({message}){
    const firstName = otherProfileDetail?.otherProfileDto.otherUserForProfileDto.firstName;
    const lastName = otherProfileDetail?.otherProfileDto.otherUserForProfileDto.lastName;
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : "Emma";
    return(
        <section className='fixed top-[3.2rem] px-[10px] py-[8px] bg-[#ECF1F4] w-[30.4%] 2xl:w-[43.63%] z-20 chat-box-nav2-responsive'>
            <div className="flex justify-between items-center bg-[#ECF1F4]">
               <div className="flex items-center gap-[12px]">
                    <img src={andrea} className='w-[40px] h-[40px] rounded-[50%]'/>
                    <div className='flex flex-col items-start justify-center'>
                        <div className='flex items-center justify-center gap-[8px]'>
                            <span className='text-[#2C3E50] font-semibold text-[20px]'>{displayName} </span>
                            <img src={mark} />
                        </div>
                        <span className='text-[#7E7E8D] text-[14px]'>Online 12m ago</span>

                    </div>

               </div>
               <div className='flex items-center justify-center gap-[20px]'>
                    <i className='text-[#0097A7]'><TbPhone size={25}/></i>
                    <i className='text-[#0097A7]'><IoVideocamOutline size={25}/></i>
                    <i className='text-[#0097A7]'><HiOutlineDotsVertical size={25}/></i>
               </div>

            </div>
        </section>
    )
}

export default ChatBoxUserStatusNav;