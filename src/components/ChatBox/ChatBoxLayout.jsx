import { useAppDispatch, useAppSelector } from "../../hook/Hook";
import { selectActiveChatRoom, selectChatList , addMessageToChat } from "../../feature/chatSlice";
import cover from '../../../images/chat bg.png'
import andrea from '/images/andrea.png';
import { PiChatTeardropFill } from "react-icons/pi";
import { VscTriangleUp } from "react-icons/vsc";
import pluse from '/images/pluse-bottom.png';
import { GoImage } from "react-icons/go";
import waveform from '/images/waveform.png';
import emoji from '/images/emoji.png';
import { useState, useRef, useEffect } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import ChatBoxUserStatusNav from "./ChatBoxUserStatusNav";

function ChatBoxLayout () {
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    const dispatch = useAppDispatch();
    const chatList = useAppSelector(selectChatList);
    const [inputStyle, setInputStyle] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const imgRef = useRef(null);
    const chatRef = useRef(null);
    const lastMessage = useRef(null);
    const message = chatList.find((msg) => msg.id === activeChatRoom);
    const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9); 

    console.log(activeChatRoom);
    console.log(chatList);
    useEffect(()=>{
        if(lastMessage.current){
            lastMessage.current.scrollIntoView({behavior: "smooth"})
        }
    },[message.messages])



    const sendMessage = (e) => {
        e.preventDefault(); 
        if (inputValue.trim()) {
            const textMessage = {
                id: generateUniqueId(),
                content: inputValue.trim(),
                sender: "user",
                timestamp: new Date().toLocaleTimeString(),
            };
            dispatch(addMessageToChat({ chatId: activeChatRoom, message: textMessage }));
            setInputValue("");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const imageMessage = {
                    id: generateUniqueId(),
                    content: reader.result,
                    sender: "user",
                    timestamp: new Date().toLocaleTimeString(),
                };
                dispatch(addMessageToChat({ chatId: activeChatRoom, message: imageMessage }));
                setImageFile(null); 
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
        }
    };

    const inputHandle = () => {
        setInputStyle(true);
    };

    const handleClickOutside = (e) => {
        if (chatRef.current && !chatRef.current.contains(e.target)) {
            setInputStyle(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleIconClick = () => {
        imgRef.current.click(); 
    };

    return (
        <main className="">
            {/* <img src={cover} className="chat-bg"></img> */}
            <ChatBoxUserStatusNav message={message}/>
            <section className="flex flex-col items-start pt-[150px] px-[20px] gap-[20px]  relative overflow-y-auto scrollable chat-layout-responsive">
                {message.messages.map((text,index) => (
                    <main key={text.id} className={`flex flex-col w-full ${text.sender === "server" ? "sender" : "user"}`}>
                        <div className="chat-msg-container">
                            {text.sender === "server" && (
                                <div className="w-[40px] h-[40px]">
                                    <img src={andrea} alt="User Avatar" />
                                </div>
                            )}

                            <div className="flex flex-col px-[16px] py-[4px] bg-[#ECF1F4] rounded-[12px] relative">
                                <div className="text-[#2C3E50] text-[16px] font-normal">
                                    {text.content.startsWith('data:image') ? (
                                        <img src={text.content} className="w-[200px] h-[200px]" alt="Uploaded content" />
                                    ) : (
                                        <span>{text.content}</span>
                                    )}
                                </div>
                                <div className={`text-right text-[12px] text-[#2C3E50] ${text.sender === "user" ? "mr-[5px]" : ""}`}>
                                    <span>{text.timestamp}</span>
                                </div>
                                <div className={`absolute top-4 ${text.sender === "user" ? "right-[-15px]" : "left-[-11px]"}`} style={{ top: text.content.startsWith('data:image') ? "12rem" : "" }}>
                                    <i className="text-[#ECF1F4]"><VscTriangleUp size={50} /></i>
                                </div>
                            </div>
                        </div>
                        {index === message.messages.length - 1 && (
                            <div ref={lastMessage}></div>
                        )}
                    </main>
                ))}
            </section>
            <div className="bg-[#ECF1F4] w-full flex items-center h-[70px] gap-[10px] px-[10px]">
                <div className="flex items-center gap-[16px]">
                    <img src={pluse} className="w-[28px] h-[28px]" alt="Plus icon" />
                    <i onClick={handleIconClick}>
                        <GoImage size={25} className="w-[28px] h-[28px]" />
                    </i>
                    <input type="file" ref={imgRef} onChange={handleImageUpload} className="hidden" />
                    <img src={waveform} className="w-[28px] h-[28px]" alt="Waveform icon" />
                </div>
                <div ref={chatRef} className="flex items-center p-[4px]">
                    <form onSubmit={sendMessage} className="flex items-center p-[4px] relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onClick={inputHandle}
                            className="w-[390px] h-[40px] rounded-[27px] px-[10px] outline-none responsive-chatbox-messagebox"
                        />
                        {!inputStyle && <span className="absolute left-4 text-[#ECF1F4]">Message</span>}
                        {inputStyle ? (
                            <i><FaCircleArrowUp className="absolute top-3 right-3 w-[25px] h-[25px] text-[#0097A7]" onClick={sendMessage}/></i>
                        ) : (
                            <img src={emoji} className="absolute right-2 bg-[2C3E50]" alt="Emoji icon" />
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ChatBoxLayout;
