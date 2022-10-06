import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAppSelector } from "../../hooks/useTypedHooks";
import { DocumentState } from "../../state/documentSlice";
import { useFireStore } from "../../hooks/useFirestore";
import Loader from "../ui/Loader";

import styles from "./Documents.module.css";

interface DocumentsProps {
  fetchDocument: (document: DocumentState) => void;
  closeModal: () => void;
}

const Documents: React.FC<DocumentsProps> = ({ fetchDocument, closeModal }) => {
  const [documents, setDocuments] = useState<DocumentState[]>([]);
  const { fetchDocuments } = useFireStore();

  const uid = useAppSelector((state) => state.user.currentUser?.uid);
  const { pending, error } = useAppSelector((state) => state.document);

  useEffect(() => {
    if (uid) {
      fetchDocuments(uid).then((data) => setDocuments(data));
    }
  }, [uid, fetchDocuments]);

  const handleDocumentClick = (document: DocumentState) => {
    fetchDocument(document);
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
        {pending && <Loader />}
        {error && <p className={styles["error"]}>{error}</p>}
        {!pending && !error && (
          <div className={styles["documents"]}>
            <ul className={styles["document-list"]}>{renderedDocuments}</ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Documents;
