import useFireStore from "../../hooks/useFirestore";
import styles from "./DocumentControls.module.css";

interface DocumentControlsProps {
  showModal: () => void;
}

const DocumentControls: React.FC<DocumentControlsProps> = ({ showModal }) => {
  const { saveDocument, deleteDocument, isPending, error } = useFireStore();

  return (
    <div className={styles["document-controls"]}>
      <button className={`${styles["control-btn"]} ${styles["new"]}`}>
        New
      </button>
      <button
        className={`${styles["control-btn"]} ${styles["save"]}`}
        onClick={() => saveDocument()}
      >
        Save
      </button>
      <button
        className={`${styles["control-btn"]} ${styles["load"]}`}
        onClick={showModal}
      >
        Load
      </button>
      <button className={`${styles["control-btn"]} ${styles["delete"]}`}>
        Delete
      </button>
    </div>
  );
};

export default DocumentControls;
