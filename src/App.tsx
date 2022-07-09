import React, { useRef, useState } from "react";

import styles from "./App.module.css";

function App() {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [output, setOutput] = useState("");

  const handleClickSubmit = () => {
    if (codeRef.current) {
      setOutput(codeRef.current.value);
    }
  };

  return (
    <div>
      <div className={styles["code-editor"]}>
        <textarea
          className={styles["code-cell"]}
          defaultValue={"Enter code here"}
          ref={codeRef}
        />
        <button onClick={handleClickSubmit}>Submit</button>
      </div>
      <pre className={styles["result-cell"]}>
        {">> "}
        {output}
      </pre>
    </div>
  );
}

export default App;
