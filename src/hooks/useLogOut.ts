import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { updateUser } from "../state/userSlice";
import { useAppDispatch } from "./useTypedHooks";

const useLogOut = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  const logOut = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      if (!isCancelled) {
        dispatch(updateUser(null));
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

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logOut, isPending, error };
};

export default useLogOut;
