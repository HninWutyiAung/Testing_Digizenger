import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

interface Message {
    id?: number;
    message: string;
    user: { id: number };
    recipientId: number;
    senderId?: number;
    type: string;
    timestamp?: string;
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
                messages: user.messages || [], // Ensure messages array exists
            }));
        },
        setActiveChat: (state, action: PayloadAction<string | null>) => {
            state.activeChatRoom = action.payload;
        },
        addMessageToChat: (state, action: PayloadAction<{ recipientId: number; message: Message }>) => {
            const { recipientId, message } = action.payload;
            const chat = state.chatList.find(chat => chat.id === recipientId);

            if (chat) {
                chat.messages.push(message);
            } else {
                // Add new chat if not already in the chat list
                state.chatList.push({ id: recipientId, messages: [message] });
            }
        },
    },
});


export const { setChatList, setActiveChat, addMessageToChat } = chatSlice.actions;
export default chatSlice.reducer;
export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectActiveChatRoom = (state: RootState) => state.chat.activeChatRoom;
