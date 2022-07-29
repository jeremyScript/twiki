import styles from "./AddCell.module.css";

const AddCell = () => {
  return (
    <div className={styles["add-cell"]}>
      <button className={styles["button--code"]}>+ Code</button>
      <div className={styles.divider} />
      <button className={styles["button--text"]}>+ Text</button>
    </div>
  );
};

export default AddCell;
