import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "./useTypedHooks";
import { updateUser } from "../state/userSlice";

const useLogIn = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logIn, isPending, error };
};

export default useLogIn;
