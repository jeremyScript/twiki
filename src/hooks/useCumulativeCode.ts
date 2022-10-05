import { useAppSelector } from "./useTypedHooks";
import { selectOrderedCells } from "../state/documentSlice";

export const useCumulativeCode = (id: string) => {
  const orderedCells = useAppSelector(selectOrderedCells);

  const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    var show = (value) => {
      const root = document.getElementById('root');
      if (value.$$typeof && value.props) {
        _ReactDOM.render(value, root);
      } else {
        const child = document.createElement('div');
        child.innerHTML = typeof value === 'object'
          ? JSON.stringify(value)
          : value;
        root.appendChild(child);
      }
    };
  `;

  const showFuncNoOp = `var show = () => {};`;
  const cumulativeCode: string[] = [];

  for (let cell of orderedCells) {
    if (cell.type === "code") {
      if (cell.id === id) {
        cumulativeCode.push(showFunc);
      } else {
        cumulativeCode.push(showFuncNoOp);
      }
      cumulativeCode.push(cell.content);
      if (cell.id === id) {
        break;
      }
    }
  }

  return cumulativeCode.join("\n");
};
