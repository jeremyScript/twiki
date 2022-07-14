import styles from "./Preview.module.css";

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  return <iframe title="iframe" srcDoc={code} sandbox="" />;
};

export default Preview;
