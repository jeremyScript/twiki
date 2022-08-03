import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-wrapper"]}>
      <div className={styles.loader} />
      <span className={styles.loading}>Loading</span>
    </div>
  );
};

export default Loader;
