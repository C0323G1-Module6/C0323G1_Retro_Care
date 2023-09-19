import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { useState } from "react";
import { Field, Form, Formik } from "formik";

export function CreateInvoice() {

    const [invoice, setInvoice] = useState({
        code: "",
        documentNumber: "",
        creationDate: "",
        paid: 0,
        note: "",
        supplierId: 0,
        invoiceDetailDtoSet: []
    });
    const [rows, setRows] = useState([{
        id: 0,
        quantity: 0,
        discount: 0,
        lot: "",
        exprie: ""
    }]);

    const addRow = async () => {
        setRows(prev => [...prev, {
            id: 0,
            quantity: 0,
            discount: 0,
            lot: "",
            exprie: ""
        }])
    }

    console.log(rows);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 my-3 text-center"><h1 style={{ color: '#0d6efd' }}>TẠO HÓA ĐƠN NHẬP KHO</h1></div>
                </div>
                <Formik>
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
                                                        <div className="col-10">
                                                            <Field as="select" className="form-select form-select" id="makh" aria-label=".form-select-sm example">
                                                                <option selected>DOMESCO</option>
                                                                <option value={1}>DOMESCO</option>
                                                                <option value={2}>DOMESCO</option>
                                                                <option value={3}>DOMESCO</option>
                                                            </Field>
                                                        </div>
                                                        <a className="col-2 h-auto" href="/prototype/supplier/ThanhVH_createSupplier.html">
                                                            <button type="button" className="btn btn-outline-primary float-end">
                                                                <FaPlus className="mx-1" />
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input1" className="col-sm-4 col-form-label">Tên nhà cung cấp</label>
                                                <div className="col-sm-8">
                                                    <input type="text" disabled defaultValue="Công ty DOMESO" className="form-control" id="input1" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input2" disabled className="col-sm-4 col-form-label">Địa chỉ</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control" defaultValue="AbcXyz" id="input2" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input3" className="col-sm-4 col-form-label">Ghi chú</label>
                                                <div className="col-sm-8">
                                                    <Field type="text" name="note" className="form-control" id="input3" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="mb-3 row">
                                                <label htmlFor="input4" className="col-sm-4 col-form-label">Số HĐ</label>
                                                <div className="col-sm-8">
                                                    <input type="text" defaultValue="HDN00001" className="form-control" disabled id="input4" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input5" className="col-sm-4 col-form-label">Số CT</label>
                                                <div className="col-sm-8">
                                                    <Field type="text" name="documentNumber" className="form-control" id="input5" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input6" className="col-sm-4 col-form-label">Ngày lập</label>
                                                <div className="col-sm-8">
                                                    <input type="date" defaultValue="2023-09-08" className="form-control" id="input6" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="input7" className="col-sm-4 col-form-label">Nhân viên</label>
                                                <div className="col-sm-8">
                                                    <input type="text" disabled className="form-control" id="input7" />
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
                                                <input type="text" defaultValue={311850} className="form-control" id="input8" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="input9" className="col-sm-4 col-form-label">% Chiếc khấu</label>
                                            <div className="col-sm-8">
                                                <input type="text" defaultValue={0} className="form-control" id="input9" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="input10" className="col-sm-4 col-form-label">Tổng tiền</label>
                                            <div className="col-sm-8">
                                                <input type="text" defaultValue={311850} className="form-control" id="input10" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="input11" className="col-sm-4 col-form-label">Thanh toán</label>
                                            <div className="col-sm-8">
                                                <input type="text" defaultValue={311850} className="form-control" id="input11" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="input12" className="col-sm-4 col-form-label">Còn lại</label>
                                            <div className="col-sm-8">
                                                <input type="text" defaultValue={0} className="form-control" id="input12" />
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

                                                    {
                                                        rows.map(
                                                            row =>
                                                                <tr id="tableRows">
                                                                    <td className="select">
                                                                        <select className="form-select w-75" onchange="printValue(this.value)" aria-label="Default select example">
                                                                            <option value selected>Chọn thuốc</option>
                                                                            <option value={1}>Thuốc ABINA 1</option>
                                                                            <option value={2}>Thuốc ABINA 2</option>
                                                                            <option value={3}>Thuốc ABINA 3</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>HOP</td>
                                                                    <td contentEditable={true}>10</td>
                                                                    <td>29700</td>
                                                                    <td contentEditable={true}>0</td>
                                                                    <td contentEditable={true}>5</td>
                                                                    <td contentEditable={true}>311850</td>
                                                                    <td contentEditable={true}>{row.lot}</td>
                                                                    <td contentEditable={true}>1/1/2020</td>
                                                                </tr>
                                                        )
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <button onclick={() => addRow()} type="button" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Thêm thuốc
                                    </button>
                                </fieldset>
                                <div className="d-flex justify-content-end gap-3 my-3">
                                    <button type="button" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Hoàn thành
                                    </button>
                                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><FaRegTrashAlt className="mx-1" />
                                        Xoá thuốc
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
                </Formik >
            </div>

            <div className="modal fade" id="exampleModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xác nhận xoá thuốc</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc muốn xoá thuốc không.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Huỷ xoá
                            </button>
                            <button type="button" className="btn btn-primary">Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}