import React, { useState } from "react";

import Preview from "./components/Preview";
import CodeEditor from "./components/CodeEditor";
import bundle from "./bundler";
import styles from "./App.module.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (inputCode: string) => {
    setInput(inputCode);
  };

  const handleClickSubmit = async () => {
    const bundled = await bundle(input);
    setOutput(bundled);
  };

  return (
    <div>
      <div className={styles["code-editor"]}>
        <button onClick={handleClickSubmit}>Submit</button>
      </div>
      <CodeEditor
        initialValue="const a = 123;"
        handleInputChange={handleInputChange}
      />
      <Preview code={output} />
      <pre className={styles["result-cell"]}>
        {">> "}
        {output}
      </pre>
    </div>
  );
}

export default App;
