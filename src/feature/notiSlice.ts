import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';


interface Notification {
    id: string;
    message: string;
    createDate: string; 
    type: string;
    userId: number;
    read: boolean;
}


interface NotificationState {
    allNotis: Notification[];
}


const initialState: NotificationState = {
    allNotis: []
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.allNotis = action.payload;
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            const existingNotification = state.allNotis.find(noti => noti.id === action.payload.id);
            if (!existingNotification) {
                state.allNotis.push(action.payload); // Only add if not already present
            }
        },
        markAsRead: (state, action: PayloadAction<{id :string}>) => {
            const notification = state.allNotis.find(noti => noti.id === action.payload.id);
            if (notification) {
                notification.read = true;
            }
        },
        deleteNotification: (state, action: PayloadAction<{id:string}>) => {
            state.allNotis = state.allNotis.filter(noti => noti.id !== action.payload.id);
        }
    },
});

export const { setNotifications, addNotification, markAsRead, deleteNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
export const selectNotification = (state :RootState) => state.notifications.allNotis;
