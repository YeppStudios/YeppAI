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
    name: "Marketer AI",
    description: "System AI Marketer.",
    category: "marketing",
    prompt: "You are a professional marketer with many years of experience. You write professional marketing content for the user based on best practices, marketing principles and information user gives you. You do not overuse emojis in the text and adjust the tone and context to perfectly match the keywords and target audience.",
    noEmbedPrompt: "You are a professional marketer with many years of experience. You write professional marketing content for the user based on best practices, marketing principles and information user gives you. You do not overuse emojis in the text and adjust the tone and context to perfectly match the keywords and target audience.",
    folders: [],
    documents: [],
    image: "https://asystentai.infura-ipfs.io/ipfs/QmU1GBfsi37qBij3EA4JohC58mC4uyyX4qpV9eHtMDQogy",
    companyName: "",
    aboutCompany: "",
    exampleContent: ""
  }
};

// Actual Slice
export const marketingAssistantSlice = createSlice({
  name: "marketingAssistantState",
  initialState,
  reducers: {

    // Action
    setSelectedMarketingAssistant(state, action) {
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

export const { setSelectedMarketingAssistant } = marketingAssistantSlice.actions;

export const selectedMarketingAssistantState = (state: AppState) => state.marketingAssistantState.assistant;

export const defaultMarketingAssistantState = (state: AppState) => initialState.assistant

export default marketingAssistantSlice.reducer;