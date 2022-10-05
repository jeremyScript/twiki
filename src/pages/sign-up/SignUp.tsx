import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedHooks";
import { useAuth } from "../../hooks/useAuth";
import Main from "../../components/main/Main";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isPending, error } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(name, email, password);
  };

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isLoggedIn = Boolean(currentUser);

  return (
    <Main>
      {isLoggedIn && (
        <Navigate to={`/@${currentUser?.displayName}`} replace={true} />
      )}
      {!isLoggedIn && (
        <form className={styles["sign-up-form"]} onSubmit={handleSubmit}>
          <h2>Create your tWiki account!</h2>
          <div className={styles["name"]}>
            <input
              className={styles["input"]}
              type="text"
              id="sign-up-name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className={styles["label"]} htmlFor="sign-up-name">
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
              id="sign-up-email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={styles["label"]} htmlFor="sign-up-email">
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
              id="sign-up-password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles["label"]} htmlFor="sign-up-password">
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
              Sign up
            </button>
          )}
          {isPending && (
            <button className={styles["btn"]} disabled>
              Loading
            </button>
          )}
          {error && <p>{error}</p>}
        </form>
      )}
    </Main>
  );
};

export default SignUp;
