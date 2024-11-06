import ChatListNav from "../components/ChatList/ChatListNav.jsx";
import data from "../data";
import ChatLayout from "../components/ChatList/ChatLayout";
import { setChatList, setActiveChat, selectChatList, selectActiveChatRoom } from "../feature/chatSlice";
import { useEffect , useState } from "react";
import { useAppDispatch, useAppSelector } from '../hook/Hook.ts';
import ChatListNav2 from "../components/ChatList/ChatListNav2.jsx";
import ChatListBottomNav from "../components/ChatList/ChatListBottomNav.jsx";
import GuardModeToggle from "../components/Profile_Information/ProfileMiddleColumnCollection/GuardModeToggle.jsx";
import Noti from "../components/Notification/LikeNoti/Noti.jsx";
import { otherProfileDetail } from "./OtherProfilePage/OtherProfilePage.js";
import { useGetChatListQuery } from "../apiService/Chat.ts";

function ChatList({ activeChat, columnHandle, profileBox }) {
    const dispatch = useAppDispatch();
    const chatList = useAppSelector(selectChatList);
    const [bottomNavValue , setBottomValue] =useState("message");
    const otherUserId = otherProfileDetail?.otherProfileDto.otherUserForProfileDto.id;  
    const {data:chatListData,isLoading,isSuccess} = useGetChatListQuery();
    console.log(bottomNavValue);
    console.log(setBottomValue);

    useEffect(()=>{
        if(isSuccess){
            console.log(chatListData);
            dispatch(setChatList(chatListData.userDtoList));
        }
    },[isSuccess])

    useEffect(() => {
        dispatch(setChatList(data));
        if (data.length > 0) {
            const defaultChatId = data[0].id;  
            dispatch(setActiveChat(defaultChatId));
        }
    }, [dispatch]);

    useEffect(() => {
        if (otherUserId) {
            dispatch(setActiveChat(otherUserId));
        }
    }, [dispatch, otherUserId]);


    const activeChatRoomHandle = (id) => {
        dispatch(setActiveChat(id));
        console.log(id)
    };

    return (
        <section className="relative">
            <div className="relative">
                <GuardModeToggle/>
                {bottomNavValue ==="message" &&
                     <ChatListNav2 activeChat={activeChat} profileBox={profileBox}/>
                }
                <ChatListBottomNav setBottomValue={setBottomValue} bottomNavValue={bottomNavValue}/>
                <div className={`h-[945px] overflow-y-auto scrollable chat-list-responsive ${bottomNavValue === "message" ? "pt-[60px]" : ""}`}>
                    {bottomNavValue ==="message" &&
                        <div onClick={columnHandle}>
                            {chatList.map((chat) => (                            
                                    <ChatLayout
                                    key={chat.id}
                                    chat={chat}
                                    activeChat={activeChat}
                                    activeChatRoomHandle={activeChatRoomHandle}
                                />
                            ))}
                        </div>
                    }

                    {bottomNavValue==="noti"&& 
                        <div className="">
                            <Noti/>
                        </div>
                    
                    }

                </div>
                
                
            </div>
        </section>
    );
}

export default ChatList;
