import ChatListNav from "../components/ChatList/ChatListNav.jsx";
import data from "../data";
import ChatLayout from "../components/ChatList/ChatLayout";
import { setChatList, setActiveChat, selectChatList, selectActiveChatRoom } from "../feature/chatSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hook/Hook.ts';
import ChatListNav2 from "../components/ChatList/ChatListNav2.jsx";
import ChatListBottomNav from "../components/ChatList/ChatListBottomNav.jsx";

function ChatList({ activeChat, columnHandle, profileBox }) {
    const dispatch = useAppDispatch();
    const chatList = useAppSelector(selectChatList);

    useEffect(() => {
        dispatch(setChatList(data));
        if (data.length > 0) {
            const defaultChatId = data[0].id;  // Set the first chat as default
            dispatch(setActiveChat(defaultChatId));
        }
    }, [dispatch]);

    // Correct function invocation for click event
    const activeChatRoomHandle = (id) => {
        dispatch(setActiveChat(id));
        console.log(id)
    };

    console.log(chatList);
    return (
        <section className="relative">
            <div className="relative">
                <ChatListNav />
                <ChatListNav2 activeChat={activeChat} profileBox={profileBox}/>
                <ChatListBottomNav/>
                <div className="h-[945px] overflow-y-auto scrollable pt-[110px] chat-list-responsive">
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
                    <ChatListBottomNav activeChat={activeChat}/>
                </div>
                
                
            </div>
        </section>
    );
}

export default ChatList;
