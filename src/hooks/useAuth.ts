import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAppDispatch } from "./useTypedHooks";
import { updateUser } from "../state/userSlice";
import { clearDocument } from "../state/documentSlice";
import { clearBundles } from "../state/bundlesSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUp = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res || !res.user) {
        throw new Error("Could not complete the request");
      }

      const user = res.user;

      await updateProfile(user, {
        displayName,
      });

      if (!isCancelled) {
        dispatch(
          updateUser({
            uid: user.uid!,
            email: user.email!,
            displayName: user.displayName!,
          })
        );
        dispatch(clearDocument());
        dispatch(clearBundles());
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.error(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  const logIn = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res || !res.user) {
        throw new Error("Log-in could not be completed");
      }

      if (!isCancelled) {
        const user = res.user;
        dispatch(
          updateUser({
            uid: user.uid!,
            email: user.email!,
            displayName: user.displayName!,
          })
        );
        dispatch(clearDocument());
        dispatch(clearBundles());
        setError(null);
        setIsPending(false);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.error(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  const logOut = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      if (!isCancelled) {
        dispatch(updateUser(null));
        setIsPending(false);
        setError(null);
        dispatch(clearDocument());
        dispatch(clearBundles());
        navigate("/log-in", { replace: true });
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.error(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signUp, logIn, logOut, isPending, error };
};

export default useAuth;
