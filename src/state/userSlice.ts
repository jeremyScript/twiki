import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
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
    authHasChanged(state, action: PayloadAction<User | null>) {
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
    userLoggedIn(state, action: PayloadAction<User>) {
      const { uid, email, displayName } = action.payload;
      state.currentUser = {
        uid,
        email,
        displayName,
      };
    },
    userLoggedOut(state) {
      state.currentUser = null;
    },
  },
});

export default userSlice.reducer;

export const { authHasChanged, userLoggedIn, userLoggedOut } =
  userSlice.actions;
