import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";

import styles from "./TextCell.module.css";

const TextCell: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("# Header");

  useEffect(() => {
    const clickEventListener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsEditing(false);
    };

    document.addEventListener("click", clickEventListener, { capture: true });

    return () => {
      document.removeEventListener("click", clickEventListener, {
        capture: true,
      });
    };
  }, []);

  if (isEditing) {
    return (
      <div
        className={styles["text-cell"]}
        data-color-mode="dark"
        ref={editorRef}
      >
        <MDEditor value={text} onChange={(value) => setText(value as string)} />
      </div>
    );
  }

  return (
    <div
      className={styles["text-cellr"]}
      data-color-mode="dark"
      onClick={() => setIsEditing(true)}
    >
      <MDEditor.Markdown source={text} />
    </div>
  );
};

export default TextCell;
