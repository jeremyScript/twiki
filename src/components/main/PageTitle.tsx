import { useState } from "react";

import styles from "./PageTitle.module.css";

const PageTitle: React.FC = () => {
  const [title, setTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
