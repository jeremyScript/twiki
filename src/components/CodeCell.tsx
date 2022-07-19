import React, { useEffect, useState } from "react";

import bundle from "../bundler";
import Preview from "./Preview";
import CodeEditor from "./CodeEditor";
import Resizable from "./Resizable";

import styles from "./CodeCell.module.css";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (inputCode: string) => {
    setInput(inputCode);
  };

  useEffect(() => {
    const bundler = setTimeout(async () => {
      const bundled = await bundle(input);
      setOutput(bundled);
    }, 1000);

    return () => {
      clearTimeout(bundler);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className={styles["code-cell"]}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 123;"
            handleInputChange={handleInputChange}
          />
        </Resizable>
        <Preview code={output} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
