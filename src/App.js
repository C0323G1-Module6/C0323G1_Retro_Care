import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
