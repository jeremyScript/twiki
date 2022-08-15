import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  displayName: string;
  email: string;
}

interface UserState {
  isAuthReady: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  isAuthReady: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User | null>) {
      if (action.payload) {
        const { uid, email, displayName } = action.payload;
        state.currentUser = {
          uid,
          email,
          displayName,
        };
      } else {
        state.currentUser = null;
      }
      state.isAuthReady = true;
    },
  },
});

export default userSlice.reducer;

export const { updateUser } = userSlice.actions;
