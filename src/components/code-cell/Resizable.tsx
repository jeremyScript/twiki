import { SyntheticEvent, useEffect, useState } from "react";
import {
  ResizableBox,
  ResizableBoxProps,
  ResizeCallbackData,
} from "react-resizable";

import styles from "./Resizable.module.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ratio, setRatio] = useState(0.4715);

  useEffect(() => {
    let timeout: any;

    const windowSizeChangeListener = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener("resize", windowSizeChangeListener);

    return () => {
      window.removeEventListener("resize", windowSizeChangeListener);
    };
  }, []);

  const handleResize = (e: SyntheticEvent, data: ResizeCallbackData) => {
    setRatio(data.size.width / window.innerWidth);
  };

  let resizableBoxProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableBoxProps = {
      onResize: handleResize,
      className: styles["resize-horizontal"],
      width: windowWidth * ratio,
      height: Infinity,
      maxConstraints: [windowWidth * 0.75, Infinity],
      minConstraints: [windowWidth * 0.25, Infinity],
      resizeHandles: ["e"],
    };
  } else {
    resizableBoxProps = {
      width: Infinity,
      height: 300,
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 26],
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
