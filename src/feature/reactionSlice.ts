import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface MessageReaction {
  chatType?: string;
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
    handleReaction: (state, action: PayloadAction<MessageReaction & { fromWebSocket?: boolean }>) => {
      const { chatType, messageId, emojiUtf8, userId, fromWebSocket } = action.payload;

      // Find the existing reaction by messageId and userId
      const existingReaction = state.reactions.find(
        (reaction) => reaction.messageId === messageId 
      );

      if (!existingReaction) {
        // If no existing reaction, add a new one with WebSocket or local emoji in the correct slot
        state.reactions.push({
          chatType,
          messageId,
          userId,
          emojiUtf8: fromWebSocket ? [emojiUtf8[0], ''] : ['', emojiUtf8[0]],  // WebSocket in index 0, local in index 1
        });
      } else {
        // Update existing reaction based on source
        if (fromWebSocket) {
          // Handle WebSocket reaction at index 0
          existingReaction.emojiUtf8[0] = emojiUtf8[0];
        } else {
          // Handle local reaction at index 1
          if (existingReaction.emojiUtf8[1] === emojiUtf8[0]) {
            // Remove local emoji if it's already set to avoid duplicates
            existingReaction.emojiUtf8[1] = '';
          } else {
            // Otherwise, add the new emoji for the local reaction
            existingReaction.emojiUtf8[1] = emojiUtf8[0];
          }
        }
      }
    },
  },
});


export const { handleReaction } = reactionSlice.actions;
export default reactionSlice.reducer;
export const selectReactions = (state: RootState) => state.reactions.reactions;
