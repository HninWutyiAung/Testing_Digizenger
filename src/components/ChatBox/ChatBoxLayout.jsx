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
import { FaCircleArrowUp , FaCircleStop } from "react-icons/fa6";
import ChatBoxUserStatusNav from "./ChatBoxUserStatusNav";
import { selectUserId } from "../../feature/authSlice";
import { useWebSocket } from "../Websocket/websocketForLikeNoti";
import WaveSurfer from 'wavesurfer.js';
import { compressBase64Image , isURL , isBase64 , startRecordingWithWaveform , stopRecordingWithWaveform , waveFormPreview} from "./chatBoxService";


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
    const selectedUserId = 6;
    const {sendMessageToWebsocket} = useWebSocket();
    const loginInfo = JSON.parse(localStorage.getItem("LoginInfo") || "{}");
    const userId = loginInfo.userId;
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBase64 , setAudioBase64] = useState(null);
    const canvasRef = useRef(null);
    const waveSurferRef = useRef(null);
    const waveformContainerRef = useRef(null);
    let senderId = null;

    console.log(activeChatRoom);
    console.log(chatList);

    useEffect(()=>{
        waveFormPreview(audioUrl, waveSurferRef, waveformContainerRef);
    }, [audioUrl, waveSurferRef]);

    useEffect(()=>{
        if(lastMessage.current){
            lastMessage.current.scrollIntoView({behavior: "smooth"})
        }
    },[message?.messages])

    const lastChatMessage = message?.messages[message.messages.length -1];

    if(lastChatMessage){
        senderId= lastChatMessage.senderId;
        console.log("sender Id ",senderId);
    }

    const handleStartRecording = () => {
        startRecordingWithWaveform(canvasRef, setAudioUrl,setAudioBase64 , audioBase64);
        setIsRecording(true);
        setInputStyle(true);
    };

    const handleStopRecording = () => {
        stopRecordingWithWaveform();
        setIsRecording(false);
        setInputStyle(true);
    };

    const sendMessage = (e) => {
        e.preventDefault(); 
        const recipientId = activeChatRoom === userId ? senderId : activeChatRoom;
        if (inputValue.trim()) {
            const textMessage = {
                message: inputValue.trim(),
                user: {"id" :userId},
                recipientId: recipientId,
                type: "TEXT",
            };

            dispatch(addMessageToChat({ recipientId: activeChatRoom, message: textMessage }));
            sendMessageToWebsocket(textMessage);
            console.log("textMessage",textMessage);
            setInputValue("");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result;
                const compressedImage = await compressBase64Image(base64, 0.6); // quality 60% set

                const imageLink = compressedImage.replace(/^data:image\/\w+;base64,/, "");
                const recipientId = activeChatRoom === userId ? senderId : activeChatRoom;
                const imageMessage = {
                    message: imageLink,
                    user: {id :userId},
                    recipientId: recipientId,
                    type: "IMAGE",
                };

                dispatch(addMessageToChat({ recipientId: activeChatRoom, message: imageMessage }));
                sendMessageToWebsocket(imageMessage);
                console.log("test image", chatList);
                console.log("base 64", reader.result);
                console.log("without prefix", imageLink);
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
            setInputValue("");
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
        <main className="relative">
            <img src={cover} className="chat-bg 2xl:w-[680px]"></img>
            <ChatBoxUserStatusNav message={message}/>
            <section className="flex flex-col items-start pt-[140px] px-[20px] gap-[20px]  relative overflow-y-auto scrollable chat-layout-responsive">
                {message?.messages.map((text,index) => (
                    <main key={text.id} className={`flex flex-col w-full ${text.recipientId === userId ? "sender" : "user"}`}>
                        <div className="chat-msg-container">
                            {text.recipientId === userId && (
                                <div className="w-[40px] h-[40px]">
                                    <img src={andrea} alt="User Avatar" />
                                </div>
                            )}

                            <div className="flex flex-col px-[16px] py-[4px] bg-[#ECF1F4] rounded-[12px] relative">
                                <div className="text-[#2C3E50] text-[16px] font-normal">
                                    {text.type === "IMAGE"? (
                                        <img src={isURL(text.message) ? text.message : `data:image/png;base64,${text.message}`} className="w-[200px] h-[200px]" alt="Uploaded content" />
                                    ) : (
                                        <span>{text.message}</span>
                                    )}
                                </div>
                                <div className={`text-right text-[12px] text-[#2C3E50] ${text.recipientId === userId  ? "mr-[-5px]" : "mr-[5px]"}`}>
                                    <span>12:00 PM</span>
                                </div>
                                <div className={`absolute top-[1.20rem] ${text.recipientId !== userId ? "right-[-15px]" : "left-[-11px]"}`} style={{ top: isURL(text.message) || isBase64(text.message) ? "12rem" : "" }}>
                                    <i className="text-[#ECF1F4]"><VscTriangleUp size={45} /></i>
                                </div>
                            </div>
                        </div>
                        {index === message.messages.length - 1 && (
                            <div ref={lastMessage}></div>
                        )}
                    </main>
                ))}
            </section>
            <div className="bg-accent w-full 2xl:w-[100%] flex items-center h-[70px] gap-[10px] 2xl:gap-[30px] px-[10px]">
                <div className="flex items-center gap-[16px]">
                    <img src={pluse} className="w-[28px] h-[28px]" alt="Plus icon" />
                    <i onClick={handleIconClick}>
                        <GoImage size={25} className="w-[28px] h-[28px]" />
                    </i>
                    <input type="file" ref={imgRef} onChange={handleImageUpload} className="hidden" />
                    { !isRecording ? (<img src={waveform}  onClick={handleStartRecording} className="w-[28px] h-[28px]" alt="Waveform icon" />):
                    
                    (<FaCircleStop size={25} className="w-[28px] h-[28px]" onClick={handleStopRecording} />)
                    }
                </div>
                <div ref={chatRef} className="flex items-center p-[4px]">
                    <form onSubmit={sendMessage} className="flex items-center p-[4px] relative ">
                        {isRecording ?
                         (<canvas ref={canvasRef} width="400" height="40" className="rounded-[27px]"></canvas>) : 

                         audioUrl ? (
                                <div className="w-[400px] rounded-[27px] bg-secondary"> <div ref={waveformContainerRef} className="w-[200px]"></div></div>
                         ) :

                         (<input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onClick={inputHandle}
                            placeholder="Message"
                            className="w-[390px] 2xl:w-[480px] h-[40px] rounded-[27px] px-[10px] outline-none responsive-chatbox-messagebox"
                        />)
                        }

                        
                        {inputStyle ? (
                            <i><FaCircleArrowUp className={`absolute top-3 right-3 w-[25px] h-[25px] text-[#0097A7] ${isRecording || audioUrl? "text-background" : "text-primary"}`} onClick={sendMessage}/></i>
                        ) : (
                            <img src={emoji} className="absolute right-2 bg-[2C3E50]" alt="Emoji icon" onClick={handleStopRecording}/>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ChatBoxLayout;
