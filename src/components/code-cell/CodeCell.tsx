import { useEffect } from "react";
import { createBundle } from "../../state/bundlesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import { selectOrderedCells, updateCell } from "../../state/cellsSlice";
import { RootState } from "../../state/store";
import Preview from "./Preview";
import CodeEditor from "./CodeEditor";
import Resizable from "./Resizable";
import Label from "../ui/Label";
import Loader from "../ui/Loader";

import styles from "./CodeCell.module.css";
import useCumulativeCode from "../../hooks/use-cumulative-code";

interface CodeCellProps {
  id: string;
  content?: string;
}

const CodeCell: React.FC<CodeCellProps> = ({ id, content }) => {
  const dispatch = useAppDispatch();

  const selectBundle = (state: RootState) => state.bundles[id];
  const bundle = useAppSelector(selectBundle);

  const cumulativeCode = useCumulativeCode(id);

  const handleInputChange = (value: string) => {
    dispatch(updateCell({ id, content: value }));
  };

  useEffect(() => {
    const bundler = setTimeout(() => {
      if (!bundle) {
        dispatch(createBundle(id, cumulativeCode));
        return;
      }
      dispatch(createBundle(id, cumulativeCode));
    }, 1500);

    return () => {
      clearTimeout(bundler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, dispatch]);

  return (
    <Resizable direction="vertical">
      <div className={styles["code-cell"]}>
        <Label label="Code Editor" />
        <Resizable direction="horizontal">
          <CodeEditor initialValue="" handleInputChange={handleInputChange} />
        </Resizable>
        <div className={styles["preview-wrapper"]}>
          {!bundle || bundle.bundling ? (
            <Loader />
          ) : (
            <Preview code={bundle.code} bundleStatus={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
