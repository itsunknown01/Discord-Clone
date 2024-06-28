import { FriendsTabEnum } from "@/lib/friends";
import { FriendDataType } from "@/lib/types";
import { Profile } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StoreState {
  friends: FriendDataType[];
  currentTab: FriendsTabEnum;
  conversation: FriendDataType[];
  currentUser: Profile;
}

const initialState: StoreState = {
  friends: [],
  currentTab: FriendsTabEnum.Available,
  conversation: [],
  currentUser: {
    id: "",
    username: "",
    email: "",
    name: "",
    userId: "",
    imageUrl: "",
    status: "Offline",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const StoreSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFriends(state, action: PayloadAction<FriendDataType[]>) {
      state.friends = action.payload;
    },
    setCurrentTab(state, action: PayloadAction<FriendsTabEnum>) {
      state.currentTab = action.payload;
    },
    setConversation(state, action: PayloadAction<FriendDataType[]>) {
      state.conversation = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<Profile>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setFriends, setConversation, setCurrentTab, setCurrentUser } =
  StoreSlice.actions;

export default StoreSlice.reducer;
