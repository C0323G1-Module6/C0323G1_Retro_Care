import {Field, Form, Formik, ErrorMessage} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import "./CustomerCreate.css";
import {useNavigate} from "react-router-dom";
import {addCustomer, getCustomerCode} from "../../services/customer/CustomerService";

const CustomerCreate = () => {
    const navigate = useNavigate();
    const [customerCode, setCustomerCode] = useState("");
    useEffect(
        () => {
            getCode()
        }, []
    )
    const getCode = async () => {
        const result = await getCustomerCode();
        setCustomerCode(result.code);
        console.log(result.code);
    }
    const handleSubmit = async (values, setErrors) => {
        try {
            const result = await addCustomer(values);
            // navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response.data) {
                setErrors(err.response.data);
            }
        }
    }
    if (customerCode == "") {
        return null;
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <Formik initialValues={{
                    code: customerCode,
                    name: "",
                    phoneNumber: "",
                    birthday: "",
                    email: "",
                    address: "",
                    note: ""
                }}
                        onSubmit={(values, {setErrors}) => handleSubmit(values, setErrors)}

                >
                    <Form>
                        <fieldset className="form-input shadow">
                            <legend className="float-none w-auto px-3">
                                <h2>Thêm thông tin khách hàng</h2>
                            </legend>
                            <div className="row p-2">

                                <div className="col-4 p-2">
                                    <label>Mã khách hàng <span>*</span> </label>
                                </div>
                                <div className="col-8">
                                    <Field className="form-control mt-2" disabled name="code"/>
                                    <div className="p-2 mb-2">
                                        <ErrorMessage className="p-3 mb-2 text-danger" name="code" component="span"/>
                                    </div>
                                </div>

                                <div className="col-4 p-2">
                                    <label>Tên khách hàng <span>*</span> </label>
                                </div>
                                <div className="col-8">
                                    <Field className="form-control mt-2 border border-dark" name="name" type="text"/>
                                    <div className="p-2 mb-2">
                                    <ErrorMessage className="p-3 mb-2 text-danger" name="name" component="span"/></div>
                                </div>

                                <div className="col-4 p-2">
                                    <label>Số điện thoại <span>*</span></label>
                                </div>
                                <div className="col-8">
                                    <Field className="form-control mt-2 border border-dark" name="phoneNumber" type="text"/>
                                    <div className="p-2 mb-2">
                                    <ErrorMessage className="p-3 mb-2 text-danger" name="phoneNumber" component="span"/></div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>Ngày sinh </label>
                                </div>
                                <div className="col-8">
                                    <Field className="form-control mt-2 border border-dark" name="birthday" type="date"/>
                                    <div className="p-2 mb-2">
                                        <ErrorMessage className=" text-danger" name="birthday" component="span"/>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>Địa chỉ email <span>*</span></label>
                                </div>
                                <div className="col-8">
                                    <Field
                                        className="form-control mt-2 border border-dark"
                                        type="email"
                                        name="email"
                                    />
                                    <div className="p-2 mb-2">
                                    <ErrorMessage className="p-3 mb-2 text-danger" name="email" component="span"/></div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>Địa chỉ <span>*</span></label>
                                </div>
                                <div className="col-8">
                                    <Field
                                        className="form-control mt-2 border border-dark"
                                        as="textarea"
                                        name="address"
                                    />
                                    <div className="p-2 mb-2">
                                    <ErrorMessage className="p-3 mb-2 text-danger" name="address" component="span"/></div>
                                </div>
                                <div className="col-4 p-2">
                                    <label>Ghi chú <span>*</span></label>
                                </div>
                                <div className="col-8">
                                    <Field
                                        className="form-control mt-2 border border-dark"
                                        as="textarea"
                                        name="note"
                                    />
                                    <div className="p-2 mb-2">
                                        <ErrorMessage className=" text-danger" name="note" component="span"/>
                                    </div>
                                </div>
                                <div className="col-4 p-2 mt-3">
                                    <div className="float-start">
                                        <small className="text-danger">(*)</small> Thông tin bắt buộc
                                    </div>
                                </div>
                                <div className="col-8 mt-3">
                                    <a
                                        className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                                    > Trở về</a
                                    >
                                    <button
                                        className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                                   type="submit" >Thêm Mới
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-btn"></div>
                    </Form>
                </Formik>

            </div>

        </>
    )
}
export default CustomerCreate;