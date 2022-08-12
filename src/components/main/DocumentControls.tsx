import { useAppDispatch } from "../../hooks/useTypedHooks";
import { saveDoc } from "../../state/documentSlice";
import styles from "./DocumentControls.module.css";

const DocumentControls = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button className={styles["control-btn"]}>New</button>
      <button
        className={styles["control-btn"]}
        onClick={() => dispatch(saveDoc())}
      >
        Save
      </button>
      <button className={styles["control-btn"]}>Load</button>
      <button className={styles["control-btn"]}>Delete</button>
    </div>
  );
};

export default DocumentControls;
