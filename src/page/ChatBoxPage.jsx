import ChatBoxLayout from "../components/ChatBox/ChatBoxLayout";
import ChatBoxNav from "../components/ChatBox/ChatBoxNav";

function ChatBox ({setActiveChat}){
    return(
        <section>
            <ChatBoxNav setActiveChat={setActiveChat}/>
            <ChatBoxLayout/>
        </section>
        
    )
}

export default ChatBox;