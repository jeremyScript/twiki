import { useAppDispatch } from "../../hooks/typed-hooks";
import { deleteCell, moveCell } from "../../state/cellsSlice";
import styles from "./CellControls.module.css";

interface CellControlsProps {
  id: string;
}

const CellControls: React.FC<CellControlsProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles["cell-controls"]}>
      <button onClick={() => dispatch(moveCell({ id, direction: "down" }))}>
        &#8595;
      </button>
      <button onClick={() => dispatch(moveCell({ id, direction: "up" }))}>
        &#8593;
      </button>
      <button onClick={() => dispatch(deleteCell({ id }))}>&#x2715;</button>
    </div>
  );
};

export default CellControls;
