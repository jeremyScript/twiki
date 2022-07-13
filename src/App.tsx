import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

import styles from "./App.module.css";
import { unpkgPlugin } from "./plugins/unpkg-plugin";

function App() {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const serviceRef = useRef<any>(null);
  const [output, setOutput] = useState("");

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

  const handleClickSubmit = async () => {
    if (codeRef.current) {
      if (!serviceRef.current) {
        return;
      } else {
        const result = await serviceRef.current.build({
          entryPoints: ["index.tsx"],
          bundle: true,
          write: false,
          plugins: [unpkgPlugin(codeRef.current.value)],
          define: {
            "process.env.NODE_ENV": '"production"',
            global: "window",
          },
        });
        setOutput(result.outputFiles[0].text);
      }
    }
  };

  const handleFocus = () => {
    if (!codeRef.current) return;
    if (codeRef.current.value === "Enter code here") {
      codeRef.current.value = "";
    }
  };

  return (
    <div>
      <div className={styles["code-editor"]}>
        <textarea
          className={styles["code-cell"]}
          defaultValue={"Enter code here"}
          ref={codeRef}
          onFocus={handleFocus}
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
