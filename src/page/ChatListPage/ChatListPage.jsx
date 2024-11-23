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
import { filterMessageHandle , filteredMessages , handleLoading} from "./ChatListService.js";
import { setActiveMessageId } from "../../feature/chatSlice";

function ChatList({ activeChat, columnHandle, profileBox }) {
    const dispatch = useAppDispatch();
    const chatList = useAppSelector(selectChatList);
    const page = useAppSelector(selectPage);
    const limit = useAppSelector(selectLimit);
    const [bottomNavValue , setBottomValue] =useState("message");
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    const otherUserId = otherProfileDetail?.otherProfileDto.otherUserForProfileDto.id;  
    const {data:chatListData,isLoading,isSuccess} = useGetChatListQuery();
    const {data:chatHistoryData ,isSuccess:chatHistorySuccess ,isFetching , isLoading: chatHistoryLoading ,refetch} = useGetChatHistoryQuery({activeChatRoom , page, limit},{ skip: !activeChatRoom });
    console.log(chatHistoryData);
    console.log(activeChatRoom)

    useEffect(() => {
        if (isFetching && activeChatRoom) {
            handleLoading(isFetching);
        }
        else if (!isFetching && chatHistoryData) {
            handleLoading(isFetching);
        }
    }, [isFetching, activeChatRoom, chatHistoryData]);

    useEffect(()=>{
        if ( chatHistorySuccess && chatHistoryData) {
            filterMessageHandle(chatHistoryData);
            dispatch(setChatMessages({id: activeChatRoom , messages:filteredMessages}));
            console.log(filteredMessages);
            console.log(chatList);
        }
    },[dispatch, chatHistorySuccess, chatHistoryData])

    useEffect(() => {
        // Load from localStorage if available
        const storedChatList = JSON.parse(localStorage.getItem("combinedChatList") || "[]");
        console.log(storedChatList);
        if (storedChatList.length > 0) {
            dispatch(setChatList(storedChatList)); // Use stored data to populate chat list
        }
    }, [dispatch]);

    useEffect(()=>{
        if (isSuccess && chatListData) {
            console.log("successfully chatList",chatListData)
            const combinedChatList = [...data, ...chatListData.userDtoList];
            dispatch(setChatList(combinedChatList));
            localStorage.setItem("combinedChatList", JSON.stringify(combinedChatList));
        }
    },[isSuccess])

    // useEffect(() => {
    //     dispatch(setChatList(data));
    //     if (data.length > 0) {
    //         const defaultChatId = data[0].id;  
    //         dispatch(setActiveChat(defaultChatId));
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     if (otherUserId) {
    //         dispatch(setActiveChat(otherUserId));
    //     }
    // }, [dispatch, otherUserId]);


    const activeChatRoomHandle = (id) => {
        dispatch(setActiveChat(id));
        dispatch(setActiveMessageId(null));
    };

    return (
        <section className="relative">
            <div className="relative">
                <GuardModeToggle/>
                {bottomNavValue ==="message" &&
                     <ChatListNav2 activeChat={activeChat} profileBox={profileBox}/>
                }
                <ChatListBottomNav setBottomValue={setBottomValue} bottomNavValue={bottomNavValue}/>
                <div className={`xl:h-[92.6vh] 2xl:h-[93.9vh] overflow-y-auto scrollable chat-list-responsive bg-[#F8FCFD] ${bottomNavValue === "message" ? "pt-[60px]" : ""}`}>
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
