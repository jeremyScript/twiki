import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

const useSignUp = () => {
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

      console.log("res.user", res.user);

      if (!res || !res.user) {
        throw new Error("Could not complete the request");
      }

      await updateProfile(res.user, {
        displayName,
      });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signUp, isPending, error };
};

export default useSignUp;
