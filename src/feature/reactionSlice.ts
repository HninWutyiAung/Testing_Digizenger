import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface MessageReaction {
  chatType: string;
  messageId: string;
  emojiUtf8: string;
  userId: string;
  timestamp: string;
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

      // Find reaction with the same messageId and userId
      const existingReaction = state.reactions.find(
        (reaction) => reaction.messageId === messageId && reaction.userId === userId
      );

      if (!existingReaction) {
        // If reaction doesn't exist, add new reaction
        state.reactions.push(action.payload);
      } else {
        if (existingReaction.emojiUtf8 === emojiUtf8) {
          // If emojiUtf8 is the same, delete the reaction (remove from array)
          state.reactions = state.reactions.filter(
            (reaction) => !(reaction.messageId === messageId && reaction.userId === userId)
          );
        } else {
          // If emojiUtf8 is different, update the reaction
          existingReaction.emojiUtf8 = emojiUtf8;
          existingReaction.timestamp = new Date().toISOString();
        }
      }
    },
  },
});

// Export the action and reducer
export const { handleReaction } = reactionSlice.actions;
export default reactionSlice.reducer;
