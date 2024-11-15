import { useAppDispatch, useAppSelector } from "../../hook/Hook";
import { selectActiveChatRoom, selectChatList , addMessageToChat } from "../../feature/chatSlice";
import default_profile from "../../../images/default_profile.jpg";
import cover from '../../../images/chat bg.png'
import andrea from '/images/andrea.png';
import { PiChatTeardropFill } from "react-icons/pi";
import { VscTriangleUp } from "react-icons/vsc";
import pluse from '/images/pluse-bottom.png';
import { GoImage } from "react-icons/go";
import waveform from '/images/waveform.png';
import smile from '../../../images/emoji.png';
import { useState, useRef, useEffect } from "react";
import { FaCircleArrowUp , FaCircleStop } from "react-icons/fa6";
import ChatBoxUserStatusNav from "./ChatBoxUserStatusNav";
import { selectUserId } from "../../feature/authSlice";
import { useWebSocket } from "../Websocket/websocketForLikeNoti";
import WaveSurfer from 'wavesurfer.js';
import { BsFillXCircleFill } from "react-icons/bs";
import { messageLoading } from "../../page/ChatListPage/ChatListService";
import { handleEmojiToggle } from "../Emoji/EmojiService";
import { handleReaction , selectReactions} from "../../feature/reactionSlice";
import {RingLoader} from 'react-spinners';
import EmojiReactions from "../Emoji/Emoji";
import MessageReactions from "./MessageReaction";
import { otherProfileDetail } from "../../page/OtherProfilePage/OtherProfilePage";
import { mergeRaction } from "./chatBoxService";
import { compressBase64Image ,
     isURL , 
     isBase64 , 
     startRecordingWithWaveform ,
     stopRecordingWithWaveform , 
     waveFormPreview ,
     compressAudioBase64} from "./chatBoxService";


