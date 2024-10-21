import { BsChatDotsFill } from "react-icons/bs";
import { TbPhoneFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ChatListBottomNav ({setBottomValue,bottomNavValue }) {
    const [activeButton, setActiveButton] = useState ("message");
    console.log(setBottomValue)
    const buttonHandle = (value) => {
        console.log(value)
        setActiveButton(value);
        setBottomValue(value);
        console.log(bottomNavValue);
    }
    return (
        <section className="flex items-center justify-center rounded-t-[10px] w-[100%] bg-[#5f6d7b] absolute custom-blur bottom-0">
            <div className="flex flex-col justify-center items-center gap-[2px] w-[100px] h-[70px] " onClick={()=> buttonHandle("message")}>
                <i className={`flex h-[30px] w-[30px]  items-center justify-center ${activeButton === "message" ? " text-white" : "text-[#ECF1F4]"}`} ><BsChatDotsFill size={30}/></i>
                <div className={`flex text-[12px] font-medium leading-5   ${activeButton === "message" ? " text-white" : "text-[#ECF1F4]"}`}>Messages</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[2px] w-[100px] h-[70px]" onClick={()=>buttonHandle("call")}>
                <i className={`flex h-[30px] w-[30px]  items-center  justify-center ${activeButton === "call" ? " text-white" : "text-[#ECF1F4]"}`}><TbPhoneFilled size={30}/></i>
                <div className={`text-[12px] font-medium leading-5   ${activeButton === "call" ? " text-white" : "text-[#ECF1F4]"}`}>Recent Calls</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[2px] w-[100px] h-[70px] " onClick={()=>buttonHandle("noti")}>
                <i className={`flex h-[30px] w-[30px]  items-center justify-center ${activeButton === "noti" ? " text-white" : "text-[#ECF1F4]"}`}><IoMdNotifications size={30}/></i>
                <div className={`text-[12px] font-medium leading-5  ${activeButton === "noti" ? " text-white" : "text-[#ECF1F4]"}`}>Notifications</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[2px] w-[100px] h-[70px]" onClick={()=> buttonHandle("setting")}>
                <i className={`flex h-[30px] w-[30px]  items-center justify-center ${activeButton === "setting" ? " text-white" : "text-[#ECF1F4]"}`}><IoMdSettings size={30}/></i>
                <div className={`text-[12px] font-medium leading-5  ${activeButton === "setting" ? " text-white" : "text-[#ECF1F4]"}`}>Settings</div>
            </div>
        </section>
    )
}

export default ChatListBottomNav;