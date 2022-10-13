import { SyntheticEvent, useEffect, useState } from "react";
import {
  ResizableBox,
  ResizableBoxProps,
  ResizeCallbackData,
} from "react-resizable";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { updateCellProps } from "../../state/documentSlice";

import styles from "./Resizable.module.css";

interface ResizableProps {
  id: string;
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const CENTER_FIX = 16;

const Resizable: React.FC<ResizableProps> = ({ id, direction, children }) => {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth - CENTER_FIX
  );
  const fixedWidth =
    windowWidth >= 1200 ? 1200 : windowWidth < 420 ? 420 : windowWidth;

  const dispatch = useAppDispatch();
  const { ratio, height } = useAppSelector(
    (state) => state.document.data[id].props
  );

  useEffect(() => {
    let timeout: any;

    const windowSizeChangeListener = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 0);
    };

    window.addEventListener("resize", windowSizeChangeListener);

    return () => {
      window.removeEventListener("resize", windowSizeChangeListener);
    };
  }, []);

  const handleResizeWidth = (e: SyntheticEvent, data: ResizeCallbackData) => {
    dispatch(updateCellProps({ id, ratio: data.size.width / fixedWidth }));
  };

  const handleResizeHeight = (e: SyntheticEvent, data: ResizeCallbackData) => {
    dispatch(updateCellProps({ id, height: data.size.height }));
  };

  let resizableBoxProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableBoxProps = {
      onResizeStop: handleResizeWidth,
      className: styles["resize-horizontal"],
      width: fixedWidth * ratio!,
      height: Infinity,
      maxConstraints: [fixedWidth * 0.75, Infinity],
      minConstraints: [fixedWidth * 0.25, Infinity],
      resizeHandles: ["e"],
    };
  } else {
    resizableBoxProps = {
      onResizeStop: handleResizeHeight,
      width: Infinity,
      height: height!,
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 58],
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
