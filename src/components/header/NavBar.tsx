import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles["nav"]}>
      <ul>
        <li className={styles["nav-item"]}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles["isActive"] : "")}
          >
            Home
          </NavLink>
        </li>
        <li className={styles["nav-item"]}>
          <NavLink
            to="log-in"
            className={({ isActive }) =>
              isActive
                ? `${styles["isActive"]} ${styles["log-in"]}`
                : styles["log-in"]
            }
          >
            Log in
          </NavLink>
        </li>
        <li className={`${styles["nav-item"]}`}>
          <NavLink
            to="sign-up"
            className={({ isActive }) =>
              isActive
                ? `${styles["isActive"]} ${styles["sign-up"]}`
                : styles["sign-up"]
            }
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
