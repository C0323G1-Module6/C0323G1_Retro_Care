import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import * as ServiceUser from "../../services/user/AppUserService"
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { set } from "date-fns";
import { validate } from "uuid";
function CreateInvoice() {
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState([]);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [medicine, setMedicine] = useState([]);
    const [maxCode, setMaxCode] = useState('');
    const fieldNameRef = useRef(null);
    const elementRef = useRef(null);
    const [employee, setEmployee] = useState({
    });
    const [totalPriceMedicine, setTotalPriceMedicine] = useState(0);
    const [paid, setPaid] = useState(0);
    const [flag, setFlag] = useState(false);



    const getSupplier = async () => {
        const result = await ServiceInvoice.getSupllierList();
        setSupplier(result);
    }

    const getMedicine = async () => {
        const result = await ServiceInvoice.getMedicineList();
        setMedicine(result);
    }

    const createInvoice = async (invoice, setErrors) => {
        try {
            const result = await ServiceInvoice.createInvoice(invoice);

            Swal.fire(
                "Thêm thành công !",
                "Hóa đơn " + result.data.code + " đã được thêm!",
                "success"
            );
            navigate("/dashboard/invoice")
        } catch (err) {
            Swal.fire(
                "Thêm không thành công !",
            );
            setErrors(err.response.data);
        }

    }

    const getMaxCode = async () => {
        const result = await ServiceInvoice.getMaxCode();
        setMaxCode(result);
    }


    const getEmployee = async () => {
        const username = await ServiceUser.infoAppUserByJwtToken().sub;
        const result = await ServiceInvoice.getEmployee(username);
        setEmployee(result);
    }


    useEffect(() => {
        getEmployee();
        getSupplier();
        getMedicine();
        getMaxCode();
    }, [employee.id])



    const getUnit = async (medicineId) => {
        const result = await ServiceInvoice.getUnitDetail(medicineId);
        return result;
    };
    const setInvoiceInfo = async (value) => {
        // const elements = await elementRef.current.getElementsByClassName("realPrice");
        // // Sử dụng các phần tử đã lấy được
        // let totalPrice = 0;
        // for (let i = 0; i < elements.length; i++) {
        //     const element = elements[i];
        //     const value = parseInt(element.textContent) || 0;
        //     totalPrice += value;
        // }
        // setTotalPriceMedicine(totalPrice);
        alert(value)
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
        let unitPrice = parseInt(value.price - (value.price * (value.retailProfits + value.vat) / 100)) || 0;
        let price = (unitPrice - (unitPrice * discount / 100)) * quantity;
        const element = document.getElementById(`${index}`);
        element.getElementsByTagName('td')[1].textContent = unit;
        element.getElementsByTagName('td')[3].textContent = new Intl.NumberFormat("vi-VN").format(unitPrice) || 0;
        element.getElementsByTagName('td')[5].textContent = value.vat;
        element.getElementsByTagName('td')[6].textContent = new Intl.NumberFormat("vi-VN").format(price) || 0;
        await setInvoiceInfo();
    }


    const dataSupllier = supplier.map(
        item => ({ label: item.code, value: JSON.stringify(item) })
    );
    const dataMedicine = medicine.map(
        item => ({ label: item.name, value: JSON.stringify(item) })
    );
    if (employee.id == null)
        return null;

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
                        appUserId: employee.appUser.id,
                        invoiceDetailDtoSet: [{
                            medicineId: 0,
                            discount: 0,
                            medicineQuantity: 1,
                            lot: "",
                            expiry: new Date().toISOString().split('T')[0],
                            medicineObject: {}
                        },]
                    }}
                    onSubmit={async (invoiceValue, { setSubmitting, setErrors }) => {
                        setSubmitting(true);
                        let newInvoiceValue = { ...invoiceValue, supplierId: document.getElementById("supplierId").value };
                        newInvoiceValue = { ...newInvoiceValue, appUserId: employee.appUser.id }
                        await createInvoice(newInvoiceValue, setErrors);
                        setSubmitting(false);
                    }}

                    validationSchema={Yup.object({
                        paid: Yup.number("Trường nhập vào phải là số")
                            .required("Không được để trống trường này")
                            .min(0, "Trường không được nhỏ hơn 0")
                            .max(totalPriceMedicine, "Không được lớn hơn tổng tiền"),
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
                                                                <div className="row g-1">
                                                                    <div className="col-10 p-0">
                                                                        <SelectPicker
                                                                            onClean={() => (values.supplierId = 0)}
                                                                            onChange={(value) => {
                                                                                if (value !== null) {
                                                                                    let supplierObject = JSON.parse(value);
                                                                                    document.getElementById("supplierId").value = supplierObject.id;
                                                                                    document.getElementById("supplierName").value = supplierObject.name;
                                                                                    document.getElementById("supplierAddress").value = supplierObject.address;
                                                                                }
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
                                                                <input type="text" defaultValue={employee.nameEmployee} disabled className="form-control" id="input7" />
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
                                                            <input type="text" disabled id="medicinePrice" value={new Intl.NumberFormat("vi-VN").format(totalPriceMedicine)} className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 row">
                                                        <label htmlFor="input10" className="col-sm-4 col-form-label">Tổng tiền</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" disabled id="totalPrice" value={new Intl.NumberFormat("vi-VN").format(totalPriceMedicine)} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input11" className="col-sm-4 col-form-label">Thanh toán</label>
                                                        <div className="col-sm-8">
                                                            <Field type="number" onKeyUp={() => setPaid(values.paid)} name="paid" className="form-control" id="paid" />
                                                            <ErrorMessage style={{ color: 'red' }} component='span' name="paid" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label htmlFor="input12" className="col-sm-4 col-form-label">Còn lại</label>
                                                        <div className="col-sm-8">
                                                            <input type="number" id="extant" value={totalPriceMedicine - paid >= 0 ? totalPriceMedicine - paid : 0} disabled className="form-control" />
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
                                                                            <tr key={index} id={index} className="text-center" style={selectedRow === index ? { backgroundColor: '#0d6efd' } : { backgroundColor: 'white' }}
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
                                                                                <td style={{ width: 224 }}><SelectPicker
                                                                                    onClean={
                                                                                        () => {
                                                                                            values.invoiceDetailDtoSet[index].medicineId = 0;


                                                                                            setFlag(prev => !prev);
                                                                                        }

                                                                                    }
                                                                                    preventOverflow virtualized data={dataMedicine}
                                                                                    placeholder={"Tìm kiếm"}
                                                                                    locale={{ searchPlaceholder: "Tìm kiếm" }}
                                                                                    onSelect={async (value) => {
                                                                                        let medicineObject = await JSON.parse(value);
                                                                                        if (value !== null) {
                                                                                            setInvoiceInfo(values.invoiceDetailDtoSet);
                                                                                            let unit = await getUnit(medicineObject.id);
                                                                                            values.invoiceDetailDtoSet[index].medicineId = await medicineObject.id ? medicineObject.id : 0;
                                                                                            values.invoiceDetailDtoSet[index].medicineObject = await medicineObject;
                                                                                            document.getElementById(`invoiceDetailDtoSet.${index}.vat`).textContent = medicineObject.vat;
                                                                                            document.getElementById(`invoiceDetailDtoSet.${index}.unit`).textContent = await unit;
                                                                                            setFlag(prev => !prev);


                                                                                        } else {
                                                                                            setFlag(prev => !prev);
                                                                                        }
                                                                                    }

                                                                                    }
                                                                                    style={{ width: '90%' }}
                                                                                />
                                                                                    <Field innerRef={fieldNameRef} value={values.invoiceDetailDtoSet[index].medicineId} hidden name={`invoiceDetailDtoSet.${index}.medicineId`} />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.medicineId`} />
                                                                                </td>
                                                                                <td id={`invoiceDetailDtoSet.${index}.unit`}></td>
                                                                                <td style={{ width: 120 }}>
                                                                                    <Field type="number" id={`invoiceDetailDtoSet.${index}.medicineQuantity`} onKeyUp={() => {

                                                                                        // setInvoiceInfo();

                                                                                        setFlag(prev => !prev);
                                                                                    }} name={`invoiceDetailDtoSet.${index}.medicineQuantity`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.medicineQuantity`} />
                                                                                </td>
                                                                                <td className="unitPrice"> {new Intl.NumberFormat("vi-VN").format(parseInt(value.medicineObject.price - (value.medicineObject.price * value.medicineObject.vat * value.medicineObject.retailProfits / 100)))} </td>

                                                                                <td className="discount" style={{ width: 100 }}>
                                                                                    <Field type="number" id={`invoiceDetailDtoSet.${index}.discount`} name={`invoiceDetailDtoSet.${index}.discount`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.discount`} />
                                                                                </td>
                                                                                <td id={`invoiceDetailDtoSet.${index}.vat`}></td>
                                                                                <td className="realPrice">{

                                                                                    new Intl.NumberFormat("vi-VN").format(parseInt((value.medicineObject.price - (value.medicineObject.price * value.medicineObject.vat * value.medicineObject.retailProfits * value.discount / 100)) * value.medicineQuantity))



                                                                                }</td>

                                                                                <td style={{ width: 224 }}><Field type="text" name={`invoiceDetailDtoSet.${index}.lot`} class="form-control" />
                                                                                    <ErrorMessage style={{ color: 'red' }} component='span' name={`invoiceDetailDtoSet.${index}.lot`} />
                                                                                </td>
                                                                                <td className="expiry" style={{ width: 140 }}><Field type="date" name={`invoiceDetailDtoSet.${index}.expiry`} class="form-control" />
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
                                                    expiry: new Date().toISOString().split('T')[0],
                                                    medicineObject: {}
                                                })} type="button" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Thêm thuốc
                                                </button>
                                            </fieldset>
                                            <div className="d-flex justify-content-end gap-3 my-3">
                                                <button type="submit" className="btn btn-outline-primary"> <FaPlus className="mx-1" /> Thêm mới
                                                </button>
                                                <button type="button" onClick={selectedRow !== -1 ? () => { remove(selectedRow); setSelectedRow(-1) } : null} className="btn btn-outline-primary"><FaRegTrashAlt className="mx-1" />
                                                    Xoá thuốc
                                                </button>
                                                <Link to={"/dashboard/invoice"}>
                                                    <button type="button" className="btn btn-outline-primary">
                                                        <AiOutlineRollback className="mx-1" /> Trở về
                                                    </button>
                                                </Link>
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
