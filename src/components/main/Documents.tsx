import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { DocumentState, updateDocument } from "../../state/documentSlice";
import Loader from "../ui/Loader";

import styles from "./Documents.module.css";
import useFireStore from "../../hooks/useFirestore";

interface DocumentsProps {
  closeModal: () => void;
}

const Documents: React.FC<DocumentsProps> = ({ closeModal }) => {
  const [documents, setDocuments] = useState<DocumentState[]>([]);
  const { fetchDocuments, isPending, success, error } = useFireStore();

  const uid = useAppSelector((state) => state.user.currentUser?.uid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid) {
      fetchDocuments(uid).then((data) => setDocuments(data));
    }
  }, [uid, fetchDocuments]);

  const handleDocumentClick = (document: DocumentState) => {
    const { did, title, order, data } = document;
    dispatch(updateDocument({ did, title, order, data }));
    closeModal();
  };

  const renderedDocuments = documents.map((document) => {
    const timeAgo = document.timestamp
      ? formatDistanceToNow(document.timestamp.toDate(), { addSuffix: true })
      : "";

    return (
      <div
        key={document.did}
        className={styles["document"]}
        onClick={() => handleDocumentClick(document)}
      >
        <img
          className={styles["icon"]}
          src="document-icon.svg"
          alt="document"
        />
        <div>
          <span className={styles["title"]}>"{document.title}"</span>
          <span className={styles["time"]}> - {timeAgo}</span>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles["load-documents"]}>
        <h2 className={styles["header"]}>Saved Documents</h2>
        <hr />
        {isPending && <Loader />}
        {error && <p className={styles["error"]}>{error}</p>}
        {!isPending && !error && (
          <div className={styles["documents"]}>
            <ul className={styles["document-list"]}>{renderedDocuments}</ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Documents;
