import { Link } from "react-router-dom";

import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav className={styles["sliding-menu"]}>
      <ul className={styles["menu-list"]}>
        <li className={styles["list-item"]}>
          <Link to="/intro" className={styles["link"]}>
            Introduction
          </Link>
        </li>
        <li className={styles["list-item"]}>
          <Link to="/demo" className={styles["link"]}>
            Demo
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
