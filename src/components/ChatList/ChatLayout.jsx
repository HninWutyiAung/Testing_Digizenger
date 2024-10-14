import emma from '/images/Emma.jpg';
import badges from '/images/Badges.png';
import read from '/images/read.png';


function ChatLayout({activeChat, chat , activeChatRoomHandle}) {

    const lastMessage = chat.messages.length-1;

    return (
        <section onClick={() => activeChatRoomHandle(chat.id)}>
           
            <div className="flex  items-start gap-[12px] px-[18px] py-[15px] bg-[#F8FCFD]">
                <div className='flex items-center gap-[12px]'>
                        <div className="flex items-center justify-center w-[48px] h-[48px]">
                            <img src={emma} className='w-[48px] h-[48px]'/>
                        </div>
                        <div className='flex flex-col justify-center items-start'>
                            <div className='flex items-center justify-between gap-[2px] w-[240px] '>
                                <div className='flex items-center gap-[5px]'>
                                    <span className='text-[16px] font-bold leading-7'>{chat.title}</span>
                                    <img src={badges} className='w-[20px] h-[20px]'></img>
                                </div>
                                <div>
                                    <span className='text-[14px] text-[#7E7E8D] font-normal leading-5'>12:00PM</span>
                                </div>
                            </div>
                            <div className='flex items-start justify-between w-[220px]'>
                                <div className='text-[16px] font-normal leading-6 text-[#7E7E8D]'>
                                    <span>{chat.messages[lastMessage].content}</span>
                                </div>
                                <div className='w-[24px] h-[24px]'>
                                    <img src={read}></img>
                                </div>
                            </div>
                        </div>

                </div>
                
            </div>
        </section>
    )
}

export default ChatLayout;