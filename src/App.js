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
import CustomerCreate from "./components/customer/CustomerCreate";
import CustomerUpdate from "./components/customer/CustomerUpdate";
import CreateEmployee from "./components/employee/CreateEmployee";
import UpdationEmployee from "./components/employee/UpdationEmployee";
import CreateSupplierComponent from "./components/supplier/CreateSupplierComponent";
import UpdateSupplierComponent from "./components/supplier/UpdateSupplierComponent";
import DetailSupplierComponent from "./components/supplier/DetailSupplierComponent";
import SupplierListComponent from "./components/supplier/SupplierListComponent";
import InvoiceList from "./components/invoice/InvoiceList";
import Retail from "./components/retail/Retail";
import RetailListPrescriptionList from "./components/retail/RetailListPrescriptionList";
import RetailPrescriptionInformation from "./components/retail/RetailPrescriptionInformation";
import GeneralReport from "./components/report/GeneralReport";
import RevenueAndProfitChart from "./components/report/RevenueAndProfitChart";
import MedicineCreate from "./components/medicine/MedicineCreate";
import MedicineEdit from "./components/medicine/MedicineEdit";
import SearchPage from "./components/search/SearchPage";
import Cart from "./components/order/Cart";
import Details from "./components/order/Details";
import PrescriptionEdit from "./components/prescription/PrescriptionEdit";
import UserCustomer from "./components/customer/UserCustomer";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/home/ScrollToTop";
import Authentication from "./components/user/Authentication";
import AuthorOfCustomer from "./components/user/AuthorOfCustomer";
import AuthorOfEmployee from "./components/user/AuthorOfEmployee";
import { EnumAppUserRole } from "./components/user/EnumAppUserRole";
import { axiosClient } from "./services/user/AxiosClient";
import Billing from "./components/order/Billing";
import ReturnVNPay from "./components/order/ReturnVNPay";
import ListInvoiceOrder from "./components/order/ListInvoiceOrder";
import EditInvoice from "./components/invoice/EditInvoice";
import CreateInvoice from "./components/invoice/CreateInvoice";
import MedicinesWithKind from "./components/home/MedicinesWithKind";
import Error403 from "./components/user/Error403";
import InvoiceDetailMedicine from "./components/invoice/InvoiceDetailMedicine";
import Error401 from "./components/user/Error401";
function App() {
    axiosClient();
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/401" element={<Error401 />} />
                <Route path="*" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/home/search/:keyword" element={<SearchPage />} />
                <Route path="/home/search/" element={<SearchPage />} />
                <Route
                    path="/home/list-medicines/:type"
                    element={<MedicinesWithKind />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/details/:id" element={<Details />}></Route>
                <Route path="/user-infor/:id" element={<UserCustomer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/403" element={<Error403 />} />
                <Route
                    element={
                        <Authentication
                            allowedRoles={[
                                EnumAppUserRole.ROLE_ADMIN,
                                EnumAppUserRole.ROLE_MANAGER,
                                EnumAppUserRole.ROLE_EMPLOYEE,
                                EnumAppUserRole.ROLE_CUSTOMER,
                            ]}
                        />
                    }
                >
                    <Route path="/success" element={<Billing />}></Route>
                    <Route path="/success-vnp" element={<ReturnVNPay />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route
                            path="/dashboard/list-invoice-order"
                            element={<ListInvoiceOrder />}
                        />
                        <Route element={<AuthorOfCustomer />}>
                            <Route path="/dashboard/retail" element={<Retail />} />
                            <Route
                                path="/dashboard/retail/prescription-list"
                                element={<RetailListPrescriptionList />}
                            />
                            <Route
                                path="/dashboard/retail/prescription-information/:id"
                                element={<RetailPrescriptionInformation />}
                            />

                            <Route element={<AuthorOfEmployee />}>
                                <Route
                                    path="/dashboard/prescription"
                                    element={<PrescriptionList />}
                                />
                                <Route
                                    path="/dashboard/prescription/create"
                                    element={<PrescriptionCreate />}
                                />
                                <Route
                                    path="/dashboard/prescription/edit/:id"
                                    element={<PrescriptionEdit />}
                                />
                                <Route path="/dashboard/medicine" element={<MedicineList />} />
                                <Route
                                    path="/dashboard/kind-of-medicine"
                                    element={<KindOfMedicineList />}
                                />
                                <Route path="/dashboard/customer" element={<CustomerList />} />
                                <Route
                                    path="/dashboard/customer/create"
                                    element={<CustomerCreate />}
                                />
                                <Route
                                    path="/dashboard/customer/update/:id"
                                    element={<CustomerUpdate />}
                                />
                                <Route path="/dashboard/employee" element={<ListEmployee />} />
                                <Route
                                    path="/dashboard/employee/create"
                                    element={<CreateEmployee />}
                                />
                                <Route
                                    path="/dashboard/employee/update/:id"
                                    element={<UpdationEmployee />}
                                />
                                <Route
                                    path="/dashboard/supplier"
                                    element={<SupplierListComponent />}
                                />
                                <Route
                                    path="/dashboard/supplier/create-supplier"
                                    element={<CreateSupplierComponent />}
                                />
                                <Route
                                    path="/dashboard/supplier/detail-supplier/:idSupplier"
                                    element={<DetailSupplierComponent />}
                                />
                                <Route
                                    path="/dashboard/supplier/update-supplier/:idSupplier"
                                    element={<UpdateSupplierComponent />}
                                />
                                <Route path="/dashboard/invoice" element={<InvoiceList />} />
                                <Route path="/dashboard/invoice/detail/:id" element={<InvoiceDetailMedicine />} />
                                <Route path="/dashboard/report" element={<GeneralReport />} />
                                <Route
                                    path="/dashboard/report/chart"
                                    element={<RevenueAndProfitChart />}
                                />
                                <Route
                                    path="/dashboard/medicine/create"
                                    element={<MedicineCreate />}
                                />
                                <Route
                                    path="/dashboard/medicine/update/:id"
                                    element={<MedicineEdit />}
                                />
                                <Route
                                    path="/dashboard/invoice/create"
                                    element={<CreateInvoice />}
                                />
                                <Route
                                    path="/dashboard/invoice/edit/:id"
                                    element={<EditInvoice />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;