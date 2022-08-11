import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  displayName: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
