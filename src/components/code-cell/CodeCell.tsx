import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import { updateCell } from "../../state/cellsSlice";
import { RootState } from "../../state/store";
import bundle from "../../bundler";
import Preview from "./Preview";
import CodeEditor from "./CodeEditor";
import Resizable from "./Resizable";
import Label from "../ui/Label";

import styles from "./CodeCell.module.css";

interface CodeCellProps {
  id: string;
  content?: string;
}

const CodeCell: React.FC<CodeCellProps> = ({ id, content }) => {
  const selectCellContent = (state: RootState) => state.cells.data[id].content;
  const input = useAppSelector(selectCellContent);

  const dispatch = useAppDispatch();

  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  const handleInputChange = (value: string) => {
    dispatch(updateCell({ id, content: value }));
  };

  useEffect(() => {
    const bundler = setTimeout(async () => {
      const bundled = await bundle(input);
      setOutput(bundled.code);
      setStatus(bundled.bundlingStatus);
    }, 1000);

    return () => {
      clearTimeout(bundler);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className={styles["code-cell"]}>
        <Label label="Code Editor" />
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 123;"
            handleInputChange={handleInputChange}
          />
        </Resizable>
        <Preview code={output} bundlingStatus={status} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
