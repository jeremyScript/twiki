import { useState } from "react";
import Main from "../../components/main/Main";

import styles from "./LogIn.module.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
  };

  return (
    <Main>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <h2>Log in to your tWiki account!</h2>
        <div className={styles["email"]}>
          <input
            className={styles["input"]}
            type="email"
            id="login-email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles["label"]} htmlFor="login-email">
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
            id="login-password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles["label"]} htmlFor="login-password">
            Password
          </label>
          <img
            className={styles["icon"]}
            src="./password-icon.svg"
            height={22}
            alt="password"
          />
        </div>
        <button className={styles["btn"]} type="submit">
          Log in
        </button>
      </form>
    </Main>
  );
};

export default LogIn;
