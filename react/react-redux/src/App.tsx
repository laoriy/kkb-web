import { useState } from "react";
import ReactReduxPage from "./pages/ReactReduxPage";
function App() {
  const [color, setColor] = useState("red");
  return (
    <div className="App">
      Edit <code>src/App.tsx</code> and save to reload.
      <ReactReduxPage color={color} />
      <button onClick={() => setColor(color === "red" ? "green" : "red")}>
        change color{" "}
      </button>
    </div>
  );
}

export default App;
