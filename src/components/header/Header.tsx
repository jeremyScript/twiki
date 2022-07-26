import { useState } from "react";
import MenuIcon from "./MenuIcon";
import Modal from "../Modal";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <header className={styles.header}>
      <MenuIcon showMenu={showMenu} handleMenuClick={handleMenuClick} />
      {showMenu && (
        <Modal handleClick={handleMenuClick}>
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
        </Modal>
      )}
    </header>
  );
};

export default Header;
