import { Link } from "react-router-dom";

import styles from "./Menu.module.css";

interface MenuProps {
  handleClick?: () => void;
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ handleClick }) => {
  return (
    <nav className={styles["sliding-menu"]}>
      <ul className={styles["menu-list"]}>
        <li className={styles["list-item"]}>
          <Link to="/intro" className={styles["link"]} onClick={handleClick}>
            Introduction
          </Link>
        </li>
        <li className={styles["list-item"]}>
          <Link to="/demo" className={styles["link"]} onClick={handleClick}>
            Demo
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
