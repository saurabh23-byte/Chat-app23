import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: null, // ✅ must be array
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },

    // 🔥 ADD THIS
    updateMessageReaction: (state, action) => {
      const { messageId, reactions } = action.payload;

      const msg = state.messages.find(
        (message) => message._id === messageId
      );

      if (msg) {
        msg.reactions = reactions;
      }
    },
  },
});

export const {
  setMessages,
  removeMessage,
  updateMessageReaction, 
} = messageSlice.actions;

export default messageSlice.reducer;
