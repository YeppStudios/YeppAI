import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";


interface Plan {
    title: string;
    _id: string;
    name: string;
    monthlyTokens: number,
    price: number,
    priceId: String
    maxFiles: number,
    maxUploadedBytes: number,
    maxAssistants: number,
    maxFolders: number,
}


export interface PlanState {
    plan: Plan
  }
  

// Initial state
const initialState: PlanState = {
  plan: {
    _id: "6444d4394ab2cf9819e5b5f4",
    name: "Assistant Business",
    monthlyTokens: 1000000,
    price: 770,
    maxFiles: 1000000,
    maxUploadedBytes: 1073741824,
    maxAssistants: 100000,
    priceId: "price_1MzNh9Fe80Kn2YGGkv8OaQ0T",
    maxFolders: 1000000
  }
};

// Actual Slice
export const planSlice = createSlice({
  name: "planState",
  initialState,
  reducers: {

    // Action
    setSelectedPlan(state, action) {
      state.plan = action.payload;
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

export const { setSelectedPlan } = planSlice.actions;

export const selectedPlanState = (state: AppState) => state.planState.plan;

export default planSlice.reducer;