import SockJS from 'sockjs-client'; 
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

export function websocketConnectForLikeNoti(userId){
    const socket = () => new SockJS('https://digizenger.online/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe(`user/${userId}/queue/private-notification`, function(message) {
            console.log("Message received:", message);
            try {
                const notifications = JSON.parse(message.body);
                console.log("Received notifications:", notifications);
            } catch (error) {
                console.error("Error parsing notification message:", error);
            }
        });

    });
}

export function disconnectWebSocket() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
}