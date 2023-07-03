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


export interface FolderState {
    folder: Folder
  }
  

// Initial state
const initialState: FolderState = {
  folder: {
    owner: '',
    title: '',
    documents: [],
    updatedAt: '',
    category: '',
    _id: '',
    workspace: '',
  }
};

// Actual Slice
export const folderSlice = createSlice({
  name: "folderState",
  initialState,
  reducers: {

    // Action
    setSelectedFolder(state, action) {
      state.folder = action.payload;
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

export const { setSelectedFolder } = folderSlice.actions;

export const selectFolderState = (state: AppState) => state.folderState.folder;

export default folderSlice.reducer;