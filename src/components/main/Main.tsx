import styles from "./Main.module.css";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
