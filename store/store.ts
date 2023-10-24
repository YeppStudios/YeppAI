import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { conversationSlice } from "./conversationSlice";
import { userSlice } from "./userSlice";
import { assistantSlice } from "./assistantSlice";
import { marketingAssistantSlice } from "./marketingAssistantSlice";
import { copywritingAssistantSlice } from "./copywritingAssistantSlice";
import { createWrapper } from "next-redux-wrapper";
import { folderSlice } from "./openedFolderSlice";
import { planSlice } from "./planSlice";
import { workspaceCompanySlice } from "./workspaceCompany";
import { selectedFoldersSlice } from "./selectedFoldersSlice";
import { profileSlice } from "./selectedProfileSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [conversationSlice.name]: conversationSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [assistantSlice.name]: assistantSlice.reducer,
      [folderSlice.name]: folderSlice.reducer,
      [marketingAssistantSlice.name]: marketingAssistantSlice.reducer,
      [copywritingAssistantSlice.name]: copywritingAssistantSlice.reducer,
      [planSlice.name]: planSlice.reducer,
      [workspaceCompanySlice.name]: workspaceCompanySlice.reducer,
      [selectedFoldersSlice.name]: selectedFoldersSlice.reducer,
      [profileSlice.name]: profileSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);