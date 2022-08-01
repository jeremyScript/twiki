import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import AddCell from "../ui/AddCell";
import CodeCell from "../code-cell/CodeCell";
import TextCell from "../text-cell/TextCell";

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
        <section key={id}>
          <TextCell />
          <AddCell prevCellId={id} />
        </section>
      );
    } else {
      return (
        <section key={id}>
          <CodeCell />
          <AddCell prevCellId={id} />
        </section>
      );
    }
  });

  return (
    <>
      <section>
        <AddCell />
      </section>
      {renderedCells}
    </>
  );
};

export default CellList;
