import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../hooks/typed-hooks";
import { updateCell } from "../../state/cellsSlice";

import styles from "./TextCell.module.css";

interface TextCellProps {
  id: string;
  content?: string;
}

const TextCell: React.FC<TextCellProps> = ({ id, content }) => {
  const dispatch = useAppDispatch();
  const editorRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);

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
        className={`${styles["text-cell"]} ${styles["open"]}`}
        data-color-mode="dark"
        ref={editorRef}
      >
        <MDEditor
          value={content}
          onChange={(value) =>
            dispatch(updateCell({ id: id, content: value || "" }))
          }
        />
      </div>
    );
  }

  return (
    <div
      className={styles["text-cell"]}
      data-color-mode="dark"
      onClick={() => setIsEditing(true)}
    >
      <MDEditor.Markdown source={content || "Click to edit"} />
    </div>
  );
};

export default TextCell;
