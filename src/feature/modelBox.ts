import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  incomingCall: false,
  answerCall : false,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    toggleIncomingCall: (state) => {
      state.incomingCall = !state.incomingCall;
    },
    answerCall : (state) => {
        state.answerCall = !state.answerCall;
    }
  },
});

export const { toggleIncomingCall , answerCall} = callSlice.actions;
export default callSlice.reducer;
export const selectIncomingCall = (state: RootState) => state.call.incomingCall;
export const selectAnswerCall = (state: RootState) => state.call.answerCall;
