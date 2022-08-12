import { useAppSelector } from "../../hooks/useTypedHooks";
import CellListItem from "./CellListItem";
import AddCell from "../ui/AddCell";

const CellList = () => {
  const cellIds = useAppSelector((state) => state.document.order);

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
