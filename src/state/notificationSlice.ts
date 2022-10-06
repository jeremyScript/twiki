import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "info" | "error";

export interface NotificationState {
  display: boolean;
  type: NotificationType;
  message: null | string;
  timeout: number;
}

export interface NotificationAction {
  type: NotificationType;
  message: null | string;
  timeout: number;
}

const initialState: NotificationState = {
  display: false,
  type: "info",
  message: "",
  timeout: 3000,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action: PayloadAction<NotificationAction>) {
      const { type, message, timeout } = action.payload;
      return {
        display: true,
        type,
        message,
        timeout,
      };
    },
    clearNotification() {
      return initialState;
    },
  },
});

export default notificationSlice.reducer;

export const notificationActions = notificationSlice.actions;
