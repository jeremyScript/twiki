import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav className={styles["sliding-menu"]}>
      <ul className={styles["menu-contents"]}>
        <li>
          <button>&#43; New</button>
        </li>
        <li>
          <button>
            <img src="./save.svg" height={13} alt="save" /> Save
          </button>
        </li>
        <li>
          <button>
            <img src="./load.svg" height={13} alt="load" /> Load
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
