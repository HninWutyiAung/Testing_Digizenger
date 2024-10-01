import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts'; // Adjust the import path according to your project structure

// Define types for the chat message and chat
interface Message {
    id: string;
    content: string;
    sender: string;
    timestamp: string; // or Date, depending on your preference
}

interface Chat {
    id: string;
    title: string;
    messages: Message[];
}

// Define the initial state type
interface ChatState {
    chatList: Chat[];
    activeChatRoom: string | null; // can be a chat ID or null
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
            state.chatList = action.payload;
        },
        setActiveChat: (state, action: PayloadAction<string | null>) => {
            if (state.activeChatRoom !== action.payload) {  // Only update if the chat ID is different
                state.activeChatRoom = action.payload;
            }
        },
        addMessageToChat: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
            const { chatId, message } = action.payload;
            const chat = state.chatList.find(chat => chat.id === chatId);
            if (chat) {
                chat.messages.push(message);
            }
        },
    },
});


export const { setChatList, setActiveChat, addMessageToChat } = chatSlice.actions;
export default chatSlice.reducer;
export const selectChatList = (state :RootState) => state.chat.chatList;
export const selectActiveChatRoom = (state: RootState) => state.chat.activeChatRoom;
