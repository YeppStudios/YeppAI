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
  normalizedTimestamp?: string
}

interface Folder {
    owner: string,
    title: string,
    ownerEmail: string,
    category: string,
    documents: Document[] | [],
    updatedAt: string,
    _id:  string,
    workspace: string,
    parentFolder: Folder | null,
    subfolders: Folder[] | [],
    totalDocsCount: number
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
    ownerEmail: '',
    updatedAt: '',
    category: '',
    _id: '',
    workspace: '',
    parentFolder: null, 
    subfolders: [],
    totalDocsCount: 0
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