function ChatBoxLayout () {
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    const dispatch = useAppDispatch();
    const chatList = useAppSelector(selectChatList);
    const [inputStyle, setInputStyle] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [emojiToggle , setEmojiToggle] = useState(null);
    const [emoji , setEmoji] = useState("");
    const imgRef = useRef(null);
    const chatRef = useRef(null);
    const lastMessage = useRef(null);
    const message = chatList.find((msg) => msg.id === activeChatRoom);
    const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9); 
    const selectedUserId = 6;
    const {sendMessageToWebsocket , sendReactionToWebsocket} = useWebSocket();
    const loginInfo = JSON.parse(localStorage.getItem("LoginInfo") || "{}");
    const userId = loginInfo.userId;
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBase64 , setAudioBase64] = useState(null);
    const [audioLink , setAudioLink] = useState(null);
    const [deleteAudio, setDeleteAudio] = useState(false);
    const canvasRef = useRef(null);
    const waveSurferRef = useRef(null);
    const waveformContainerRef = useRef(null);
    const reactionList = useAppSelector(selectReactions);
    let senderId = null;
    console.log(reactionList);
    const profileImage = message?.profileDto?.profileImageUrl ;
    const chatListFirstName = otherProfileDetail?.otherProfileDto.otherUserForProfileDto.firstName;

    console.log("this is active chat room no:",activeChatRoom);
    console.log("this is chat list",chatList);


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

    const handleReact = (emojiCode, messageId) =>{
        setEmoji(emojiCode);
        const emojiMessage = {
            chatType : "SINGLE",
            messageId : messageId,
            emojiUtf8 :[emojiCode],
            userId : userId,
        }

        const emojiMessageForWebSocket = {
            chatType: "SINGLE",
            messageId: messageId,
            emojiUtf8: emojiCode,  // Send emojiUtf8 as a string for WebSocket
            userId: userId,
        };

        dispatch(handleReaction(emojiMessage));
        sendReactionToWebsocket(emojiMessageForWebSocket);
    }

    const handleStartRecording = () => {
        startRecordingWithWaveform(canvasRef, setAudioUrl,setAudioBase64 , audioBase64);
        setIsRecording(true);
        setInputStyle(true);
    };

    const handleStopRecording = async() => {
        stopRecordingWithWaveform();
        setIsRecording(false);
        setDeleteAudio(true);
        setInputStyle(true);
        if (audioBase64) {
            try {
                console.log("hello")
                const compressedAudioBase64 = await compressAudioBase64(audioBase64, 0.2);
                console.log("Compressed Audio:", compressedAudioBase64);
                setAudioLink(compressedAudioBase64);
                
                console.log("ff", audioLink);
            } catch (error) {
                console.error("Error compressing audio:", error);
            }
        }

    };

    const handleDeleteAudio = () => {
        setAudioUrl(null);
        setAudioBase64(null);
        setDeleteAudio(false);
        setInputStyle(false);
    }

    const sendMessage =  (e) => {
        e.preventDefault(); 

        const recipientId = activeChatRoom === userId ? senderId : activeChatRoom;
        if (inputValue.trim() || audioUrl) {  
            const messageContent =  audioBase64 || inputValue.trim();  
            const messageType = audioUrl ? "AUDIO" : "TEXT"; 
            const textMessage = {
                id: generateUniqueId(),
                message: messageContent,
                user: {"id" :userId},
                recipientId: recipientId,
                type: messageType,
            };

            dispatch(addMessageToChat({ recipientId: activeChatRoom,firstName:chatListFirstName , message: textMessage }));
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
                    id: generateUniqueId(),
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
            <section className="flex flex-col items-start pt-[140px] px-[20px] gap-[20px]  relative overflow-y-auto scrollable chat-layout-responsive" >
                { messageLoading ? 
                (<div className="absolute lg:top-[18rem] lg:left-[13rem] xl:top-[18rem] xl:left-[16.5rem] 2xl:top-[22rem] 2xl:left-[19rem]">
                    <RingLoader color="#0097A7" size={50} loading={messageLoading} />
                 </div>) :
                (message?.messages.map((text,index) => (
                    <main key={text.id} className={`flex flex-col w-full relative ${text.recipientId === userId ? "sender" : "user"}`} onClick={()=> handleEmojiToggle(setEmojiToggle, text.id)}>
                        <div className="chat-msg-container">
                            {text.recipientId === userId && (
                                <div className="w-[40px] h-[40px]">
                                    <img src={ profileImage || default_profile} className="rounded-full" alt="User Avatar" />
                                </div>
                            )}

                            <div className="flex flex-col px-[16px] py-[4px] bg-[#ECF1F4] rounded-[12px] relative">
                                <div className="text-[#2C3E50] text-[16px] font-normal">
                                    {text.type === "IMAGE"? (
                                        <img src={isURL(text.message) ? text.message : `data:image/png;base64,${text.message}`} className="w-[200px] h-[200px]" alt="Uploaded content" />
                                    ) : 
                                    text.type === "AUDIO" ? (
                                        <audio controls src={`data:audio/wav;base64,${text.message}`}></audio>
                                    ):
                                    (
                                        <span>{text.message}</span>
                                    )}
                                </div>
                                <div className={`text-right ml-[12px] text-[12px] text-[#2C3E50] ${text.recipientId === userId  ? "mr-[-5px]" : "mr-[5px]"}`}>
                                    <span>12:00 PM</span>
                                </div>
                                <div className={`absolute top-[1.20rem] ${text.recipientId !== userId ? "right-[-15px]" : "left-[-11px]"}`} style={{ top: isURL(text.message) || isBase64(text.message) ? "12rem" : "" }}>
                                    <i className="text-[#ECF1F4]"><VscTriangleUp size={45} /></i>
                                </div>
                            </div>
                        </div>
                        <div><MessageReactions reactionList={reactionList} reactionDtoList={text.reactionDtoList} userId={userId} text={text}/></div>
                        {emojiToggle === text.id && (<div className={`absolute top-[-1.6rem] bg-darkBlue px-[10px] py-[3px] rounded-full ${text.recipientId === userId ? "left-[4rem]":"right-[1rem]"}`}><EmojiReactions handleReact={handleReact} messageId={text.id}/></div>)}
                        {index === message.messages.length - 1 && (
                            <div ref={lastMessage}></div>
                        )}
                    </main>
                )))
                }
            </section>
            <div className="bg-accent w-full 2xl:w-[100%] flex items-center h-[70px] gap-[10px] 2xl:gap-[30px] px-[10px]">
                <div className="flex items-center gap-[16px]">
                    <img src={pluse} className="w-[28px] h-[28px]" alt="Plus icon" />
                    <i onClick={handleIconClick}>
                        <GoImage size={25} className="w-[28px] h-[28px]" />
                    </i>
                    <input type="file" ref={imgRef} onChange={handleImageUpload} className="hidden" />
                    { !isRecording && !deleteAudio ? (<img src={waveform}  onClick={handleStartRecording} className="w-[28px] h-[28px]" alt="Waveform icon" />) :
                    
                    isRecording ? (<FaCircleStop size={50} className="w-[40px] h-[40px] text-darkBlue" onClick={handleStopRecording} />) :

                    deleteAudio && (<BsFillXCircleFill size={50} className="w-[40px] h-[40px] text-[#ff0800]" onClick={handleDeleteAudio}/>) 
                                
                    }
                </div>
                <div ref={chatRef} className="flex items-center p-[4px]">
                    <form onSubmit={sendMessage} className="flex items-center p-[4px] relative ">
                        {isRecording ?
                         (<canvas ref={canvasRef} width="400" height="40" className="rounded-[27px]"></canvas>) : 

                         audioUrl ? (
                                <div className="w-[400px] rounded-[27px] bg-secondary"> 
                                    <div ref={waveformContainerRef} className="w-[200px]"></div>
                                    {/* <audio controls src={audioUrl}></audio> */}
                                </div>
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
                            <img src={smile} className="absolute right-2 bg-[2C3E50]" alt="Emoji icon" onClick={handleStopRecording}/>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ChatBoxLayout;
