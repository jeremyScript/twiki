import { useEffect, useState } from "react";
import { Navigate, useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { CSSTransition } from "react-transition-group";
import { clearDocument, updateDocument } from "../../state/documentSlice";
import { clearBundles } from "../../state/bundlesSlice";
import { useFireStore } from "../../hooks/useFirestore";
import Main from "../../components/main/Main";
import DocumentControls from "../../components/main/DocumentControls";
import PageTitle from "../../components/main/PageTitle";
import CellList from "../../components/main/CellList";
import Modal from "../../components/ui/Modal";
import Documents from "../../components/main/Documents";
import Notification from "../../components/ui/Notification";

import { intro } from "../../documents/intro";
import styles from "./Home.module.css";

const transitionStyles = {
  enter: styles["sliding-enter"],
  enterActive: styles["sliding-enter-active"],
  exit: styles["sliding-exit"],
  exitActive: styles["sliding-exit-active"],
};

const Home = () => {
  const isLoggedIn = Boolean(useAppSelector((state) => state.user.currentUser));
  const [showDocuments, setShowDocuments] = useState(false);
  const { saveDocument, fetchDocument, deleteDocument } = useFireStore();

  const dispatch = useAppDispatch();

  const matchIndex = useMatch("/");
  const matchIntro = useMatch("/intro");
  const matchDemo = useMatch("/demo");

  useEffect(() => {
    if (matchIntro) {
      dispatch(updateDocument(intro));
    } else if (matchDemo) {
      dispatch(clearDocument());
      dispatch(clearBundles());
    }
  }, [dispatch, matchIntro, matchDemo]);

  const toggleModal = () => {
    setShowDocuments(!showDocuments);
  };

  return (
    <>
      {matchIndex && <Navigate to="/intro" replace={true} />}
      <Main>
        <Notification />
        {isLoggedIn && (
          <DocumentControls
            saveDocument={saveDocument}
            deleteDocument={deleteDocument}
            showModal={toggleModal}
          />
        )}
        <PageTitle />
        <CellList />
        {showDocuments && <Modal handleClick={toggleModal} />}
        <CSSTransition
          in={showDocuments}
          timeout={200}
          classNames={transitionStyles}
          unmountOnExit
        >
          <Documents fetchDocument={fetchDocument} closeModal={toggleModal} />
        </CSSTransition>
      </Main>
    </>
  );
};

export default Home;
