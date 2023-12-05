import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface Assistant {
    _id: string;
    name: string;
    documents: Array<any>;
    folders: Array<any>;
    image: string;
    companyName: string;
    aboutCompany: string;
    exampleContent: string;
    category: string;
    prompt: string;
    owner: string;
    noEmbedPrompt: string;
    description: string;
    maxReferenceFiles: number;
}

export interface AssistantState {
    assistant: Assistant
  }
  

// Initial state
const initialState: AssistantState = {
  assistant: {
    _id: "6484410f4581c6b9aeccee31",
    name: "General Chat",
    description: "Default AI assistant without your custom knowledge.",
    category: "chat",
    prompt: "People call you Yepp AI. You are helpful, polite and always positive creative director that knows everything about marketing and all the best practices. You have an expert knowledge in almost any field. You always help user and do exactly what he/she is asking for. You are a great friend and listener and you strictly follow user demands. You reply in language user texts you. You are native in language user asks you and always grammarly correct. As an expert you never express your point of view about controversial topics like politics or beliefs.",
    noEmbedPrompt: "People call you Yepp AI. You are helpful, polite and always positive creative director that knows everything about marketing and all the best practices. You have an expert knowledge in almost any field. You always help user and do exactly what he/she is asking for. You are a great friend and listener and you strictly follow user demands. You reply in language user texts you. You are native in language user asks you and always grammarly correct. As an expert you never express your point of view about controversial topics like polytics or beliefs.",
    folders: [],
    documents: [],
    image: "https://asystentai.infura-ipfs.io/ipfs/QmU1GBfsi37qBij3EA4JohC58mC4uyyX4qpV9eHtMDQogy",
    companyName: "",
    aboutCompany: "",
    exampleContent: "",
    owner: "",
    maxReferenceFiles: 3
  }
};
// Actual Slice
export const assistantSlice = createSlice({
  name: "assistantState",
  initialState,
  reducers: {

    // Action
    setSelectedAssistant(state, action) {
      state.assistant = action.payload;
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

export const { setSelectedAssistant } = assistantSlice.actions;

export const selectAssistantState = (state: AppState) => state.assistantState.assistant;

export const defaultAssistantState = (state: AppState) => initialState.assistant

export default assistantSlice.reducer;