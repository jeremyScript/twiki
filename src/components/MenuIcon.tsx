import { useState } from "react";

import styles from "./MenuIcon.module.css";

const MenuIcon: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {};

  return (
    <div className={styles["menu-icon"]} onClick={handleClick}>
      <div className={styles.bar1} />
      <div className={styles.bar2} />
      <div className={styles.bar3} />
    </div>
  );
};

export default MenuIcon;
