import React, { useState } from "react";
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
        onChange={handleChange}
        placeholder="(untitled)"
        className={styles["title-input"]}
        value={title}
      />
    </div>
  );
};

export default PageTitle;
