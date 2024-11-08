import data from "../../data.jsx";
import ChatLayout from "../../components/ChatList/ChatLayout.jsx";
import { setChatList, setActiveChat, selectChatList, selectActiveChatRoom ,setChatMessages} from "../../feature/chatSlice";
import { useEffect , useState } from "react";
import { useAppDispatch, useAppSelector } from '../../hook/Hook.ts';
import ChatListNav2 from "../../components/ChatList/ChatListNav2.jsx";
import ChatListBottomNav from "../../components/ChatList/ChatListBottomNav.jsx";
import GuardModeToggle from "../../components/Profile_Information/ProfileMiddleColumnCollection/GuardModeToggle.jsx";
import Noti from "../../components/Notification/LikeNoti/Noti.jsx";
import { otherProfileDetail } from "../OtherProfilePage/OtherProfilePage.js";
import { useGetChatListQuery , useGetChatHistoryQuery} from "../../apiService/Chat.ts";
import { selectPage, selectLimit } from "../../feature/chatPageAndLimit.ts";
import { filterMessageHandle , filteredMessages } from "./ChatListService.js";

function ChatList({ activeChat, columnHandle, profileBox }) {
    const dispatch = useAppDispatch();
    const chatList = useAppSelector(selectChatList);
    const page = useAppSelector(selectPage);
    const limit = useAppSelector(selectLimit);
    const [bottomNavValue , setBottomValue] =useState("message");
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    const otherUserId = otherProfileDetail?.otherProfileDto.otherUserForProfileDto.id;  
    const {data:chatListData,isLoading,isSuccess} = useGetChatListQuery();
    const {data:chatHistoryData ,isSuccess:chatHistorySuccess , isLoading: chatHistoryLoading } = useGetChatHistoryQuery({activeChatRoom , page, limit});
    console.log(chatHistoryData);
    console.log(activeChatRoom)

    useEffect(()=>{
        if (chatHistorySuccess && chatHistoryData) {
            filterMessageHandle(chatHistoryData);
            dispatch(setChatMessages({id: activeChatRoom , messages:filteredMessages}));
            console.log(filteredMessages);
            console.log(chatList);
        }
    },[dispatch, chatHistorySuccess, chatHistoryData])

    useEffect(()=>{
        if (isSuccess && chatListData) {
            const combinedChatList = [...data, ...chatListData.userDtoList];
            dispatch(setChatList(combinedChatList));
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
    };

    return (
        <section className="relative">
            <div className="relative ">
                <GuardModeToggle/>
                {bottomNavValue ==="message" &&
                     <ChatListNav2 activeChat={activeChat} profileBox={profileBox}/>
                }
                <ChatListBottomNav setBottomValue={setBottomValue} bottomNavValue={bottomNavValue}/>
                <div className={` overflow-y-auto scrollable chat-list-responsive ${bottomNavValue === "message" ? "pt-[60px]" : ""}`}>
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
