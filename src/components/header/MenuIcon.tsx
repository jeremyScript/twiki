import styles from "./MenuIcon.module.css";

interface MenuIconProps {
  showMenu: boolean;
  handleMenuClick: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ showMenu, handleMenuClick }) => {
  const classOnToggle = showMenu ? styles.change : "";

  return (
    <div
      className={styles["menu-icon"]}
      onClick={handleMenuClick}
      aria-label="menu-control"
      role="button"
    >
      <div className={`${styles.bar1} ${classOnToggle}`} />
      <div className={`${styles.bar2} ${classOnToggle}`} />
      <div className={`${styles.bar3} ${classOnToggle}`} />
    </div>
  );
};

export default MenuIcon;
