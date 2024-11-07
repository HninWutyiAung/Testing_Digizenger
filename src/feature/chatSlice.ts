import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

interface Message {
    id?: number;
    message: string;
    user: { id: number };
    recipientId: number;
    senderId?: number;
    type: string;
    replayMessageType?: string;
    replyMessage?: string;
    timestamp?: string;
    createDate?: string;
    userDto?: {  id: number ;firstName: string; lastName: string; };
}

interface Chat {
    id: number;
    firstName?: string;
    lastName?: string;
    lastLoginTime?: string;
    status?: string;
    profileDto?: { id: number; followerCount: number };
    lastMessage?: string;
    messages: Message[];
}

interface ChatState {
    chatList: Chat[];
    activeChatRoom: string | null;
}

const initialState: ChatState = {
    chatList: [],
    activeChatRoom: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatList: (state, action: PayloadAction<Chat[]>) => {
            state.chatList =  (action.payload || []).map(user => ({
                ...user,
                messages: user.messages || [], 
            }));
        },
        setActiveChat: (state, action: PayloadAction<string | null>) => {
            state.activeChatRoom = action.payload;
        },
        addMessageToChat: (state, action: PayloadAction<{ recipientId: number; firstName: string ; message: Message }>) => {
            const { recipientId, firstName, message } = action.payload;
            const chat = state.chatList.find(chat => chat.id === recipientId);

            if (chat) {
                chat.messages.push(message);
            } else {

                state.chatList.push({ id: recipientId, firstName: firstName , messages: [message] });
            }
        },
        setChatMessages: (state, action: PayloadAction<{ id:number ; messages: Message[] }>) => {
            const { id, messages } = action.payload;
            const chat = state.chatList.find(chat => chat.id === id);

            if (chat) {
                chat.messages = messages.sort((a, b) => {
                    const dateA = a.createDate ? new Date(a.createDate.slice(0, -1) + 'Z').getTime() : 0;
                    const dateB = b.createDate ? new Date(b.createDate.slice(0, -1) + 'Z').getTime() : 0;
                    return dateA - dateB; 
                });
            } else {
                state.chatList.push({ id: id , messages : messages});
            }
        },
    },
});


export const { setChatList, setActiveChat, addMessageToChat ,setChatMessages} = chatSlice.actions;
export default chatSlice.reducer;
export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectActiveChatRoom = (state: RootState) => state.chat.activeChatRoom;
