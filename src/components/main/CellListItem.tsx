import { useAppSelector } from "../../hooks/useTypedHooks";
import CodeCell from "../code-cell/CodeCell";
import TextCell from "../text-cell/TextCell";
import AddCell from "../ui/AddCell";
import CellControls from "../ui/CellControls";

import styles from "./CellListItem.module.css";

interface CellListItemProps {
  id: string;
}

const CellListItem: React.FC<CellListItemProps> = ({ id }) => {
  const { type, content } = useAppSelector((state) => state.cells.data[id]);

  const renderedCell =
    type === "code" ? (
      <CodeCell id={id} content={content} />
    ) : (
      <TextCell id={id} content={content} />
    );

  return (
    <section className={styles["cell-list-item"]}>
      <CellControls id={id} />
      {renderedCell}
      <AddCell prevCellId={id} />
    </section>
  );
};

export default CellListItem;
