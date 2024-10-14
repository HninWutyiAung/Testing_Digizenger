import NewFeed from "./NewFeed";
import ChatList from "./ChatListPage";
import { useState } from "react";
import ChatBox from "./ChatBoxPage";
import Profile from "./Profilepage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { selectProfileBox } from "../feature/profileSlice";
import { useAppSelector } from "../hook/Hook";
import ProfileEditBox from "../components/Profile/ProfileEditBox";
import { selectActiveChatRoom} from "../feature/chatSlice";
function Homepage (){

    const [activeChat, setActiveChat] = useState(true);
    const profileBox = useAppSelector(selectProfileBox);
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    console.log(profileBox)

    const columnHandle =()=>{
        if(activeChat === true){
            return;
        }
        setActiveChat(!activeChat);
    }

    return(
        <section className="homepage_container">
            <div>
            <Routes>
                    <Route index element={<NewFeed activeChat={activeChat} />} />
                    <Route path="/newfeed" element={<NewFeed activeChat={activeChat} />} />
                    <Route path="/profile" element={<Profile activeChat={activeChat}/>} />
            </Routes>
            </div>
            <div >
                <ChatList activeChat={activeChat} columnHandle={columnHandle} profileBox={profileBox} className="relative"/>
            </div>
            {activeChatRoom && (
                <div>
                    <ChatBox activeChatRoom={activeChatRoom} />
                </div>
            )}
            {profileBox && (
                <>
                    <div className="home-cover"></div>
                    <ProfileEditBox />
                </>
            )}
        </section>
    )
}

export default Homepage;