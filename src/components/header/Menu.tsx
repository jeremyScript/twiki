import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav className={styles["sliding-menu"]}>
      <ul className={styles["menu-list"]}>
        <li className={styles["list-item"]}>
          <button className={styles["btn"]}>Demo #1</button>
        </li>
        <li className={styles["list-item"]}>
          <button className={styles["btn"]}>Demo #2</button>
        </li>
        <li className={styles["list-item"]}>
          <button className={styles["btn"]}>Demo #3</button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
