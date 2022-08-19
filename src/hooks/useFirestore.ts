import { useCallback, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./useTypedHooks";
import { db } from "../firebase/config";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  clearDocument,
  DocumentState,
  updateDocument,
} from "../state/documentSlice";
import { clearBundles } from "../state/bundlesSlice";

const useFireStore = () => {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useAppSelector((state) => state.user.currentUser);
  const document = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();

  const saveDocument = async () => {
    setIsPending(true);
    setError(null);
    setSuccess(null);

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
      setSuccess(true);
      setError(null);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
      setIsPending(false);
    }
  };

  const fetchDocuments = useCallback(async (uid: string) => {
    setIsPending(true);
    setSuccess(null);
    setError(null);

    const result: any[] = [];

    try {
      const q = query(collection(db, "documents"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => result.push(doc.data()));
      setSuccess(true);
      setError(null);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
      setIsPending(false);
    }

    return result;
  }, []);

  const fetchDocument = (document: DocumentState) => {
    try {
      setIsPending(true);
      setSuccess(null);
      setError(null);
      const { did, title, order, data } = document;
      dispatch(updateDocument({ did, title, order, data }));
      setSuccess(true);
      setError(null);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
      setIsPending(false);
    }
  };

  const deleteDocument = async () => {
    setIsPending(true);
    setSuccess(null);
    setError(null);

    const { did } = document;

    try {
      if (!did) {
        throw new Error("There is no document to delete");
      }
      await deleteDoc(doc(db, "documents", did));

      dispatch(clearDocument());
      dispatch(clearBundles());

      setError(null);
      setSuccess(true);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
      setIsPending(false);
    }
  };

  return {
    saveDocument,
    fetchDocuments,
    fetchDocument,
    deleteDocument,
    isPending,
    success,
    error,
  };
};

export default useFireStore;
