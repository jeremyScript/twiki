import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./useTypedHooks";
import { db } from "../firebase/config";
import { doc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { clearDocument, updateDocument } from "../state/documentSlice";
import { clearBundles } from "../state/bundlesSlice";

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
        title: title || "(untitled)",
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

  const deleteDocument = async () => {
    setIsPending(true);
    setError(null);

    const { did } = document;

    try {
      await deleteDoc(doc(db, "documents", did));

      dispatch(clearDocument());
      dispatch(clearBundles());

      setError(null);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { saveDocument, deleteDocument, isPending, error };
};

export default useFireStore;
