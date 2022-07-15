import React, { useState } from "react";

import bundle from "../bundler";
import Preview from "./Preview";
import CodeEditor from "./CodeEditor";

const CodeCell = () => {
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
      <div>
        <button onClick={handleClickSubmit}>Submit</button>
      </div>
      <CodeEditor
        initialValue="const a = 123;"
        handleInputChange={handleInputChange}
      />
      <Preview code={output} />
      <pre>
        {">> "}
        {output}
      </pre>
    </div>
  );
};

export default CodeCell;
