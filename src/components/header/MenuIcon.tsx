import { useState } from "react";

import styles from "./MenuIcon.module.css";

const MenuIcon: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const classOnToggle = showMenu ? styles.change : "";

  return (
    <div
      className={styles["menu-icon"]}
      onClick={handleClick}
      aria-label="menu-control"
    >
      <div className={`${styles.bar1} ${classOnToggle}`} />
      <div className={`${styles.bar2} ${classOnToggle}`} />
      <div className={`${styles.bar3} ${classOnToggle}`} />
    </div>
  );
};

export default MenuIcon;
