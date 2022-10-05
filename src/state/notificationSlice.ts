import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationType = "info" | "error";

export interface NotificationState {
  open: boolean;
  type: NotificationType;
  message: string;
  timeout: number;
}

const initialState: NotificationState = {
  open: false,
  type: "info",
  message: "",
  timeout: 3000,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(
      state,
      action: PayloadAction<{
        type: NotificationType;
        message: string;
        timeout: number;
      }>
    ) {
      const { type, message, timeout } = action.payload;
      state = {
        open: true,
        type,
        message,
        timeout,
      };
    },
    clearNotification(state) {
      state = initialState;
    },
  },
});

export default notificationSlice.reducer;

export const notificationActions = notificationSlice.actions;
