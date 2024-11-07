// features/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const chatSlice = createSlice({
  name: 'chatPageAndLimit',
  initialState: {
    selectedChatId: null,
    page: 1,
    limit: 10,
  },
  reducers: {
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
      state.page = 1; // Reset page when a new chat is selected
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { setSelectedChatId, incrementPage } = chatSlice.actions;
export default chatSlice.reducer;
export const selectPage = (state: RootState) => state.chatPageAndLimit.page;
export const selectLimit = (state: RootState) => state.chatPageAndLimit.limit;
