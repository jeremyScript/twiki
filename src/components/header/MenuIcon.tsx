import { useState } from "react";

import styles from "./MenuIcon.module.css";

const MenuIcon: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const classOnToggle = isMenuOpen ? styles.change : "";

  return (
    <div className={styles["menu-icon"]} onClick={handleClick}>
      <div className={`${styles.bar1} ${classOnToggle}`} />
      <div className={`${styles.bar2} ${classOnToggle}`} />
      <div className={`${styles.bar3} ${classOnToggle}`} />
    </div>
  );
};

export default MenuIcon;
