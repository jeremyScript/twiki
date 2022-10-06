import { useAppDispatch } from "./useTypedHooks";
import {
  notificationActions,
  NotificationAction,
} from "../state/notificationSlice";
import { useCallback } from "react";

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const displayNotification = useCallback(
    (notification: NotificationAction) => {
      dispatch(notificationActions.displayNotification(notification));
    },
    [dispatch]
  );

  const clearNotification = useCallback(() => {
    dispatch(notificationActions.clearNotification());
  }, [dispatch]);

  return [displayNotification, clearNotification] as const;
};
