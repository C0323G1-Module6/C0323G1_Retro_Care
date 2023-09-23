import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { SelectPicker } from "rsuite";
import "./styles.css";
import * as ServiceInvoice from "../../services/invoice/ServiceInvoice"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function CreateInvoice() {
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState([]);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [medicine, setMedicine] = useState([]);
    const [maxCode, setMaxCode] = useState('');
    const fieldNameRef = useRef(null);
    const elementRef = useRef(null);


    const [invoiceDetails, setInvoiceDetails] = useState(
        [{
            medicineId: {},
            discount: 0,
            medicineQuantity: 0,
        },]
    )

    // const [unitPrice, setUnitPrice] = useState(0);
    // const [unit, setUnit] = useState('');
    // const [realPrice, setRealPrice] = useState(0);

    // const [infoInvoiceDetail, setInfoInvoiceDetail] = useState([{

    // },]);



    const getSupplier = async () => {
        const result = await ServiceInvoice.getSupllierList();
        setSupplier(result);
    }

    const getMedicine = async () => {
        const result = await ServiceInvoice.getMedicineList();
        setMedicine(result);
    }

    const createInvoice = async (invoice) => {
        const result = await ServiceInvoice.createInvoice(invoice);
    }

    const getMaxCode = async () => {
        const result = await ServiceInvoice.getMaxCode();
        setMaxCode(result);
    }
    const getMedicineById = async () => {
        const result = await ServiceInvoice.getMedicine();
    }

    useEffect(() => {
        getSupplier();
        getMedicine();
        getMaxCode();
    }, [])




    const getUnit = async (medicineId) => {
        const result = await ServiceInvoice.getUnitDetail(medicineId);
        return result;
    };
    const setInvoiceInfo = async () => {
        const elements = await elementRef.current.getElementsByClassName("realPrice");
        // Sử dụng các phần tử đã lấy được
        let totalPrice = 0;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const value = parseInt(element.textContent) || 0;
            totalPrice += value;
        }
        document.getElementById("medicinePrice").value = totalPrice;
        document.getElementById("totalPrice").value = totalPrice;
        document.getElementById("extant").value = totalPrice - document.getElementById("paid").value;
    }


    const setInvoiceDetailInfo = async (value, index) => {
        let quantity = document.getElementById(`invoiceDetailDtoSet.${index}.medicineQuantity`).value;
        let discount = document.getElementById(`invoiceDetailDtoSet.${index}.discount`).value;
        let unit = await getUnit(value.id);
        let unitPrice = parseInt(value.price - (value.price * (value.retailProfits + value.vat) / 100));
        let price = (unitPrice - (unitPrice * discount / 100)) * quantity;
        const element = document.getElementById(`${index}`);
        element.getElementsByTagName('td')[1].textContent = unit;
        element.getElementsByTagName('td')[3].textContent = unitPrice;
        element.getElementsByTagName('td')[5].textContent = value.vat;
        element.getElementsByTagName('td')[6].textContent = price;
        await setInvoiceInfo();
    }

    const updateInoviceDetail = async (medicineId, index) => {
        const value = await ServiceInvoice.getMedicine(medicineId);
        let quantity = document.getElementById(`invoiceDetailDtoSet.${index}.medicineQuantity`).value;
        let discount = document.getElementById(`invoiceDetailDtoSet.${index}.discount`).value;
        let unit = await getUnit(value.id);
        let unitPrice = parseInt(value.price - (value.price * (value.retailProfits + value.vat) / 100));
        let price = (unitPrice - (unitPrice * discount / 100)) * quantity;
        const element = document.getElementById(`${index}`);
        element.getElementsByTagName('td')[1].textContent = unit;
        element.getElementsByTagName('td')[3].textContent = unitPrice;
        element.getElementsByTagName('td')[5].textContent = value.vat;
        element.getElementsByTagName('td')[6].textContent = price;
        await setInvoiceInfo();
    }


    // const setAvariableValue = async (value, number) => {
    //     let objectMedicine = JSON.parse(value);
    //     let unit = await getUnit(objectMedicine.id);
    //     let cell = document.getElementById(number);
    //     // console.log(unitDetail);
    //     cell.getElementsByTagName('td')[1].innerText = unit;
    //     cell.getElementsByTagName('td')[5].innerText = objectMedicine.vat;
    //     let medicineQuantity = parseInt(cell.getElementsByTagName('td')[2].innerText) ? parseInt(cell.getElementsByTagName('td')[2].innerText) : 0;
    //     let price = parseFloat(cell.getElementsByTagName('td')[3].innerText) ? parseFloat(cell.getElementsByTagName('td')[3].innerText) : 0;
    //     let discount = parseFloat(cell.getElementsByTagName('td')[4].innerText) ? parseFloat(cell.getElementsByTagName('td')[4].innerText) : 0;
    //     cell.getElementsByTagName('td')[6].innerText = (medicineQuantity * price) + (medicineQuantity * price) * discount / 100;
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
                        paid: 0,
                        note: "",
                        documentNumber: null,
                        supplierId: 0,
                        invoiceDetailDtoSet: [{
                            medicineId: 0,
                            discount: 0,
                            medicineQuantity: 1,
                            lot: "",
                            expiry: new Date().toISOString().split('T')[0],

                        },]
                    }}
                    onSubmit={(invoiceValue) => {
                        let newInvoiceValue = { ...invoiceValue, supplierId: document.getElementById("supplierId").value };
                        createInvoice(newInvoiceValue);
                    }}

                    validationSchema={Yup.object({
                        paid: Yup.number("Trường nhập vào phải là số")
                            .required("Không được để trống trường này")
                            .min(0, "Trường không được nhỏ hơn 0")
                            .max(1000000000, "Không được lớn hơn 1 tỷ"),
                        note: Yup.string().max(100, "Trường nhập vào phải nhỏ hơn 100 kí tự"),
                        documentNumber: Yup.string().required("Không được để trống trường này").max(10, "Trường nhập vào phải nhỏ hơn 10 kí tự"),
                        // supplierId: Yup.number().required("Không được để trống trường này").test("Trường này không được để trống", value => value !== 0),
                        invoiceDetailDtoSet: Yup.array().of(
                            Yup.object().shape({
                                // medicineId: Yup.number().test("Trường này không được để trống", value => value !== 0),
                                discount: Yup.number("Trường nhập vào phải là số")
                                    .min(0, "Trường không được nhỏ hơn 1")
                                    .required("Không được để trống trường này")
                                    .max(100, "Trường Không được lớn hơn 100"),
                                medicineQuantity: Yup.number("Trường nhập vào phải là số")
                                    .min(1, "Trường không được nhỏ hơn 1")
                                    .required("Không được để trống trường này")
                                    .max(10000, "Trường Không được lớn hơn 10000"),
                                lot: Yup.string().required("Không được để trống trường này").max(20, "Trường nhập vào phải nhỏ hơn 20 kí tự"),
                                expiry: Yup.date().required("Không được để trống trường này").min(new Date(), "Ngày phải lớn hơn ngày hiện tại")
                            })
                        )

                    })}

                >
                    {({ values }) => (
                        <Form>
                            <FieldArray name="invoiceDetailDtoSet">
                                {({ remove, push }) => (<>
                                    <div className="row">
                                        <div className="col-8">
                                            <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                                                <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                                                <div className="row" ref={elementRef}>
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
                                                                            defaultValue="0"
                                                                            locale={{ searchPlaceholder: "Tìm kiếm" }}
                                                                            placeholder={"Tìm kiếm"}
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
                                                                <ErrorMessage style={{ color: 'red' }} component='span' name="note" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-5">
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input4" className="col-sm-4 col-form-label">Số HĐ</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" defaultValue={maxCode.toString()} className="form-control" disabled id="input4" />

                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input5" className="col-sm-4 col-form-label">Số CT</label>
                                                            <div className="col-sm-8">
                                                                <Field type="text" name="documentNumber" className="form-control" id="input5" />
                                                                <ErrorMessage style={{ color: 'red' }} component="span" name="documentNumber" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 row">
                                                            <label htmlFor="input6" className="col-sm-4 col-form-label">Ngày lập</label>
                                                            <div className="col-sm-8">
                                                                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} disabled className="form-control" id="input6" />
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
                                                            <input type="text" disabled id="medicinePrice" className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 row">
                                                        <label htmlFor="input10" className="col-sm-4 col-form-label">Tổng tiền</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" disabled id="totalPrice" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input11" className="col-sm-4 col-form-label">Thanh toán</label>
                                                        <div className="col-sm-8">
                                                            <Field type="number" onKeyUp={() => setInvoiceInfo()} name="paid" className="form-control" id="paid" />
                                                            <ErrorMessage style={{ color: 'red' }} component='span' name="paid" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input12" className="col-sm-4 col-form-label">Còn lại</label>
                                                        <div className="col-sm-8">
                                                            <input type="number" id="extant" disabled className="form-control" />
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
                                                            <thead className="text-light text-center" style={{ backgroundColor: '#0d6efd' }}>
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
                                                            <tbody id="editableBody" ref={elementRef}>


                                                                {
                                                                    values.invoiceDetailDtoSet.map(
                                                                        (value, index) => (
                                                                            <tr key={index} id={index} style={selectedRow === index ? { backgroundColor: '#0d6efd' } : { backgroundColor: 'white' }}
                                                                                onClick={() => {

                                                                                    if (index === selectedRow) {
                                                                                        document.getElementById(index).style.backgroundColor = "white";
                                                                                        setSelectedRow(-1)

                                                                                    }

                                                                                    else {
                                                                                        document.getElementById(index).style.backgroundColor = "#0d6efd";
                                                                                        setSelectedRow(index);

                                                                                    }
                                                                                }}

                                                                            >
                                                                                <td ><SelectPicker
                                                                                    preventOverflow virtualized data={dataMedicine}
                                                                                    placeholder={"Tìm kiếm"}
                                                                                    locale={{ searchPlaceholder: "Tìm kiếm" }}
                                                                                    onChange={async (value) => {
                                                                                        let medicineObject = await JSON.parse(value);
                                                                                        values.invoiceDetailDtoSet[index].medicineId = await medicineObject.id ? medicineObject.id : 0;
                                                                                        setInvoiceDetailInfo(medicineObject, index);
                                                                                    }

                                                                                    }
                                                                                    style={{ width: '90%' }}
                                                                                />
                                                                                    <Field innerRef={fieldNameRef} value={values.invoiceDetailDtoSet[index].medicineId} hidden name={`invoiceDetailDtoSet.${index}.medicineId`} />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.medicineId`} />
                                                                                </td>
                                                                                <td></td>
                                                                                <td>
                                                                                    <Field type="number" onKeyUp={() => updateInoviceDetail(value.medicineId, index)} id={`invoiceDetailDtoSet.${index}.medicineQuantity`} name={`invoiceDetailDtoSet.${index}.medicineQuantity`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.medicineQuantity`} />
                                                                                </td>
                                                                                <td className="unitPrice"></td>

                                                                                <td className="discount">
                                                                                    <Field type="number" onKeyUp={() => updateInoviceDetail(value.medicineId, index)} id={`invoiceDetailDtoSet.${index}.discount`} name={`invoiceDetailDtoSet.${index}.discount`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.discount`} />
                                                                                </td>
                                                                                <td></td>
                                                                                <td className="realPrice">200</td>

                                                                                <td ><Field type="text" name={`invoiceDetailDtoSet.${index}.lot`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.lot`} />
                                                                                </td>
                                                                                <td className="expiry"><Field type="date" name={`invoiceDetailDtoSet.${index}.expiry`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.expiry`} />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )

                                                                }



                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <button onClick={() => push({
                                                    medicineId: 0,
                                                    discount: 0,
                                                    medicineQuantity: 1,
                                                    lot: "",
                                                    expiry: new Date().toISOString().split('T')[0]
                                                })} type="button" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Thêm thuốc
                                                </button>
                                            </fieldset>
                                            <div className="d-flex justify-content-end gap-3 my-3">
                                                <button type="submit" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Thêm mới
                                                </button>
                                                <button type="button" onClick={selectedRow !== -1 ? () => { remove(selectedRow); setSelectedRow(-1) } : null} className="btn btn-outline-primary"><FaRegTrashAlt className="mx-1" />
                                                    Xoá thuốc
                                                </button>
                                                <button type="button" className="btn btn-outline-primary">
                                                    <AiOutlineRollback className="mx-1" /> Trở về
                                                </button>
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
        </>
    );
}
export default CreateInvoice;