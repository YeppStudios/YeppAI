import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface Conversation {
    _id: String,
    user: any,
    startTime: Date
    messages: Array<any>,
    lastUpdated: String,
    title: String,
    assistant: String
}

export interface ConversationState {
    conversation: Conversation
  }
  

// Initial state
const initialState: ConversationState = {
  conversation: {
    _id: '',
    user: '',
    startTime: new Date(),
    messages: [],
    lastUpdated: 'Dziś',
    title: '',
    assistant: '1'
  }
};

// Actual Slice
export const conversationSlice = createSlice({
  name: "conversationState",
  initialState,
  reducers: {

    // Action
    setSelectedConversation(state, action) {
      state.conversation = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.score,
    //     };
    //   },
    // },

  },
});

export const { setSelectedConversation } = conversationSlice.actions;

export const selectConversationState = (state: AppState) => state.conversationState.conversation;

export default conversationSlice.reducer;