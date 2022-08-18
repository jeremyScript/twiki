import { useEffect, useState } from "react";
import styles from "./Notification.module.css";

interface NotificationProps {
  type: "success" | "error";
  message?: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer: any;
    if (!timer) {
      timer = setTimeout(() => {
        setShow(false);
      }, 2500);
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, []);

  return <>{show && <div className={styles["notification"]}>{message}</div>}</>;
};

export default Notification;
