import { useState } from "react";
import { useAppSelector } from "../../hooks/useTypedHooks";
import { CSSTransition } from "react-transition-group";
import useFireStore from "../../hooks/useFirestore";
import Main from "../../components/main/Main";
import DocumentControls from "../../components/main/DocumentControls";
import PageTitle from "../../components/main/PageTitle";
import CellList from "../../components/main/CellList";
import Modal from "../../components/ui/Modal";
import Documents from "../../components/main/Documents";
import Notification from "../../components/ui/Notification";

import styles from "./Home.module.css";

const notification: { [op: string]: { success: string; error: string } } = {
  save: {
    success: "Document saved",
    error: "Document could not be saved",
  },
  load: {
    success: "Document loaded",
    error: "Document could not be loaded",
  },
  delete: {
    success: "Document deleted",
    error: "Document could not be deleted",
  },
};

const transitionStyles = {
  enter: styles["sliding-enter"],
  enterActive: styles["sliding-enter-active"],
  exit: styles["sliding-exit"],
  exitActive: styles["sliding-exit-active"],
};

const Home = () => {
  const isLoggedIn = Boolean(useAppSelector((state) => state.user.currentUser));
  const [showDocuments, setShowDocuments] = useState(false);
  const [operation, setOperation] = useState("");
  const { saveDocument, deleteDocument, isPending, success, error } =
    useFireStore();

  const toggleModal = () => {
    setShowDocuments(!showDocuments);
  };

  const informOperationType = (type: string) => {
    setOperation(type);
  };

  return (
    <Main>
      {isLoggedIn && (
        <DocumentControls
          saveDocument={saveDocument}
          deleteDocument={deleteDocument}
          showModal={toggleModal}
          informOperationType={informOperationType}
        />
      )}
      {error && (
        <Notification
          type="error"
          message={error || notification[operation]?.error}
        />
      )}
      {success && (
        <Notification
          type="success"
          message={notification[operation]?.success}
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
        <Documents closeModal={toggleModal} />
      </CSSTransition>
    </Main>
  );
};

export default Home;
