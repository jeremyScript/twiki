import { useAppSelector } from "../../hooks/typed-hooks";
import CellListItem from "./CellListItem";
import AddCell from "../ui/AddCell";
import styles from "./CellList.module.css";

const CellList = () => {
  const cellIds = useAppSelector((state) => state.cells.ids);

  let renderedCellItems = null;

  if (cellIds.length > 0) {
    renderedCellItems = cellIds.map((id) => <CellListItem key={id} id={id} />);
  }

  return (
    <>
      <section>
        <AddCell forceShow={cellIds.length === 0 ? true : false} />
      </section>
      {renderedCellItems}
    </>
  );
};

export default CellList;
