import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PrescriptionList from "./components/prescription/PrescriptionList";
import KindOfMedicineList from "./components/kindOfMedicine/KindOfMedicineList";
import InvoiceList from "./components/invoice/InvoiceList";

function App() {
    return (
        <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/invoice" element={<InvoiceList/>}/>
            <Route path="/dashboard" element={<Dashboard/>}>
                <Route path="/dashboard/prescription" element={<PrescriptionList/>}/>
                <Route
                    path="/dashboard/kind-of-medicine"
                    element={<KindOfMedicineList/>}
                />
            </Route>
        </Routes>
    );
}

export default App;
