import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./useTypedHooks";
import { db } from "../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { updateDocument } from "../state/documentSlice";

const useFireStore = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const user = useAppSelector((state) => state.user.currentUser);
  const document = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();

  const saveDocument = async () => {
    setIsPending(true);
    setError(null);

    const { uid } = user!;
    const { title, order, data } = document;
    const did = document.did || nanoid();

    try {
      await setDoc(doc(db, "documents", did), {
        uid,
        did,
        title,
        order,
        data,
        timestamp: serverTimestamp(),
      });

      dispatch(
        updateDocument({
          did,
        })
      );
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const loadDocument = () => {};

  const deleteDocument = () => {};

  return { saveDocument, loadDocument, deleteDocument, isPending, error };
};

export default useFireStore;
