import toogleRight from "/images/toogle right.png"


function ChatListNav({activeChat}){

    return(
        <section className="flex justify-between items-center w-full flex-shrink-0 py-[4px] px-[25px] bg-white border-b border-[#ECF1F4] absolute ">
            <div className="text-[28px] font-bold">
                Message
            </div>
            <div className="flex items-center gap-[8px]">
                <span className="text-[16px] font-bold leading-6 text-[#2C3E50]"></span>
                <img src={toogleRight} ></img>
            </div>
        </section>
    )
}

export default ChatListNav;