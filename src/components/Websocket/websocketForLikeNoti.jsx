import React, { createContext, useContext, useEffect , useRef} from 'react';
import SockJS from 'sockjs-client'; 
import { Stomp } from '@stomp/stompjs';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    let stompClient = null;

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
