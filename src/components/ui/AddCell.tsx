import { useAppDispatch } from "../../hooks/typed-hooks";
import { insertCellAfter } from "../../state/cellsSlice";
import styles from "./AddCell.module.css";

interface AddCellProps {
  prevCellId?: string;
  forceShow?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceShow }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${styles["add-cell"]} ${
        forceShow ? styles["force-show"] : ""
      }`}
    >
      <button
        className={styles["button--code"]}
        onClick={() => dispatch(insertCellAfter({ type: "code", prevCellId }))}
      >
        + Code
      </button>
      <div className={styles.divider} />
      <button
        className={styles["button--text"]}
        onClick={() => dispatch(insertCellAfter({ type: "text", prevCellId }))}
      >
        + Text
      </button>
    </div>
  );
};

export default AddCell;
