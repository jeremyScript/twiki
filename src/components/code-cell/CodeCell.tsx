import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import { createBundle } from "../../state/bundlesSlice";
import { updateCell } from "../../state/cellsSlice";
import { RootState } from "../../state/store";
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
  const selectBundle = (state: RootState) => state.bundles[id];
  const bundle = useAppSelector(selectBundle);

  const dispatch = useAppDispatch();

  const handleInputChange = (value: string) => {
    dispatch(updateCell({ id, content: value }));
  };

  useEffect(() => {
    const bundler = setTimeout(() => {
      if (!bundle) {
        dispatch(createBundle(id, content as string));
        return;
      }
      dispatch(createBundle(id, content as string));
    }, 1000);

    return () => {
      clearTimeout(bundler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, id, dispatch]);

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
        {!bundle || bundle.bundling ? (
          <div>loading</div>
        ) : (
          <Preview code={bundle.code} bundleStatus={bundle.error} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
