import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

const TextEditor: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("# Header");

  useEffect(() => {
    const clickEventListener = (event: MouseEvent) => {
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
      <div>
        <MDEditor value={text} onChange={(value) => setText(value as string)} />
      </div>
    );
  }

  return (
    <div onClick={() => setIsEditing(true)}>
      <MDEditor.Markdown source={text} />
    </div>
  );
};

export default TextEditor;
