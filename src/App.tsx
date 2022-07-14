import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

import styles from "./App.module.css";
import { unpkgResolvePlugin } from "./plugins/unpkg-resolve-plugin";
import { unpkgLoadPlugin } from "./plugins/unpkg-load-plugin";
import Preview from "./components/Preview";
import CodeEditor from "./components/CodeEditor";

function App() {
  const serviceRef = useRef<any>(null);
  const [input, setInput] = useState("");
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
    const initialize = async () => await startService();
    initialize();
  }, []);

  const handleInputChange = (inputCode: string) => {
    setInput(inputCode);
  };

  const handleClickSubmit = async () => {
    if (!serviceRef.current) return;
    const result = await serviceRef.current.build({
      entryPoints: ["index.tsx"],
      bundle: true,
      write: false,
      plugins: [unpkgResolvePlugin, unpkgLoadPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    setOutput(result.outputFiles[0].text);
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
