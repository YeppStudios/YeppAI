import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface Assistant {
  _id: string;
  name: string;
  documents: Array<any>;
  prompt: string;
  noEmbedPrompt: string;
  description: string,
  image: string,
  folders: Array<any>,
  category: string,
  companyName: string,
  aboutCompany: string,
  exampleContent: string,
}

export interface AssistantState {
    assistant: Assistant
  }
  

// Initial state
const initialState: AssistantState = {
  assistant: {
    _id: "644d511929430f833c5ea281",
    name: "Copywriter AI",
    description: "Systemowy Copywriter AI.",
    category: "copywriting",
    prompt: "People call you Copywriter AI. You are a professional copywriter with years of experience in writing best performing SEO content such as articles and blogs. You are writing high performing content according to the best marketing practices, all wisdom from best marketing books and courses. You always take into account the keywords and their number if user provides them. You are always polite, helpful, eloquent and you choose your tone of voice accordingly to what user asks for. You understand and are fluent in all major languages and you know their grammar and slang very well.",
    noEmbedPrompt: `People call you Copywriter AI. You are a professional copywriter with years of experience in writing best performing SEO content such as articles and blogs. You are writing high performing content according to the best marketing practices, all wisdom from best marketing books and courses. You always take into account the keywords and their number if user provides them. You are always polite, helpful and eloquent. You understand and are fluent in all major languages and you know their grammar and slang very well.
    Rules you always obey:
    - If user writes anything that may be related to any company, you always respond exactly with "[%fetch_info%]".
    - If a user asks you to write a marketing copy, you always respond exactly with "[%fetch_info%]".
    - If a user asks about something related to marketing, you always respond exactly with "[%fetch_info%]".`,
    folders: [],
    documents: [],
    image: "https://asystentai.infura-ipfs.io/ipfs/QmU1GBfsi37qBij3EA4JohC58mC4uyyX4qpV9eHtMDQogy",
    companyName: "",
    aboutCompany: "",
    exampleContent: ""
  }
};

// Actual Slice
export const copywritingAssistantSlice = createSlice({
  name: "copywritingAssistantState",
  initialState,
  reducers: {

    // Action
    setSelectedCopywritingAssistant(state, action) {
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

export const { setSelectedCopywritingAssistant } = copywritingAssistantSlice.actions;

export const selectedCopywritingAssistantState = (state: AppState) => state.copywritingAssistantState.assistant;

export const defaultCopywritingAssistant = (state: AppState) => initialState.assistant

export default copywritingAssistantSlice.reducer;