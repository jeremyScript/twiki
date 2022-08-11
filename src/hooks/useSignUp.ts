import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "./typed-hooks";
import { userLoggedIn } from "../state/userSlice";

const useSignUp = () => {
  const dispatch = useAppDispatch();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

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

      dispatch(
        userLoggedIn({
          uid: user.uid!,
          email: user.email!,
          displayName: user.displayName!,
        })
      );

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signUp, isPending, error };
};

export default useSignUp;