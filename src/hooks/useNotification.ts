import { useAppDispatch } from "./useTypedHooks";
import {
  notificationActions,
  NotificationState,
} from "../state/notificationSlice";

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const displayNotification = (notification: NotificationState) => {
    dispatch(notificationActions.displayNotification(notification));
  };

  const clearNotification = (notification: NotificationState) => {
    dispatch(notificationActions.clearNotification());
  };

  return [displayNotification, clearNotification];
};
