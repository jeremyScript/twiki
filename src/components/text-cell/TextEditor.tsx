import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const TextEditor: React.FC = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <MDEditor value={text} onChange={(value) => setText(value as string)} />
    </div>
  );
};

export default TextEditor;
