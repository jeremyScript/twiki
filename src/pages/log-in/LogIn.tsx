import Main from "../../components/main/Main";
import styles from "./LogIn.module.css";

const LogIn = () => {
  return (
    <Main>
      <form className={styles["login-form"]}>
        <h2>Log in to your tWiki account!</h2>
        <div className={styles["email"]}>
          <input
            className={styles["input"]}
            type="email"
            id="login-email"
            placeholder=" "
          />
          <label className={styles["label"]} htmlFor="login-email">
            Email
          </label>
          <img src="./email-icon.svg" height={22} alt="email" />
        </div>
        <div className={styles["password"]}>
          <input
            className={styles["input"]}
            type="password"
            id="login-password"
            placeholder=" "
          />
          <label className={styles["label"]} htmlFor="login-password">
            Password
          </label>
          <img src="./password-icon.svg" height={22} alt="password" />
        </div>
        <button className={styles["btn"]} type="submit">
          Log In
        </button>
      </form>
    </Main>
  );
};

export default LogIn;
