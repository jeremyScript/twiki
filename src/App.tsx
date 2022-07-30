import Header from "./components/header/Header";
import Main from "./components/main/Main";
import PageTitle from "./components//main/PageTitle";
import CellList from "./components/main/CellList";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Main>
        <PageTitle />
        <CellList />
      </Main>
    </div>
  );
}

export default App;
