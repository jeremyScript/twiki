import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string;
  displayName: string;
  email: string;
}

const initialState: UserState = {
  uid: "",
  email: "",
  displayName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<UserState>) {
      const { uid, email, displayName } = action.payload;
      state.uid = uid;
      state.email = email;
      state.displayName = displayName;
    },
    userLoggedOut(state, action) {
      state.uid = "";
      state.email = "";
      state.displayName = "";
    },
  },
});

export default userSlice.reducer;

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
