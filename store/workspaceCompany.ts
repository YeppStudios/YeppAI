import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";


interface Plan {
    _id: string;
    name: string;
    monthlyTokens: number,
    price: number,
    priceId: String
    maxFiles: number,
    maxUploadedBytes: number,
    maxAssistants: number,
}

export interface WorkspaceCompanyState {
  workspaceCompany: {
    _id: string;
    email: string;
    tokenBalance: number;
    plan: Plan;
    uploadedBytes: number;
    workspace: string;
    accountType: string;
  }
  }
  

// Initial state
const initialState: WorkspaceCompanyState = {
  workspaceCompany: {
    _id: "",
    email: "",
    tokenBalance: 0,
    plan: {
        _id: "",
        name: "",
        monthlyTokens: 0,
        price: 0,
        priceId: "",
        maxFiles: 0,
        maxUploadedBytes: 0,
        maxAssistants: 0,
    },
    uploadedBytes: 0,
    workspace: "",
    accountType: ""
  }
};

// Actual Slice
export const workspaceCompanySlice = createSlice({
  name: "workspaceCompanyState",
  initialState,
  reducers: {

    // Action
    setSelectedWorkspaceCompany(state, action) {
        state.workspaceCompany = action.payload;
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

export const { setSelectedWorkspaceCompany } = workspaceCompanySlice.actions;

export const selectedWorkspaceCompanyState = (state: AppState) => state.workspaceCompanyState.workspaceCompany;

export default workspaceCompanySlice.reducer;