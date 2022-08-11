import { useAppSelector } from "./useTypedHooks";
import { selectOrderedCells } from "../state/cellsSlice";

const useCumulativeCode = (id: string) => {
  const orderedCells = useAppSelector(selectOrderedCells);
  const cumulativeCode: string[] = [];

  const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    var show = (value) => {
      const root = document.getElementById('root');
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(
            value,
            root
          );
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `;

  const showFuncNoOp = `var show = () => {};`;

  for (let cell of orderedCells) {
    if (cell.type === "code") {
      if (cell.id === id) {
        cumulativeCode.push(showFunc);
      } else {
        cumulativeCode.push(showFuncNoOp);
      }
      cumulativeCode.push(cell.content);
      if (cell.id === id) break;
    }
  }

  return cumulativeCode.join("\n");
};

export default useCumulativeCode;
