import styles from "./Label.module.css";

interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  return <div className={styles["label"]}>{label}</div>;
};

export default Label;
