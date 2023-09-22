import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SelectPicker } from "rsuite";
import "./styles.css";
import * as ServiceInvoice from "../../services/invoice/ServiceInvoice"
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
 function EditInvoice() {
    const [supplier, setSupplier] = useState([]);
    const [invoice, setInvoice] = useState({

    });
    const param = useParams();
    useEffect(() => {
        getSupplier();
        getInvoice();
    }, []);
    useEffect(() => {
        console.log(invoice);
    }, []);

    const getSupplier = async () => {
        const result = await ServiceInvoice.getSupllierList();
        setSupplier(result);
    }

    const dataSupllier = supplier.map(
        item => ({ label: item.code, value: JSON.stringify(item) })
    );

    const getInvoice = async () => {
        const result = await ServiceInvoice.getInvoice(param.id);
        console.log(result);
        setInvoice(result);
    }
    const editInvoice = async (invoice) => {
        await ServiceInvoice.editInvoice(invoice)
    }

    if (invoice.id == null)
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
                            supplierId: 0
                        }}
                        onSubmit={(invoiceValue) => {
                            let newInvoiceValue = { ...invoiceValue, supplierId: document.getElementById("supplierId").value };
                            alert(JSON.stringify(newInvoiceValue));
                            editInvoice(newInvoiceValue);
                        }}

                        validationSchema={Yup.object({
                            paid: Yup.number("Trường nhập vào phải là số")
                                .required("Không được để trống trường này")
                                .min(0, "Trường không được nhỏ hơn 0")
                                .max(1000000000, "Không được lớn hơn 1 tỷ"),
                            note: Yup.string().max(100, "Trường nhập vào phải nhỏ hơn 100 kí tự"),
                            documentNumber: Yup.string().max(10, "Trường nhập vào phải nhỏ hơn 10 kí tự"),
                            supplierId: Yup.number().test("Trường này không được để trống", value => value !== 0)
                        })}
                    >
                        <Form>
                            <div className="row">
                                <div className="col-8">
                                    <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                                        <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                                        <div className="row">
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
                                                                <input id="supplierId" hidden name="supplierId" type="number" ></input>
                                                            </div>
                                                            <div className="col-2 h-auto p-0">
                                                                <button type="button" className="w-100 btn btn-outline-primary float-end">
                                                                    <FaPlus />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label htmlFor="input1" className="col-sm-4 col-form-label">Tên nhà cung cấp</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" disabled defaultValue={invoice.supplierId.name} id="supplierName" className="form-control" />
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
                                                        <input type="date" disabled defaultValue="2023-09-08" className="form-control" id="input6" />
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label htmlFor="input7" className="col-sm-4 col-form-label">Nhân viên</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" disabled defaultValue={invoice.appUserId.userName} className="form-control" id="input7" />
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
                                                    <input type="text" disabled className="form-control" id="input8" />
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <label htmlFor="input10" className="col-sm-4 col-form-label">Tổng tiền</label>
                                                <div className="col-sm-8">
                                                    <input type="text" disabled className="form-control" id="input10" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input11" className="col-sm-4 col-form-label">Thanh toán</label>
                                                <div className="col-sm-8">
                                                    <Field type="text" name="paid" className="form-control" id="input11" />
                                                    <ErrorMessage style={{ color: 'red' }} component='span' name="paid" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input12" className="col-sm-4 col-form-label">Còn lại</label>
                                                <div className="col-sm-8">
                                                    <input type="text" disabled className="form-control" id="input12" />
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
                                                    {invoice?.invoiceDetailSet.map(item => (
                                                        <tr>
                                                            <td>{item.medicineId.name}</td>
                                                            <td >HOP</td>
                                                            <td>{item.quantity}</td>
                                                            <td>29700</td>
                                                            <td>0</td>
                                                            <td>{item.discount}</td>
                                                            <td>311850</td>
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
                                        <a href="/prototype/warehouse/HuyHD_Warehouse.html">
                                            <button type="button" className="btn btn-outline-primary">
                                                <AiOutlineRollback className="mx-1" /> Trở về
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}
export default EditInvoice;