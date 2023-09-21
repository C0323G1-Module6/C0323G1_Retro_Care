import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PrescriptionList from "./components/prescription/PrescriptionList";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import KindOfMedicineList from "./components/kindOfMedicine/KindOfMedicineList";
import CustomerList from "./components/customer/CustomerList";
import ListEmployee from "./components/employee/ListEmployee";
import MedicineList from "./components/medicine/MedicineList";
import PrescriptionCreate from "./components/prescription/PrescriptionCreate";


function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="/dashboard/prescription"
            element={<PrescriptionList />}
          />
          <Route
            path="/dashboard/prescription/create"
            element={<PrescriptionCreate />}
          />
          <Route path="/dashboard/medicine" element={<MedicineList />} />
          <Route
            path="/dashboard/kind-of-medicine"
            element={<KindOfMedicineList />}
          />
          <Route path="/dashboard/customer" element={<CustomerList />} />
          <Route path="/dashboard/employee" element={<ListEmployee />} />
        </Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
      </Routes>
      <ToastContainer autoClose={2000} className="toast-position" />
    </>
  );
}

export default App;
