import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface Document {
  _id: string,
  owner: string,
  title: string,
  category: string,
  timestamp: string,
  ownerEmail: string,
  vectorId: string,
  isDocument?: boolean,
  normalizedTimestamp?: string,
}

interface Profile {
    owner: string,
    title: string,
    ownerEmail: string,
    category: string,
    documents: Document[] | [],
    updatedAt: string,
    _id:  string,
    workspace: string,
    parentFolder: null,
    subfolders: Profile[] | [],
    totalDocsCount: number,
    imageUrl: string,
    description: string
}


export interface ProfileState {
    profile: Profile
}

// Initial state
const initialState: ProfileState = {
  profile: {
    owner: '',
    title: '',
    documents: [],
    ownerEmail: '',
    updatedAt: '',
    category: '',
    _id: '',
    workspace: '',
    parentFolder: null, 
    subfolders: [],
    totalDocsCount: 0,
    imageUrl: '',
    description: ''
  }
};

// Actual Slice
export const profileSlice = createSlice({
  name: "profileState",
  initialState,
  reducers: {

    // Action
    setSelectedProfile(state, action) {
      state.profile = action.payload;
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

export const { setSelectedProfile } = profileSlice.actions;

export const selectedProfileState = (state: AppState) => state.profileState.profile;

export default profileSlice.reducer;