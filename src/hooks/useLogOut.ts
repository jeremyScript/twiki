import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { userLoggedOut } from "../state/userSlice";
import { useAppDispatch } from "./typed-hooks";

const useLogOut = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  const logOut = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signOut(auth);
      console.log(res);
      dispatch(userLoggedOut());
      setIsPending(false);
      setError(null);
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logOut, isPending, error };
};

export default useLogOut;
