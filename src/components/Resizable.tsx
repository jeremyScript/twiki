import { ResizableBox, ResizableBoxProps } from "react-resizable";

import styles from "./Resizable.module.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableBoxProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableBoxProps = {
      className: styles["resize-horizontal"],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.25, Infinity],
      width: window.innerWidth * 0.5,
      height: Infinity,
      resizeHandles: ["e"],
    };
  } else {
    resizableBoxProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 26],
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
