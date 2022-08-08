import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

import styles from "./CodeEditor.module.css";

interface CodeEditorProps {
  initialValue: string;
  handleInputChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  handleInputChange,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    handleInputChange(editor.getValue());
  };

  const handleEditorChange: OnChange = (value) => {
    handleInputChange(value as string);
  };

  const handleFormatButtonClick = () => {
    const original = editorRef?.current.getValue();
    const formatted = prettier.format(original, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    editorRef.current.setValue(formatted);
  };

  return (
    <div className={styles["editor-wrapper"]}>
      <button
        className={styles["format-button"]}
        onClick={handleFormatButtonClick}
      >
        Format
      </button>
      <Editor
        value={initialValue}
        onMount={handleEditorMount}
        onChange={handleEditorChange}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          automaticLayout: true,
          folding: false,
          fontSize: 16,
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          padding: {
            top: 10,
            bottom: 5,
          },
          scrollBeyondLastLine: false,
          tabSize: 2,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
