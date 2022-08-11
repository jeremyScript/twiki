import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedHooks";
import useLogIn from "../../hooks/useLogIn";
import Main from "../../components/main/Main";

import styles from "./LogIn.module.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, isPending, error } = useLogIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(email, password);
  };

  const isLoggedIn = Boolean(useAppSelector((state) => state.user.currentUser));

  return (
    <Main>
      {isLoggedIn && <Navigate to="/" replace={true} />}
      {!isLoggedIn && (
        <form className={styles["log-in-form"]} onSubmit={handleSubmit}>
          <h2>Log in to your tWiki account!</h2>
          <div className={styles["email"]}>
            <input
              className={styles["input"]}
              type="email"
              id="log-in-email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={styles["label"]} htmlFor="log-in-email">
              Email
            </label>
            <img
              className={styles["icon"]}
              src="./email-icon.svg"
              height={22}
              alt="email"
            />
          </div>
          <div className={styles["password"]}>
            <input
              className={styles["input"]}
              type="password"
              id="log-in-password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles["label"]} htmlFor="log-in-password">
              Password
            </label>
            <img
              className={styles["icon"]}
              src="./password-icon.svg"
              height={22}
              alt="password"
            />
          </div>
          {!isPending && (
            <button className={styles["btn"]} type="submit">
              Log in
            </button>
          )}
          {isPending && (
            <button className={styles["btn"]} type="submit">
              Logging in
            </button>
          )}
          {error && <p>{error}</p>}
        </form>
      )}
    </Main>
  );
};

export default LogIn;
