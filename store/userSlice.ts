import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface User {
    accountType: string;
    _id: String,
    name: String,
    plan: Object,
    profiles: Array<any>,
    workspace: String,
    tokenBalance: number,
    uploadedBytes: number,
    referredBy: string,
    fullName: string,
    email: string,
    elixirAware: boolean,
}

export interface UserState {
    user: User
  }
  

// Initial state
const initialState: UserState = {
  user: {
    _id: "",
    accountType: "",
    tokenBalance: 0,
    name: "",
    fullName: "",
    plan: {
        _id: "",
        name: "",
        monthlyTokens: 0,
        price: 0,
      },
    profiles: [],
    workspace: "",
    uploadedBytes: 0,
    referredBy: "",
    email: "",
    elixirAware: false,
  }
};

// Actual Slice
export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {

    // Action
    setSelectedUser(state, action) {
        state.user = action.payload;
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

export const { setSelectedUser } = userSlice.actions;

export const selectedUserState = (state: AppState) => state.userState.user;

export default userSlice.reducer;