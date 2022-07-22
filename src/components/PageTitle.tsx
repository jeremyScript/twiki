import React, { useState } from "react";
import styles from "./PageTitle.module.css";

const PageTitle: React.FC = () => {
  const [title, setTitle] = useState("(untitled)");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFocus = () => {
    if (title.trim().length > 0) return;
    setTitle("");
  };

  const handleBlur = () => {
    if (title.trim() === "") {
      setTitle("(untitled)");
    }
  };

  return (
    <div className={styles["page-title"]}>
      <input
        type="text"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles["title-input"]}
        value={title}
      />
    </div>
  );
};

export default PageTitle;
