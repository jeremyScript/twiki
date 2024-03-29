import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../hooks/useTypedHooks";
import { updateCell } from "../../state/documentSlice";
import MDEditor from "@uiw/react-md-editor";
import Label from "../ui/Label";

import styles from "./TextCell.module.css";

interface TextCellProps {
  id: string;
  content?: string;
  locked?: boolean;
}

const TextCell: React.FC<TextCellProps> = ({ id, content, locked }) => {
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

  if (isEditing && !locked) {
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
      className={`${styles["text-cell"]} ${styles.closed}`}
      data-color-mode="dark"
      onClick={() => setIsEditing(true)}
    >
      <Label label="Text Editor" />
      <MDEditor.Markdown source={content || "Click to edit"} />
    </div>
  );
};

export default TextCell;
