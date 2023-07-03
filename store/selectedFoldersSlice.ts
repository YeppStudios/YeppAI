import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface Document {
  owner: string,
  title: string,
  category: string,
  timestamp: string,
  ownerEmail: string,
  vectorId: string
}

interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[] | [],
    updatedAt: string,
    _id:  string,
    workspace: string,
}


export interface SelectedFoldersState {
    folders: Folder[] | [];
  }
  

// Initial state
const initialState: SelectedFoldersState = {
  folders: []
};

// Actual Slice
export const selectedFoldersSlice = createSlice({
  name: "selectedFoldersState",
  initialState,
  reducers: {

    // Action
    setSelectedFolders(state, action) {
      state.folders = action.payload;
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

export const { setSelectedFolders } = selectedFoldersSlice.actions;

export const selectFoldersState = (state: AppState) => state.selectedFoldersState.folders;

export default selectedFoldersSlice.reducer;