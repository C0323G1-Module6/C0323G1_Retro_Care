import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../../services/customer/CustomerService";
const CreateCustomer = () => {
    const navigate = useNavigate();
    const [customerCode,setCustomerCode]=useState();
    const handleSubmit = async (values, setErrors) => {
        try {
            const result = await addCustomer(values);
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response.data) setErrors(err.response.data);

        }
    }
    return (
        <>
            <Formik>
                <div className="d-flex justify-content-center">
                    <Form>
                        <fieldset className="form-input shadow">
                            <legend className="float-none w-auto px-3">
                                <h2>Thêm thông tin khách hàng</h2>
                            </legend>
                            <div className="row p-2">
                                <div className="col-4 p-2">
                                    <label>Nhóm khách hàng</label>
                                </div>
                                <div className="col-8">
                                    <select className="form-select mt-2 border border-dark">
                                        <option>Khách Online</option>
                                        <option>Khách Offline</option>
                                    </select>
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Mã khách hàng <span>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input
                                        className="form-control mt-2"
                                        disabled=""
                                        defaultValue="KH001"
                                    />
                                    <small className="p-3 mb-2 text-danger"> </small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Tên khách hàng <span>*</span>{" "}
                                    </label>
                                </div>
                                <div className="col-8">
                                    <Field className="form-control mt-2 border border-dark" type="text" />
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Số điện thoại <span>*</span>
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input className="form-control mt-2 border border-dark" type="text" />
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>Ngày sinh </label>
                                </div>
                                <div className="col-8">
                                    <input className="form-control mt-2 border border-dark" type="date" />
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Địa chỉ email <span>*</span>
                                    </label>
                                </div>
                                <div className="col-8">
                                    <input
                                        className="form-control mt-2 border border-dark"
                                        type="email"
                                    />
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Địa chỉ <span>*</span>
                                    </label>
                                </div>
                                <div className="col-8">
                                    <textarea
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                        defaultValue={""}
                                    />
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2">
                                    <label>
                                        Ghi chú <span>*</span>
                                    </label>
                                </div>
                                <div className="col-8">
                                    <textarea
                                        className="form-control mt-2 border border-dark"
                                        type="text"
                                        defaultValue={""}
                                    />
                                    <small className="p-3 mb-2 text-danger">Error</small>
                                </div>
                                <div className="col-4 p-2 mt-3">
                                    <div className="float-start">
                                        <small className="text-danger">(*)</small> Thông tin bắt buộc
                                    </div>
                                </div>
                                <div className="col-8 mt-3">
                                    <a
                                        href="/retro_care/prototype/customer/QuyenHT_CustomerList.html"
                                        className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                                    >
                                        <i className="fa-solid fa-rotate-left" /> Trở về
                                    </a>
                                    <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow">
                                        <i className="fa-solid fa-plus" /> Thêm Mới
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-btn" />
                    </Form>
                </div>

            </Formik>
        </>
    )
}