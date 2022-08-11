import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./useTypedHooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { userLoggedIn } from "../state/userSlice";

const useLogIn = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
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
          userLoggedIn({
            uid: user.uid!,
            email: user.email!,
            displayName: user.displayName!,
          })
        );

        setError(null);
        setIsPending(false);
        navigate("/", { replace: true });
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
