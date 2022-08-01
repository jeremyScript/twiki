import { useAppSelector } from "../../hooks/typed-hooks";
import CodeCell from "../code-cell/CodeCell";
import TextCell from "../text-cell/TextCell";
import AddCell from "../ui/AddCell";
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
    <section>
      {renderedCell}
      <AddCell prevCellId={id} />
    </section>
  );
};

export default CellListItem;
