import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/useTypedHooks";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { updateUser } from "./state/userSlice";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import LogIn from "./pages/log-in/LogIn";
import Header from "./components/header/Header";

import styles from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();
  const isAuthReady = useAppSelector((state) => state.user.isAuthReady);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUser({
            uid: user.uid!,
            email: user.email!,
            displayName: user.displayName!,
          })
        );
      } else {
        dispatch(updateUser(null));
      }
    });
    return () => unsub();
  }, [dispatch]);

  return (
    <div className={styles.App}>
      {isAuthReady && (
        <>
          <Header />
          <Routes>
            {["/", "/intro", "/demo"].map((path) => (
              <Route key={path} path={path} element={<Home />} />
            ))}
            <Route path="/@:displayName" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<LogIn />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
