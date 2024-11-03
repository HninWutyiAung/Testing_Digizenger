import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { addNotification, selectNotification } from '../../feature/notiSlice';
import { addMessageToChat , selectActiveChatRoom ,setActiveChat} from '../../feature/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hook/Hook';
import { toast } from 'react-toastify';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const dispatch = useAppDispatch();
    const activeChatRoom = useAppSelector(selectActiveChatRoom);
    const notiData = useAppSelector(selectNotification);
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null);  // stompClient ကို useRef နဲ့ define
    const activeChatRoomRef = useRef(null);
    const shownMessagesRef = useRef(new Set());
    console.log(activeChatRoom);

    useEffect(() => {
        activeChatRoomRef.current = activeChatRoom;
    }, [activeChatRoom]);

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
                    if (activeChatRoomRef.current !== chatData.recipientId) {
                        dispatch(setActiveChat(chatData.recipientId));
                    }
                    const message ={
                        id:chatData.id,
                        message:chatData.message,
                        recipientId:chatData.recipientId,
                        senderId:chatData.userDto.id,
                        type:chatData.type,
                    }
                    dispatch(addMessageToChat({
                        recipientId: chatData.recipientId,
                        message: message
                        
                    }));

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

    useEffect(() => {
        return () => disconnectWebSocket();
    }, []);

    return (
        <WebSocketContext.Provider value={{ websocketConnectForLikeNoti, disconnectWebSocket , sendMessageToWebsocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
