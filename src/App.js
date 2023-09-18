import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PrescriptionList from "./components/prescription/PrescriptionList";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          path="/dashboard/prescription"
          element={<PrescriptionList />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
