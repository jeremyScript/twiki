import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import AddCell from "../ui/AddCell";
import CodeCell from "../code-cell/CodeCell";
import TextEditor from "../text-cell/TextEditor";

import styles from "./CellList.module.css";

const CellList = () => {
  const selectCellIds = (state: RootState) => state.cells.ids;
  const selectCellData = (state: RootState) => state.cells.data;
  const cellIds = useSelector(selectCellIds);
  const cellData = useSelector(selectCellData);

  const renderedCells = cellIds.map((id) => {
    const { type } = cellData[id];
    if (type === "text") {
      return (
        <div key={id}>
          <TextEditor />
          <AddCell />
        </div>
      );
    } else if (type === "code") {
      return (
        <div key={id}>
          <CodeCell />
          <AddCell />
        </div>
      );
    }
  });

  return <div>{renderedCells}</div>;
};

export default CellList;
