import { useState } from "react";
import Main from "../../components/main/Main";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
  };

  return (
    <Main>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <h2>Create your tWiki account!</h2>
        <div className={styles["name"]}>
          <input
            className={styles["input"]}
            type="text"
            id="signup-name"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles["label"]} htmlFor="signup-name">
            Name
          </label>
          <img
            className={styles["icon"]}
            src="./name-icon.svg"
            height={22}
            alt="name"
          />
        </div>
        <div className={styles["email"]}>
          <input
            className={styles["input"]}
            type="email"
            id="signup-email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles["label"]} htmlFor="signup-email">
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
            id="signup-password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles["label"]} htmlFor="signup-password">
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
          Sign up
        </button>
      </form>
    </Main>
  );
};

export default SignUp;
