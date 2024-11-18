import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

interface Reaction {
    id: string;
    emoji: string;
    createdDate: string;
    editedDate?: string;
    userDto: { id: number; firstName: string; lastName: string };
}

interface Message {
    id?: number;
    replyMessageId?: number;
    message: string;
    user: { id: number };
    recipientId: number;
    senderId?: number;
    type: string;
    replyMessageType?: string;
    replyMessage?: string;
    timestamp?: string;
    createDate?: string;
    userDto?: {  id: number ;firstName: string; lastName: string; };
    reactionDtoList?: Reaction[];
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
    activeMessageId: string | null;
}

const initialState: ChatState = {
    chatList: [],
    activeChatRoom: "0",
    activeMessageId: null,
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
        setActiveMessageId: (state, action: PayloadAction<string | null>) => {
            console.log("Setting active message ID:", action.payload);
            state.activeMessageId = action.payload;
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
        replyMessageToChat: (
            state,
            action: PayloadAction<{ recipientId: number; originalMessageId: number; replyMessage: Message }>
        ) => {
            const { recipientId, originalMessageId, replyMessage } = action.payload;
        
            const chat = state.chatList.find(chat => chat.id === recipientId);
        
            if (chat) {
                const originalMessage = chat.messages.find(msg => msg.id === originalMessageId);
        
                if (originalMessage) {
                    const enrichedReplyMessage: Message = {
                        ...replyMessage,
                        replyMessage: originalMessage.message, 
                        replyMessageType: originalMessage.type, 
                        replyMessageId: originalMessage.id, 
                    };
        
                    chat.messages.push(enrichedReplyMessage);
                } else {
                    console.error("Original message not found for originalMessageId:", originalMessageId);
                }
            } else {
                console.error("Chat not found for recipientId:", recipientId);
            }
        },
        

    },
});


export const { setChatList, setActiveChat, addMessageToChat ,setChatMessages ,setActiveMessageId , replyMessageToChat} = chatSlice.actions;
export default chatSlice.reducer;
export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectActiveChatRoom = (state: RootState) => state.chat.activeChatRoom;
export const selectActiveMessageId = (state: RootState) => state.chat.activeMessageId;  
