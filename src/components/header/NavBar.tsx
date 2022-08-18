import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedHooks";
import useAuth from "../../hooks/useAuth";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const { logOut } = useAuth();

  return (
    <nav className={styles["nav"]}>
      <ul>
        {user && (
          <span className={styles["welcome-user"]}>
            hello, {user.displayName}
          </span>
        )}
        <li className={styles["nav-item"]}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles["isActive"] : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <li className={styles["nav-item"]}>
            <NavLink to="/" className={styles["log-out"]} onClick={logOut}>
              Log out
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
