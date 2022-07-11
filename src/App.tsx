import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

import styles from "./App.module.css";

function App() {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [output, setOutput] = useState("");

  const handleClickSubmit = () => {
    if (codeRef.current) {
      setOutput(codeRef.current.value);
    }
  };

  const startService = async () => {
    try {
      const service = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.57/esbuild.wasm",
      });
      console.log(service ? "esbuild initialized" : "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    startService();
  }, []);

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
