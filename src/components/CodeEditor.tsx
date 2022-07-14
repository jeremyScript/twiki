import Editor from "@monaco-editor/react";
import styles from "./CodeEditor.module.css";

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <Editor
      value={initialValue}
      height="500px"
      theme="vs-dark"
      language="javascript"
      options={{
        automaticLayout: true,
        folding: false,
        fontSize: 16,
        lineNumbersMinChars: 3,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        tabSize: 2,
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
