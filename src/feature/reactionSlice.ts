import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface MessageReaction {
  chatType: string;
  messageId: string;
  emojiUtf8:  string[];
  userId: string;
}

interface ReactionState {
  reactions: MessageReaction[];
}

const initialState: ReactionState = {
  reactions: [],
};

const reactionSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    handleReaction: (state, action: PayloadAction<MessageReaction>) => {
      const { messageId, emojiUtf8, userId } = action.payload;
      console.log("this is reactionSlice from reaction slice", action.payload);

      const existingReaction = state.reactions.find(
        (reaction) => reaction.messageId === messageId && reaction.userId === userId
      );

      if (!existingReaction) {

        state.reactions.push(action.payload);
      } else {

        if (existingReaction.emojiUtf8.includes(emojiUtf8[0])) {

          existingReaction.emojiUtf8 = existingReaction.emojiUtf8.filter(
            (emoji) => emoji !== emojiUtf8[0]
          );
        } else {

          existingReaction.emojiUtf8 = [...existingReaction.emojiUtf8, emojiUtf8[0]];
        }
      }
    },
  },
});


export const { handleReaction } = reactionSlice.actions;
export default reactionSlice.reducer;
export const selectReactions = (state: RootState) => state.reactions.reactions;
