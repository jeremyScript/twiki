import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useAppSelector } from "../../hooks/useTypedHooks";

import styles from "./Notification.module.css";

interface NotificationProps {
  timeout?: number;
}

const Notification: React.FC<NotificationProps> = ({ timeout = 3000 }) => {
  const [displayNotification, clearNotification] = useNotification();

  const { error, success } = useAppSelector((state) => state.document);
  const { display, message } = useAppSelector((state) => state.notification);

  useEffect(() => {
    let timer: any;

    if (success || error) {
      displayNotification({
        type: success ? "info" : "error",
        message: success ? success : error,
        timeout,
      });
      if (!timer) {
        timer = setTimeout(() => {
          clearNotification();
        }, timeout);
      } else {
        clearTimeout(timer);
      }
    }
    return () => clearTimeout(timer);
  }, [success, error, timeout, displayNotification, clearNotification]);

  return (
    <>{display && <div className={styles["notification"]}>{message}</div>}</>
  );
};

export default Notification;
