import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAppDispatch } from "./useTypedHooks";
import { userLoggedIn } from "../state/userSlice";

const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

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
          userLoggedIn({
            uid: user.uid!,
            email: user.email!,
            displayName: user.displayName!,
          })
        );

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

  return { signUp, isPending, error };
};

export default useSignUp;
