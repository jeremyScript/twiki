import styles from "./CellControls.module.css";

const CellControls = () => {
  return (
    <div className={styles["cell-controls"]}>
      <button>&#8593;</button>
      <button>&#8595;</button>
      <button>&#x2715;</button>
    </div>
  );
};

export default CellControls;
