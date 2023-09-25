import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useField, useFormikContext } from "formik";
import { SelectPicker } from "rsuite";
import "./styles.css";
import * as ServiceInvoice from "../../services/invoice/ServiceInvoice"
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
function EditInvoice() {
    const [supplier, setSupplier] = useState([]);
    const [invoice, setInvoice] = useState();
    const [employee, setEmployee] = useState();
    const param = useParams();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    const getSupplier = async () => {
        const result = await ServiceInvoice.getSupllierList();
        setSupplier(result);
    }
    const getEmployee = async (userName) => {
        const result = await ServiceInvoice.getEmployee(userName);
        setEmployee(result);
    }

    const dataSupllier = supplier.map(
        item => ({ label: item.code, value: JSON.stringify(item) })
    );

    const getInvoice = async (invoiceId) => {
        const result = await ServiceInvoice.getInvoice(invoiceId);
        await getEmployee(result.appUserId.userName);
        setInvoice(result);
    }

    const setInitValue = async () => {
        await getInvoice(param.id);
        await setInvoiceInfo();
    }

    const editInvoice = async (invoice) => {
        try {
            const result = await ServiceInvoice.editInvoice(invoice);

            Swal.fire(
                "Sửa thành công !",
                "Hóa đơn " + result.code + " đã được cập nhật!",
                "success"
            );
            navigate("/dashboard/invoice");
        } catch (err) {
            Swal.fire(
                "Sửa không thành công !",
            );
        }
    }

    useEffect(() => {
        getSupplier();
        setInitValue();
    }, [param.id, totalPrice]);

    const setInvoiceInfo = async () => {
        const elements = document.getElementsByClassName("realPrice");
        // Sử dụng các phần tử đã lấy được
        let total = 0;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const value = parseInt(element.textContent) || 0;
            total += value;
        }
        setTotalPrice(total);
    }

    if (invoice == null)
        return null;
    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-3 text-center"><h1 style={{ color: '#0d6efd' }}>SỬA HÓA ĐƠN NHẬP KHO</h1></div>
                    </div>

                    <Formik

                        initialValues={{
                            id: invoice.id,
                            documentNumber: invoice.documentNumber,
                            paid: invoice.paid,
                            note: invoice.note,
                            supplierId: invoice.supplierId.id
                        }}
                        onSubmit={async (values, submitting) => {
                            let newInvoiceValue = { ...values, supplierId: document.getElementById("supplierId").value };
                            editInvoice(newInvoiceValue);

                        }}

                    validationSchema={Yup.object({
                        paid: Yup.number("Trường nhập vào phải là số")
                            .required("Không được để trống trường này")
                            .min(0, "Trường không được nhỏ hơn 0")
                            .max(1000000000, "Không được lớn hơn 1 tỷ"),
                        note: Yup.string().max(100, "Trường nhập vào phải nhỏ hơn 100 kí tự"),
                        documentNumber: Yup.string().max(10, "Trường nhập vào phải nhỏ hơn 10 kí tự")
                    })}
                    >
                        {
                            ({ values }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-8">
                                            <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                                                <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                                                <div className="row" >
                                                    <div className="col-7">
                                                        <div className="mb-3 row">
                                                            <label htmlFor="makh" className="col-sm-4 col-form-label">Mã NCC</label>
                                                            <div className="col-sm-8">
                                                                <div className="row g-1">
                                                                    <div className="col-10 p-0">
                                                                        <SelectPicker onChange={(value) => {
                                                                            let supplierObject = JSON.parse(value);
                                                                            document.getElementById("supplierId").value = supplierObject.id;
                                                                            document.getElementById("supplierName").value = supplierObject.name;
                                                                            document.getElementById("supplierAddress").value = supplierObject.address;
                                                                        }

                                                                        }
                                                                            defaultValue={JSON.stringify(invoice.supplierId)}
                                                                            preventOverflow virtualized data={dataSupllier}
                                                                            style={{ width: '90%' }}
                                                                        />
                                                                        <input id="supplierId" defaultValue={invoice.supplierId.id} hidden name="supplierId" type="number" ></input>
                                                                    </div>
                                                                    <div className="col-2 h-auto p-0">
                                                                        <Link to={"/dashboard/supplier/create-supplier"}>
                                                                            <button type="button" className="w-100 btn btn-outline-primary float-end">
                                                                                <FaPlus />
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input1" className="col-sm-4 col-form-label">Tên nhà cung cấp</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" defaultValue={invoice.supplierId.name} disabled id="supplierName" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input2" className="col-sm-4 col-form-label">Địa chỉ</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" disabled defaultValue={invoice.supplierId.address} id="supplierAddress" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input3" className="col-sm-4 col-form-label">Ghi chú</label>
                                                            <div className="col-sm-8">
                                                                <Field type="text" name="note" className="form-control" id="input3" />
                                                                <ErrorMessage style={{ color: 'red' }} component='span' name="note" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-5">
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input4" className="col-sm-4 col-form-label">Số HĐ</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" defaultValue={invoice.code} className="form-control" disabled id="input4" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input5" className="col-sm-4 col-form-label">Số CT</label>
                                                            <div className="col-sm-8">
                                                                <Field type="text" name="documentNumber" className="form-control" id="input5" />
                                                                <ErrorMessage style={{ color: 'red' }} component='span' name="documentNumber" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input6" className="col-sm-4 col-form-label">Ngày lập</label>
                                                            <div className="col-sm-8">
                                                                <input type="date" disabled defaultValue={invoice.creationDate.split('T')[0]} className="form-control" id="input6" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input7" className="col-sm-4 col-form-label">Nhân viên</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" disabled defaultValue={employee.nameEmployee} className="form-control" id="input7" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-4">
                                            <fieldset className="border border-dark rounded-3 p-3 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                                                <legend className="float-none w-auto px-3">Thanh toán</legend>
                                                <div className="row">
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input8" className="col-sm-4 col-form-label">Tiền thuốc</label>
                                                        <div className="col-sm-8">
                                                            <input type="number" id="medicinePrice" value={totalPrice} disabled className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 row">
                                                        <label htmlFor="input10" className="col-sm-4 col-form-label">Tổng tiền</label>
                                                        <div className="col-sm-8">
                                                            <input type="number" value={totalPrice} disabled id="totalPrice" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input11" className="col-sm-4 col-form-label">Thanh toán</label>
                                                        <div className="col-sm-8">
                                                            <Field type="number" id="paid" name="paid" className="form-control" />
                                                            <ErrorMessage style={{ color: 'red' }} component='span' name="paid" />

                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input12" className="col-sm-4 col-form-label">Còn lại</label>
                                                        <div className="col-sm-8">
                                                            <input type="number" Value={totalPrice - parseInt(values.paid) >= 0 ? totalPrice - parseInt(values.paid) : 0} id="extant" disabled className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <fieldset className="border border-dark rounded-3 p-3 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                                                <legend className="float-none w-auto px-3">Danh sách thuốc</legend>
                                                <div className="row">
                                                    <div className="table-responsive">
                                                        <table id="editableTable" className="table table-hover rounded-3 overflow-hidden">
                                                            <thead className="text-light " style={{ backgroundColor: '#0d6efd' }}>
                                                                <tr>
                                                                    <th scope="col">Tên thuốc</th>
                                                                    <th scope="col">Đơn vị tính</th>
                                                                    <th scope="col">Số lượng</th>
                                                                    <th scope="col">Đơn giá</th>
                                                                    <th scope="col">%CK</th>
                                                                    <th scope="col">VAT</th>
                                                                    <th scope="col">Thành tiền</th>
                                                                    <th scope="col">Số lô</th>
                                                                    <th scope="col">Hạn dùng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="editableBody">
                                                                {invoice.invoiceDetailEditDtoList?.map((item, index) => (
                                                                    <tr id={index}>
                                                                        <td>{item.medicineId.name}</td>
                                                                        <td >{item.unit}</td>
                                                                        <td>{item.medicineQuantity}</td>
                                                                        <td>
                                                                            {
                                                                                parseInt(item.medicineId.price - (item.medicineId.price * (item.medicineId.retailProfits + item.medicineId.vat) / 100))
                                                                            }
                                                                        </td>
                                                                        <td>{item.medicineId.vat}</td>
                                                                        <td>{item.discount}</td>
                                                                        <td className="realPrice">{
                                                                            parseInt(item.medicineId.price - (item.medicineId.price * (item.medicineId.retailProfits + item.medicineId.vat - item.discount) / 100)) * item.medicineQuantity

                                                                        }</td>
                                                                        <td>{item.lot}</td>
                                                                        <td>
                                                                            {
                                                                                item.expiry.split('T')[0]
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <div className="d-flex justify-content-end gap-3 my-3">
                                                <button type="submit" className="btn btn-outline-primary"><FiEdit className="mx-1" /> Sửa
                                                </button>
                                                <Link to={"/dashboard/invoice"}>
                                                    <button type="button" className="btn btn-outline-primary">
                                                        <AiOutlineRollback className="mx-1" /> Trở về
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
export default EditInvoice;