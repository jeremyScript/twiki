import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";

import Menu from "./Menu";
import MenuIcon from "./MenuIcon";
import Modal from "../ui/Modal";

import styles from "./Header.module.css";

const transitionStyles = {
  enter: styles["sliding-enter"],
  enterActive: styles["sliding-enter-active"],
  exit: styles["sliding-exit"],
  exitActive: styles["sliding-exit-active"],
};

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
        timeout={200}
        classNames={transitionStyles}
        unmountOnExit
      >
        <Menu />
      </CSSTransition>
      <nav className={styles["nav"]}>
        <ul>
          <li className={styles["nav-item"]}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink to="log-in">Log in</NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink to="sign-up">Sign up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
