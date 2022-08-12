import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { updateTitle } from "../../state/documentSlice";

import styles from "./PageTitle.module.css";

const PageTitle: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.document.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  return (
    <div className={styles["page-title"]}>
      <input
        type="text"
        id="page-title"
        onChange={handleChange}
        placeholder="(e.g., How to make HTTP requests)"
        className={styles["title-input"]}
        value={title}
      />
      <label className={styles["label"]} htmlFor="page-title">
        Page Title
      </label>
    </div>
  );
};

export default PageTitle;
