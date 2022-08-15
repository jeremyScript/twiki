import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Main from "../../components/main/Main";
import DocumentControls from "../../components/main/DocumentControls";
import PageTitle from "../../components/main/PageTitle";
import CellList from "../../components/main/CellList";
import Modal from "../../components/ui/Modal";
import Documents from "../../components/main/Documents";

import styles from "./Home.module.css";

const transitionStyles = {
  enter: styles["sliding-enter"],
  enterActive: styles["sliding-enter-active"],
  exit: styles["sliding-exit"],
  exitActive: styles["sliding-exit-active"],
};

const Home = () => {
  const [showDocuments, setShowDocuments] = useState(false);

  const toggleModal = () => {
    setShowDocuments(!showDocuments);
  };

  return (
    <Main>
      <DocumentControls showModal={toggleModal} />
      <PageTitle />
      <CellList />
      {showDocuments && <Modal handleClick={toggleModal} />}
      <CSSTransition
        in={showDocuments}
        timeout={300}
        classNames={transitionStyles}
        unmountOnExit
      >
        <Documents closeModal={toggleModal} />
      </CSSTransition>
    </Main>
  );
};

export default Home;
