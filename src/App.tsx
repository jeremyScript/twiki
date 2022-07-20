import CodeCell from "./components/code-cell/CodeCell";
import TextEditor from "./components/text-cell/TextEditor";

function App() {
  return (
    <div>
      <TextEditor />
      <div style={{ margin: "2rem" }} />
      <CodeCell />
    </div>
  );
}

export default App;
