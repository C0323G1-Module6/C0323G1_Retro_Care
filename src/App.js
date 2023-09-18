import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PrescriptionList from "./components/presciption/PrescriptionList";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          path="/dashboard/presciption"
          element={<PrescriptionList />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
