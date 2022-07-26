import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import MenuIcon from "./MenuIcon";
import Modal from "../Modal";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.header}>
      <MenuIcon showMenu={showMenu} handleMenuClick={handleMenuClick} />
      {showMenu && <Modal handleClick={handleMenuClick} />}
      <CSSTransition
        in={showMenu}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: styles["sliding-enter"],
          enterActive: styles["sliding-enter-active"],
          exit: styles["sliding-exit"],
          exitActive: styles["sliding-exit-active"],
        }}
      >
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
      </CSSTransition>
    </header>
  );
};

export default Header;
