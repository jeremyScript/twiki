import Header from "./components/header/Header";
import CodeCell from "./components/code-cell/CodeCell";
import PageTitle from "./components/PageTitle";
import TextEditor from "./components/text-cell/TextEditor";
import Main from "./components/Main";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Main>
        <PageTitle />
        <TextEditor />
        <CodeCell />
      </Main>
    </div>
  );
}

export default App;
