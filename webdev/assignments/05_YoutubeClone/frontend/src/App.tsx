import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Upload from "./pages/Upload";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
