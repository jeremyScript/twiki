import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

import styles from "./App.module.css";

function App() {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const serviceRef = useRef<any>(null);
  const [output, setOutput] = useState("");

  const handleClickSubmit = async () => {
    if (codeRef.current) {
      if (!serviceRef.current) {
        return;
      } else {
        const result = await serviceRef.current.transform(
          codeRef.current.value,
          {
            loader: "tsx",
            target: "es2015",
          }
        );
        setOutput(result.code);
      }
    }
  };

  const startService = async () => {
    try {
      serviceRef.current = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.57/esbuild.wasm",
      });
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
