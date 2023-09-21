import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import "./CustomerCreate.css";
import { Link, useNavigate } from "react-router-dom";
import {
  addCustomer,
  getCustomerCode,
} from "../../services/customer/CustomerService";
import Swal from "sweetalert2";
import { AiOutlineRollback } from "react-icons/ai";

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [customerCode, setCustomerCode] = useState("");
  useEffect(() => {
    getCode();
  }, []);
  const getCode = async () => {
    const result = await getCustomerCode();
    setCustomerCode(result.code);
    console.log(result.code);
  };
  const handleSubmit = async (value, setErrors) => {
    try {
      const result = await addCustomer(value);
      Swal.fire(
        "Thêm mới thành công !",
        "khách hàng" + value.name + "đã được thêm mới!",
        "success"
      );
      navigate("/dashboard/customer");
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        setErrors(err.response.data);
      }
      if (err.response.status === 406) {
        console.log(err);
        setErrors(err.response.data);
      }
    }
  };
  if (customerCode == "") {
    return null;
  }
  return (
    <>
      <div className="mx-auto" style={{ width: "50%" }}>
        <Formik
          initialValues={{
            code: customerCode,
            name: "",
            phoneNumber: "",
            birthday: "",
            email: "",
            address: "",
            note: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(50)
              .min(2, "Độ dài tên quá ngắn vui lòng nhập thêm"),
            birthday: Yup.string().required(
              "Vui lòng nhập ngày sinh khách hàng"
            ),
            address: Yup.string()
              .required("Vui lòng nhập địa chỉ cho khách hàng")
              .max(100, "Độ dài vượt quá ký tự cho phép"),
            phoneNumber: Yup.string()
              .required("Vui lòng nhập số điện thoại cho khách hàng")
              .max(12, "Độ dài vượt quá ký tự cho phép")
              .min(7, "Số điện thoại quá ngắn"),
            email: Yup.string()
              .required("Vui lòng nhập địa chỉ email cho khách hàng")
              .matches(
                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                "Chưa đúng định dạng email"
              ),
            note: Yup.string().max(50, "Độ dài đang vượt quá ký tự cho phép"),
          })}
          onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
        >
          <Form>
            <fieldset className="form-input shadow">
              <legend className="float-none w-auto px-3">
                <h2>Thêm thông tin khách hàng</h2>
              </legend>
              <div className="row p-2">
                <div className="col-4 p-2">
                  <label>
                    Mã khách hàng <span className="text-danger">*</span>{" "}
                  </label>
                </div>
                <div className="col-8">
                  <Field className="form-control mt-2" disabled name="code" />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className="text-danger"
                      name="code"
                      component="small"
                    />
                  </div>
                </div>

                <div className="col-4 p-2">
                  <label>
                    Tên khách hàng <span className="text-danger">*</span>{" "}
                  </label>
                </div>
                <div className="col-8">
                  <Field
                    className="form-control mt-2 border border-dark"
                    name="name"
                    type="text"
                  />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className=" text-danger"
                      name="name"
                      component="small"
                    />
                  </div>
                </div>

                <div className="col-4 p-2">
                  <label>
                    Số điện thoại <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-8">
                  <Field
                    className="form-control mt-2 border border-dark"
                    name="phoneNumber"
                    type="text"
                  />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className=" text-danger"
                      name="phoneNumber"
                      component="small"
                    />
                  </div>
                </div>
                <div className="col-4 p-2">
                  <label>
                    Ngày sinh <span className="text-danger">*</span>{" "}
                  </label>
                </div>
                <div className="col-8">
                  <Field
                    className="form-control mt-2 border border-dark"
                    name="birthday"
                    type="date"
                  />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className=" text-danger"
                      name="birthday"
                      component="small"
                    />
                  </div>
                </div>
                <div className="col-4 p-2">
                  <label>
                    Địa chỉ email <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-8">
                  <Field
                    className="form-control mt-2 border border-dark"
                    type="email"
                    name="email"
                  />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className=" text-danger"
                      name="email"
                      component="small"
                    />
                  </div>
                </div>
                <div className="col-4 p-2">
                  <label>
                    Địa chỉ <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-8">
                  <Field
                    className="form-control mt-2 border border-dark"
                    as="textarea"
                    name="address"
                  />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className=" text-danger"
                      name="address"
                      component="small"
                    />
                  </div>
                </div>
                <div className="col-4 p-2">
                  <label>
                    Ghi chú <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-8">
                  <Field
                    className="form-control mt-2 border border-dark"
                    as="textarea"
                    name="note"
                  />
                  <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                    <ErrorMessage
                      className=" text-danger"
                      name="note"
                      component="small"
                    />
                  </div>
                </div>
                <div className="col-4 p-2 mt-3">
                  <div className="float-start">
                    <small className="text-danger">(*)</small> Thông tin bắt
                    buộc
                  </div>
                </div>
                <div className="col-8 mt-3">
                  <Link
                    to="/dashboard/customer"
                    className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                  >
                    <AiOutlineRollback className="mx-1" /> Trở về
                  </Link>
                  <button
                    className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                    type="submit"
                  >
                    <FaPlus className="mx-1" /> Thêm Mới
                  </button>
                </div>
              </div>
            </fieldset>
            <div className="form-btn"></div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default CustomerCreate;
