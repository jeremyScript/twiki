import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DocumentState, updateDocument } from "../../state/documentSlice";

import styles from "./Documents.module.css";

interface DocumentsProps {
  closeModal: () => void;
}

const Documents: React.FC<DocumentsProps> = ({ closeModal }) => {
  const uid = useAppSelector((state) => state.user.currentUser?.uid);
  const [documents, setDocuments] = useState<DocumentState[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsPending(true);
        setError(null);
        const data: any = [];
        const q = query(collection(db, "documents"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => data.push(doc.data()));
        setDocuments(data);
        setError(null);
        setIsPending(false);
      } catch (err: any) {
        setError(err.message);
        setIsPending(false);
      }
    };
    fetchDocuments();
  }, [uid]);

  const handleDocumentClick = (document: DocumentState) => {
    const { did, title, order, data } = document;
    dispatch(updateDocument({ did, title, order, data }));
    closeModal();
  };

  const renderedDocuments = documents.map((document) => (
    <div
      className={styles["document"]}
      key={document.did}
      onClick={() => handleDocumentClick(document)}
    >
      {document.title}
    </div>
  ));

  return (
    <>
      <div className={styles["load-documents"]}>
        <h2 className={styles["header"]}>Saved Documents</h2>
        <hr />
        {isPending && <p>Loading</p>}
        {error && <p>{error}</p>}
        {!isPending && !error && (
          <ul className={styles["document-list"]}>{renderedDocuments}</ul>
        )}
      </div>
    </>
  );
};

export default Documents;
