import { useState } from "react";
import "./app.css";

function App() {
  const [state, setState] = useState(0); // ❌ Hook in condition
  setState(state + 1);
  console.log(state);

  return <h1>Never Stop Building</h1>;
}

export default App;
