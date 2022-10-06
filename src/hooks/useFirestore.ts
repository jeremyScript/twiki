import { useCallback } from "react";
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
  isPending,
  isSuccessful,
  hasError,
} from "../state/documentSlice";
import { clearBundles } from "../state/bundlesSlice";

export const useFireStore = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const document = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();

  const saveDocument = async () => {
    dispatch(isPending());

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

      dispatch(isSuccessful("Document saved"));
    } catch (err: any) {
      dispatch(hasError(err.message));
    }
  };

  const fetchDocuments = useCallback(
    async (uid: string) => {
      dispatch(isPending());

      const result: any[] = [];

      try {
        const q = query(collection(db, "documents"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => result.push(doc.data()));

        dispatch(isSuccessful(""));
      } catch (err: any) {
        dispatch(hasError(err.message));
      }
      return result;
    },
    [dispatch]
  );

  const fetchDocument = (document: DocumentState) => {
    dispatch(isPending());

    const { did, title, order, data } = document;

    try {
      dispatch(updateDocument({ did, title, order, data }));
      dispatch(isSuccessful("Document loaded"));
    } catch (err: any) {
      dispatch(hasError(err.message));
    }
  };

  const deleteDocument = async () => {
    dispatch(isPending());

    const { did } = document;

    try {
      if (!did) {
        throw new Error("There is no document to delete");
      }
      await deleteDoc(doc(db, "documents", did));

      dispatch(clearDocument());
      dispatch(clearBundles());
      dispatch(isSuccessful("Document deleted"));
    } catch (err: any) {
      dispatch(hasError(err.message));
    }
  };

  return {
    saveDocument,
    fetchDocuments,
    fetchDocument,
    deleteDocument,
  };
};
