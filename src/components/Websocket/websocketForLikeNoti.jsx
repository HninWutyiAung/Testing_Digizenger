import React, { createContext, useContext, useEffect , useRef} from 'react';
import SockJS from 'sockjs-client'; 
import { Stomp } from '@stomp/stompjs';
import { addNotification, selectNotification } from '../../feature/notiSlice';
import { useAppDispatch , useAppSelector} from '../../hook/Hook';
import { toast } from 'react-toastify';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const dispatch = useAppDispatch();
    const notiData = useAppSelector(selectNotification);
    let stompClient = null;

    console.log(notiData);

    const websocketConnectForLikeNoti = (userId) => {
        const socket = () => new SockJS('https://digizenger.online/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/user/${userId}/queue/private-notification`, function(message) {
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
                    }))

                    toast.success(notifications.message, {
                        autoClose: 5000, 
                    });

                } catch (error) {
                    console.error("Error parsing notification message:", error);
                }
            });
        });
    };

    const disconnectWebSocket = () => {
        if (stompClient !== null) {
            stompClient.disconnect();
            console.log("Disconnected");
        }
    };

    useEffect(() => {
        // Cleanup on component unmount
        return () => disconnectWebSocket();
    }, []);

    return (
        <WebSocketContext.Provider value={{ websocketConnectForLikeNoti, disconnectWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use the WebSocket context
export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
