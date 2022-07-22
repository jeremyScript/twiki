import CodeCell from "./components/code-cell/CodeCell";
import PageTitle from "./components/PageTitle";
import TextEditor from "./components/text-cell/TextEditor";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <PageTitle />
      <TextEditor />
      <CodeCell />
    </div>
  );
}

export default App;
