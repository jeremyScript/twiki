import React from "react";

import styles from "./App.module.css";

function App() {
  return (
    <div>
      <div className={styles["code-editor"]}>
        <textarea
          className={styles["code-cell"]}
          defaultValue={"Enter code here"}
        ></textarea>
        <button>Submit</button>
      </div>
      <div className={styles.result}>
        <pre>{">>"} This is the result.</pre>
      </div>
    </div>
  );
}

export default App;
