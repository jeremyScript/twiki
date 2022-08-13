import { useAppDispatch } from "../../hooks/useTypedHooks";
import { saveDoc } from "../../state/documentSlice";
import styles from "./DocumentControls.module.css";

const DocumentControls = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles["document-controls"]}>
      <button className={`${styles["control-btn"]} ${styles["new"]}`}>
        New
      </button>
      <button
        className={`${styles["control-btn"]} ${styles["save"]}`}
        onClick={() => dispatch(saveDoc())}
      >
        Save
      </button>
      <button className={`${styles["control-btn"]} ${styles["load"]}`}>
        Load
      </button>
      <button className={`${styles["control-btn"]} ${styles["delete"]}`}>
        Delete
      </button>
    </div>
  );
};

export default DocumentControls;
