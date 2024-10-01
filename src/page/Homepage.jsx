import NewFeed from "./NewFeed";
import ChatList from "./ChatListPage";
import { useState } from "react";
import ChatBox from "./ChatBoxPage";
import Profile from "./Profilepage";
import { Routes, Route, useNavigate } from "react-router-dom";
function Homepage (){

    const [activeChat, setActiveChat] = useState(false);

    const columnHandle =()=>{
        if(activeChat === true){
            return;
        }
        setActiveChat(!activeChat);
    }

    return(
        <section className={`grid ${activeChat ? "homepage_container" : " homepage_container_without_chat_room"}`}>
            <div>
            <Routes>
                    <Route index element={<NewFeed activeChat={activeChat} />} />
                    <Route path="/newfeed" element={<NewFeed activeChat={activeChat} />} />
                    <Route path="/profile" element={<Profile activeChat={activeChat}/>} />
            </Routes>
            </div>
            <div >
                <ChatList activeChat={activeChat} columnHandle={columnHandle} className="relative"/>
            </div>
            {activeChat &&(
                <div>
                     <ChatBox setActiveChat={setActiveChat}/>
                </div>
            )

            }
        </section>
    )
}

export default Homepage;