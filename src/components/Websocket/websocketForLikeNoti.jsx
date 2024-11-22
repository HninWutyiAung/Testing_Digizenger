import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { addNotification, selectNotification } from '../../feature/notiSlice';
import { addMessageToChat , selectActiveChatRoom ,setActiveChat} from '../../feature/chatSlice';
import { handleReaction } from '../../feature/reactionSlice';
import { useAppDispatch, useAppSelector } from '../../hook/Hook';
import { toast } from 'react-toastify';
import { toggleIncomingCall } from '../../feature/modelBox';
import { selectAnswerCall } from '../../feature/modelBox';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const dispatch = useAppDispatch();
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    const answerCall = useAppSelector(selectAnswerCall);
    const notiData = useAppSelector(selectNotification);
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null); 
    const activeChatRoomRef = useRef(null);
    const shownMessagesRef = useRef(new Set());
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const answerCallRef = useRef(false);
    console.log(activeChatRoom);

    useEffect(() => {
        activeChatRoomRef.current = activeChatRoom;
    }, [activeChatRoom]);

    useEffect(() => {
        answerCallRef.current = answerCall;
    }, [answerCall]);

    const iceServers = {
        iceServers: [
            {urls: `stun:localhost:3478`},
            {
              urls: `turn:localhost:3478`,
              username: "username",
              credential: "password"
            }
          ]
    };

    const peerConnectionRef = new RTCPeerConnection(iceServers);

    const setupMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;
    
            // Ensure that the peer connection is open before adding tracks
            if (peerConnectionRef.signalingState !== 'closed') {
                stream.getTracks().forEach(track => {
                    peerConnectionRef.addTrack(track, stream);
                });
            } else {
                console.error('RTCPeerConnection is closed, cannot add tracks');
            }
        } catch (err) {
            console.error('Error accessing media devices:', err);
        }
    };
    
    const websocketConnectForLikeNoti = (userId) => {
        if (isConnected || stompClientRef.current) {
            console.log('Already connected');
            return;
        }

        const socket = () => new SockJS('https://digizenger.online/ws');
        stompClientRef.current = Stomp.over(socket());

        stompClientRef.current.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            setIsConnected(true);
            
            stompClientRef.current.subscribe(`/user/${userId}/queue/private-notification`, function (message) {
                console.log("Message received:", message);
                try {
                    const notifications = JSON.parse(message.body);
                    console.log("Received notifications:", notifications);
                    dispatch(addNotification({
                        id: notifications.id,
                        message: notifications.message,
                        createDate: notifications.createDate,
                        type: notifications.type,
                        userId: notifications.userId,
                        read: notifications.read,
                    }));

                    if (!shownMessagesRef.current.has(notifications.id)) {
                        shownMessagesRef.current.add(notifications.id);
                        toast.success(notifications.message, {
                            autoClose: 5000,
                        });
                    }

                } catch (error) {
                    console.error("Error parsing notification message:", error);
                }
            });

            stompClientRef.current.subscribe(`/user/${userId}/queue/messages`, function (chatMessage) {
                console.log("Chat Message received:", chatMessage);
                try {
                    const chatData = JSON.parse(chatMessage.body);
                    console.log("Received chat message:", chatData);
                    const message ={
                        id:chatData.id,
                        message:chatData.message,
                        recipientId:chatData.recipientId,
                        senderId:chatData.userDto.id,
                        type:chatData.type,
                        replyMessage: chatData.replyMessage,
                        replyMessageType: chatData.replyMessageType,
                    }
                    if (activeChatRoomRef.current === chatData.recipientId) {
                        dispatch(addMessageToChat({
                            recipientId: chatData.recipientId,
                            firstName: chatData.userDto.firstName,
                            message: message,
                        }));
                    } else {
                        if (activeChatRoomRef.current === chatData.userDto.id) {
                            dispatch(addMessageToChat({
                                recipientId: chatData.userDto.id,
                                firstName: chatData.userDto.firstName,
                                message: message,
                            }));
                        } else {
                            dispatch(setActiveChat(chatData.recipientId));
                            dispatch(addMessageToChat({
                                recipientId: chatData.recipientId,
                                firstName: chatData.userDto.firstName,
                                message: message,
                            }));
                        }
                    }

                    if (!shownMessagesRef.current.has(chatData.id)) {
                        shownMessagesRef.current.add(chatData.id);
                        toast.info(chatData.content, {
                            autoClose: 5000,
                        });
                    }

                } catch (error) {
                    console.error("Error parsing chat message:", error);
                }
            });

            stompClientRef.current.subscribe(`/user/${userId}/queue/message/react`, function (message) {
                console.log("reaction received:", message);
                try {
                    const reaction = JSON.parse(message.body);
                    console.log("Received reaction:", reaction);
            
                    const userReaction = reaction.reactionDtoList.find(
                        (reactionDto) => reactionDto.userDto.id !== userId
                    );
            
                    if (userReaction) {
                        const reactionMessage = {
                            messageId: reaction.id,
                            emojiUtf8: [userReaction.emoji],  
                            userId: reaction.userDto.id,
                            fromWebSocket: true, 
                        };
            

                        dispatch(handleReaction(reactionMessage));
                    } else {
                        console.log("No reaction found for this user");
                    }

                } catch (error) {
                    console.error("Error parsing reaciton message:", error);
                }
            });

            stompClientRef.current.subscribe('/user/' + userId + "/topic/call", (call) => {
                console.log("Call From: " + call.body)
                // remoteID = call.body;
                console.log("Remote ID: " + call.body)

                dispatch(toggleIncomingCall());
    
                peerConnectionRef.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                    } else {
                        console.error("remoteVideoRef is not available.");
                    }
                }
    
    
                peerConnectionRef.onicecandidate = (event) => {
                    if (event.candidate) {
                        var candidate = {
                            type: "candidate",
                            lable: event.candidate.sdpMLineIndex,
                            id: event.candidate.candidate,
                        }
                        console.log("Sending Candidate")
                        console.log(candidate)
                        stompClientRef.current.send("/app/candidate", {}, JSON.stringify({
                            "toUser": activeChatRoom,
                            "fromUser": userId,
                            "candidate": candidate
                        }))
                    }
                }

                setupMedia();
                console.log("this is answer call boolean",answerCall);

                // if(answerCallRef.current){
                    peerConnectionRef.createOffer().then(description => {
                        peerConnectionRef.setLocalDescription(description);
                        console.log("Setting Description" + description);
                        stompClientRef.current.send("/app/offer", {}, JSON.stringify({
                            "toUser": call.body,
                            "fromUser": userId,
                            "offer": description
                        }))
                    })
                // }

            });

            stompClientRef.current.subscribe('/user/' + userId + "/topic/offer", (offer) => {
                console.log("Offer came")
                var o = JSON.parse(offer.body)["offer"]
                console.log(offer.body)
                console.log(new RTCSessionDescription(o))
                console.log(typeof (new RTCSessionDescription(o)))
    
                peerConnectionRef.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                    } else {
                        console.error("remoteVideoRef is not available.");
                    }
                }
                peerConnectionRef.onicecandidate = (event) => {
                    if (event.candidate) {
                        var candidate = {
                            type: "candidate",
                            lable: event.candidate.sdpMLineIndex,
                            id: event.candidate.candidate,
                        }
                        console.log("Sending Candidate")
                        console.log(candidate)
                        stompClientRef.current.send("/app/candidate", {}, JSON.stringify({
                            "toUser": activeChatRoom,
                            "fromUser": userId,
                            "candidate": candidate
                        }))
                    }
                }

    
                peerConnectionRef.setRemoteDescription(new RTCSessionDescription(o))
                peerConnectionRef.createAnswer().then(description => {
                    peerConnectionRef.setLocalDescription(description)
                    console.log("Setting Local Description")
                    console.log(description)
                    stompClientRef.current.send("/app/answer", {}, JSON.stringify({
                        "toUser": activeChatRoom,
                        "fromUser": userId,
                        "answer": description
                    }));
    
                })
            });

            stompClientRef.current.subscribe('/user/' + userId + "/topic/answer", (answer) => {
                console.log("Answer Came")
                var o = JSON.parse(answer.body)["answer"]
                console.log(o)
                peerConnectionRef.setRemoteDescription(new RTCSessionDescription(o))
                console.log("lastest state");
    
            });

            stompClientRef.current.subscribe('/user/' + userId + "/topic/candidate", (candidate) => {
                console.log("Candidate Came")
                var o = JSON.parse(candidate.body)["candidate"]
                console.log(o)
                console.log(o["lable"])
                console.log(o["id"])
                var iceCandidate = new RTCIceCandidate({
                    sdpMLineIndex: o["lable"],
                    candidate: o["id"],
                })
                peerConnectionRef.addIceCandidate(iceCandidate)
                .then(() => console.log("ICE candidate added successfully."))
                .catch((error) => console.error("Error adding ICE candidate:", error));
            });
    
    
            stompClientRef.current.send("/app/addUser", {}, userId)


        }, (error) => {
            console.error("Connection error:", error);
            setIsConnected(false);
        });
    };

    const disconnectWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect(() => {
                console.log("Disconnected");
                setIsConnected(false);
                stompClientRef.current = null;
            });
        }
    };

    const sendCallAction = (messageData) => {
        if (isConnected) {
            stompClientRef.current.send(
                "/app/call",
                {},
                JSON.stringify(messageData)
            );
            setupMedia();
            console.log("this setupMedia is wordk");
            console.log("Video Call Start:", messageData);
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    const sendMessageToWebsocket = (messageData) => {
        if (isConnected) {
            stompClientRef.current.send(
                "/app/message",
                {},
                JSON.stringify(messageData)
            );
            console.log("Message sent:", messageData);
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    const sendReactionToWebsocket = (reactionData) => {
        if (isConnected) {
            stompClientRef.current.send(
                "/app/messages/react",
                {},
                JSON.stringify(reactionData)
            );
            console.log("Reaction sent:", reactionData);
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    // const handleStartVideo = () =>{
    //     setupMedia();
    //     console.log("this is setupMedia is work")
    // }

    // useEffect(() => {
    //     setupMedia();
    //     return () => {
    //         if (peerConnectionRef.current) {
    //             peerConnectionRef.current.close();
    //         }
    //     };
    // }, []);

    useEffect(() => {
        return () => disconnectWebSocket();
    }, []);

    return (
        <WebSocketContext.Provider value={{ 
            websocketConnectForLikeNoti, 
            disconnectWebSocket , 
            sendMessageToWebsocket ,
            sendReactionToWebsocket,
            sendCallAction,  
            localVideoRef,
            remoteVideoRef,
            }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
