import MenuIcon from "./MenuIcon";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <MenuIcon />
      <nav className={styles["sliding-menu"]}>
        <ul className={styles["menu-contents"]}>
          <li>
            <button>&#43; New</button>
          </li>
          <li>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
              >
                <path d="M12,16a1,1,0,0,1-.71-.29l-4-4a1,1,0,0,1,1.41-1.41L12,13.59l3.29-3.29a1,1,0,0,1,1.41,1.41l-4,4A1,1,0,0,1,12,16Z" />
                <path d="M12 16a1 1 0 0 1-1-1V5a1 1 0 0 1 2 0V15A1 1 0 0 1 12 16zM19 20H5a1 1 0 0 1 0-2H19a1 1 0 0 1 0 2z" />
              </svg>{" "}
              Save
            </button>
          </li>
          <li>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
              >
                <path d="M12,20a1,1,0,0,1-.71-.29l-4-4a1,1,0,0,1,1.41-1.41L12,17.59l3.29-3.29a1,1,0,0,1,1.41,1.41l-4,4A1,1,0,0,1,12,20Z" />
                <path d="M12 20a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0V19A1 1 0 0 1 12 20zM19 6H5A1 1 0 0 1 5 4H19a1 1 0 0 1 0 2z" />
              </svg>{" "}
              Load
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
