import NewFeed from "./NewFeed";
import ChatList from "./ChatListPage";
import { useState } from "react";
import ChatBox from "./ChatBoxPage";
import Profile from "./ProfilePage/Profilepage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { selectProfileBox , selectCoverBox } from "../feature/profileSlice";
import { useAppSelector } from "../hook/Hook";
import ProfileEditBox from "../components/Profile/ProfileEditBox";
import CoverEditBox from "../components/Profile/CoverEditBox";
import { selectActiveChatRoom} from "../feature/chatSlice";
import ProfileInformation from "../components/Profile_Information/ProfileInformation";
import OtherProfile from "./OtherProfilePage/OtherProfilePage.jsx";
function Homepage (){

    const [activeChat, setActiveChat] = useState(true);
    const profileBox = useAppSelector(selectProfileBox);
    const coverBox = useAppSelector(selectCoverBox);
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    console.log(profileBox)

    const columnHandle =()=>{
        if(activeChat === true){
            return;
        }
        setActiveChat(!activeChat);
    }

    //For check profile route
    const showChatList = window.location.pathname.includes("/profile");

    return(
        <section className="homepage_container">
            <div>
                <Routes>
                        <Route index element={<NewFeed activeChat={activeChat} />} />
                        <Route path="/newfeed" element={<NewFeed activeChat={activeChat} />} />
                        <Route path="/profile" element={<Profile activeChat={activeChat}/>} />
                        <Route path="/profile/:otherUserName" element={<OtherProfile/>} />
                </Routes>
            </div>
            {showChatList ? (
                <div>
                    <div>
                        <ProfileInformation/>
                    </div>
                </div>
            ):
               ( <div >
                    <ChatList activeChat={activeChat} columnHandle={columnHandle} profileBox={profileBox} className="relative"/>
                </div>)
            }
            {activeChatRoom && (
                <div className="responsive-chatbox-column">
                    <ChatBox activeChatRoom={activeChatRoom} />
                </div>
            )}
            {profileBox && (
                <>
                    <div className="home-cover"></div>
                    <ProfileEditBox />
                </>
            )}

            {coverBox && (
                <>
                    <div className="home-cover"></div>
                    <CoverEditBox />
                </>
            )}
        </section>
    )
}

export default Homepage;