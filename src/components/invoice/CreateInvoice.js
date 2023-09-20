import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { useState } from "react";
import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { SelectPicker } from "rsuite";
import "./styles.css";
import * as ServiceInvoice from "../../services/invoice/ServiceInvoice"

export function CreateInvoice() {

    const [supplier, setSupplier] = useState([]);
    const [invoice, setInvoice] = useState({
        code: "",
        documentNumber: "",
        creationDate: "",
        paid: 0,
        note: "",
        supplierId: 0,
        invoiceDetailDtoSet: []
    });





    const [medicine, setMedicine] = useState([]);
    const [rows, setRows] = useState([{
        id: 0,
        medicine: 0,
        quantity: 0,
        discount: 0,
        lot: "",
        expire: ""
    }]);

    const getSupplier = async () => {
        const result = await ServiceInvoice.getSupllierList();
        setSupplier(result);
    }

    const getMedicine = async () => {
        const result = await ServiceInvoice.getMedicineList();
        setMedicine(result);
    }


    useEffect(() => {
        getSupplier();
        getMedicine();
    }, [])

    // const addRow = () => {
    //     setRows(prev => [...prev, {
    //         medicine: 0,
    //         quantity: 0,
    //         discount: 0,
    //         lot: "",
    //         expire: ""
    //     }])
    // }
    const getUnit = async (medicineId) => {
        const result = await ServiceInvoice.getUnitDetail(medicineId);
        return result;
    };

    // const setAvariableValue = async (value, number) => {
    //     let objectMedicine = JSON.parse(value);
    //     let unit = await getUnit(objectMedicine.id);
    //     let cell = document.getElementById(number);
    //     // console.log(unitDetail);
    //     cell.getElementsByTagName('td')[1].innerText = unit;
    //     cell.getElementsByTagName('td')[5].innerText = objectMedicine.vat;
    //     let quantity = parseInt(cell.getElementsByTagName('td')[2].innerText) ? parseInt(cell.getElementsByTagName('td')[2].innerText) : 0;
    //     let price = parseFloat(cell.getElementsByTagName('td')[3].innerText) ? parseFloat(cell.getElementsByTagName('td')[3].innerText) : 0;
    //     let discount = parseFloat(cell.getElementsByTagName('td')[4].innerText) ? parseFloat(cell.getElementsByTagName('td')[4].innerText) : 0;
    //     cell.getElementsByTagName('td')[6].innerText = (quantity * price) + (quantity * price) * discount / 100;
    // }

    // const getListInvoiceDetail = () => {
    //     const table = document.getElementById('editableTable');
    //     const tbody = table.getElementsByTagName('tbody');
    //     const rows = tbody[0].getElementsByTagName('tr');
    //     const rowValues = [];

    //     for (let i = 0; i < rows.length; i++) {
    //         const cells = rows[i].getElementsByTagName('td');
    //         const medicineSelect = cells[0].getElementsByTagName('select')[0];
    //         const rowData = {
    //             medicine: medicineSelect.value,
    //             quantity: parseInt(cells[2].innerText),
    //             discount: parseFloat(cells[4].innerText),
    //             lot: cells[7].innerText,
    //             expire: cells[8].innerText
    //         };
    //         rowValues.push(rowData);
    //     }

    //     setRows(rowValues);

    // }
    const dataSupllier = supplier.map(
        item => ({ label: item.code, value: JSON.stringify(item) })
    );
    const dataMedicine = medicine.map(
        item => ({ label: item.name, value: JSON.stringify(item) })
    );
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 my-3 text-center"><h1 style={{ color: '#0d6efd' }}>TẠO HÓA ĐƠN NHẬP KHO</h1></div>
                </div>
                <Formik
                    initialValues={{
                        code: "",
                        documentNumber: "",
                        paid: 0,
                        note: "",
                        supplierId: 0,
                        invoiceDetailDtoSet: [{
                            medicineId: 0,
                            discount: 0,
                            quantity: 0,
                            lot: "",
                            expire: "2000-12-12"
                        },]
                    }}
                    onSubmit={ async(invoiceValue) =>  {
                         alert(JSON.stringify(invoiceValue));
                    }}

                >
                    {({ values }) => (
                        <Form>
                            <FieldArray name="invoiceDetailDtoSet">
                                {({ insert, remove, push }) => (<>
                                    <div className="row">
                                        <div className="col-8">
                                            <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                                                <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                                                <div className="row">
                                                    <div className="col-7">
                                                        <div className="mb-3 row">
                                                            <label htmlFor="makh" className="col-sm-4 col-form-label">Mã NCC</label>
                                                            <div className="col-sm-8">
                                                                <div className="row">
                                                                    <div className="col-10 p-0">
                                                                        <SelectPicker onChange={(value) => {
                                                                            let supplierObject = JSON.parse(value);
                                                                            document.getElementById("supplierId").value = supplierObject.id;
                                                                            document.getElementById("supplierName").value = supplierObject.name;
                                                                            document.getElementById("supplierAddress").value = supplierObject.address;
                                                                        }}
                                                                            preventOverflow virtualized data={dataSupllier}
                                                                            style={{ width: '90%' }}
                                                                        />
                                                                         <Field id="supplierId" name="supplierId"  />
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
                                                                <input type="text" id="supplierName" disabled defaultValue="Công ty DOMESO" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input2" disabled className="col-sm-4 col-form-label">Địa chỉ</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" disabled id="supplierAddress" className="form-control" defaultValue="AbcXyz" />
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
                                                            <input type="text" disabled defaultValue={311850} className="form-control" id="input8" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 row">
                                                        <label htmlFor="input10" className="col-sm-4 col-form-label">Tổng tiền</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" disabled defaultValue={311850} className="form-control" id="input10" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input11" className="col-sm-4 col-form-label">Thanh toán</label>
                                                        <div className="col-sm-8">
                                                            <Field type="text" name="paid" className="form-control" id="input11" />
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


                                                                {values.invoiceDetailDtoSet.map((value, index) => (

                                                                    <tr key={index}>
                                                                        <td><SelectPicker
                                                                            preventOverflow virtualized data={dataMedicine}
                                                                            
                                                                            
                                                                            onChange={(value) => {
                                                                               let medicineObject = JSON.parse(value)
                                                                                document.getElementById("medicineId").value = medicineObject.id;
                                                                            }

                                                                            }
                                                                            style={{ width: '90%' }}
                                                                        />
                                                                            <Field id="medicineId" hidden name={`invoiceDetailDtoSet.${index}.medicineId`} />
                                                                        </td>
                                                                        <td></td>
                                                                        <td className="quantity" contentEditable={true} onInput={() => {
                                                                            document.getElementById("quantity").value = document.activeElement.textContent
                                                                        }}><Field id="quantity" hidden name={`invoiceDetailDtoSet.${index}.quanity`} /></td>
                                                                        <td className="unitPrice">29000</td>
                                                                        <td className="discount"
                                                                            onInput={() => {
                                                                                document.getElementById("discount").value = document.activeElement.textContent
                                                                            }} contentEditable={true}> <Field id="discount" name={`invoiceDetailDtoSet.${index}.discount`} hidden />10</td>
                                                                        <td></td>
                                                                        <td className="totalPrice"></td>
                                                                        <td onInput={() => {
                                                                            document.getElementById("lot").value = document.activeElement.textContent
                                                                        }} className="lot" contentEditable={true}> <Field id="lot" name={`invoiceDetailDtoSet.${index}.lot`} hidden /></td>
                                                                        <td className="expire" onInput={() => {
                                                                            document.getElementById("lot").value = document.activeElement.textContent
                                                                        }} contentEditable={true}><Field id="expire" name={`invoiceDetailDtoSet.${index}.expire`} hidden /></td>
                                                                    </tr>
                                                                ))

                                                                }



                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <button onClick={() => push({
                                                    discount: 0,
                                                    quantity: 0,
                                                    lot: "",
                                                    expery: "2000-12-12"
                                                })} type="button" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Thêm thuốc
                                                </button>
                                            </fieldset>
                                            <div className="d-flex justify-content-end gap-3 my-3">
                                                <button type="submit"  className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Hoàn thành
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
                                </>
                                )}
                            </FieldArray>
                        </Form>
                    )}
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