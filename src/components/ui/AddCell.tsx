import { useAppDispatch } from "../../hooks/useTypedHooks";
import { insertCellAfter } from "../../state/documentSlice";
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
        onClick={() => dispatch(insertCellAfter("code", prevCellId))}
      >
        + Code
      </button>
      <div className={styles.divider} />
      <button
        className={styles["button--text"]}
        onClick={() => dispatch(insertCellAfter("text", prevCellId))}
      >
        + Text
      </button>
    </div>
  );
};

export default AddCell;
