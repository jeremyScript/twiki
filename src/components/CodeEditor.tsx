import Editor, { OnChange } from "@monaco-editor/react";
import styles from "./CodeEditor.module.css";

interface CodeEditorProps {
  initialValue: string;
  handleInputChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  handleInputChange,
}) => {
  const handleEditorChange: OnChange = (value: any, event: any) => {
    handleInputChange(value);
  };

  return (
    <Editor
      value={initialValue}
      onChange={handleEditorChange}
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
