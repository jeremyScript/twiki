import useFireStore from "../../hooks/useFirestore";
import { useAppDispatch } from "../../hooks/useTypedHooks";
import { clearBundles } from "../../state/bundlesSlice";
import { clearDocument } from "../../state/documentSlice";
import styles from "./DocumentControls.module.css";

interface DocumentControlsProps {
  showModal: () => void;
}

const DocumentControls: React.FC<DocumentControlsProps> = ({ showModal }) => {
  const { saveDocument, deleteDocument, isPending, error } = useFireStore();
  const dispatch = useAppDispatch();

  return (
    <div className={styles["document-controls"]}>
      <button
        className={`${styles["control-btn"]} ${styles["new"]}`}
        onClick={() => {
          dispatch(clearDocument());
          dispatch(clearBundles());
        }}
      >
        New
      </button>
      <button
        className={`${styles["control-btn"]} ${styles["save"]}`}
        onClick={saveDocument}
      >
        Save
      </button>
      <button
        className={`${styles["control-btn"]} ${styles["load"]}`}
        onClick={showModal}
      >
        Load
      </button>
      <button
        className={`${styles["control-btn"]} ${styles["delete"]}`}
        onClick={deleteDocument}
      >
        Delete
      </button>
    </div>
  );
};

export default DocumentControls;
