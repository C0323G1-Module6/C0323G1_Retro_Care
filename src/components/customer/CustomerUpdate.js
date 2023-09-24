import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    addCustomer,
    getCustomerDetail,
    updateCustomer,
} from "../../services/customer/CustomerService";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {hasFormSubmit} from "@testing-library/user-event/dist/utils";
import Swal from "sweetalert2";
import {FiEdit} from "react-icons/fi";
import {AiOutlineRollback} from "react-icons/ai";
import {FaPlus} from "react-icons/fa";
import "./CustomerCreate.css";
import {differenceInYears, isAfter, parseISO} from "date-fns";
import XRegExp from "xregexp";

const CustomerUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const loadCustomerDetail = async (id) => {
        try {
            const result = await getCustomerDetail(id);
            if (result == null) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Lỗi kết nối',
                    text: 'Không tìm thấy khách hàng',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1);
            }
            setCustomer(result);

        } catch (e) {
            if (e.response.status === 406) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Lỗi kết nối',
                    text: 'Khách hàng bị null',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1);
            }
        }
    }

    const validateBirth = (value) => {
        const currentDate = new Date();
        const birthday = parseISO(value);


        return !isAfter(birthday, currentDate);
    };
    const validateBirthAge = (value) => {
        const currentDate = new Date();
        const birthday = parseISO(value);

        const age = differenceInYears(currentDate, birthday);

        return age >= 18;

    }
    const handleSubmit = async (value, setErrors) => {
        try {
            console.log(value);
            const result = await updateCustomer(value);
            Swal.fire(
                "Cập nhật thành công !",
                "khách hàng " + value.name + " đã được cập nhật!",
                "success"
            );
            navigate(-1);
        } catch (err) {
            if (err.response.data) {
                setErrors(err.response.data);
            }
            if (err.response.status === 406) {
                setErrors(err.response.data);
            }
        }
    };
    useEffect(() => {
        loadCustomerDetail(params.id);
        document.title = 'RetroCare - Sửa thông tin khách hàng';
    }, [params.id]);
    if (!customer) {
        return null;
    }

  const comeBackPagePrev = () => {
    navigate(-1);
  }
    return (
        <>
            <div className="mx-auto" style={{width: "70%"}}>
                <Formik
                    initialValues={{
                        ...customer,
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .max(50, "Tên khách hàng tối đa 50 ký tự")
                            .min(3, "Tên khách hàng tối thiểu 3 ký tự").required("Không bỏ trống trường này").matches(XRegExp('^\\p{Lu}\\p{Ll}*([\\s]\\p{Lu}\\p{Ll}*)*$'), "Nhập sai định dạng vd:Nguyen Van An "),
                        birthday: Yup.string().required(
                            "Không bỏ trống trường này."
                        ).matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Nhập sai định dạng ngày sinh VD: dd/mm/yyyy").test("birthday",
                            "Ngày sinh không được vượt quá thời gian thực tế.",
                            validateBirth).test("birthday",
                            "Cảnh báo khách hàng chưa đủ 18 tuổi.",
                            validateBirthAge),
                        address: Yup.string()
                            .required("Không bỏ trống trường này.")
                            .max(100, "Địa chỉ tối đa 100 ký tự ").min(5, "Địa chỉ tối thiểu 5 ký tự."),
                        phoneNumber: Yup.string()
                            .required("Không bỏ trống trường này")
                            .max(11, "Số điện thoại tối đa 11 ký tự.")
                            .min(10, "Số điện tối thiểu 10 ký tự.").matches(/^(0[3|5|7|8|9])([0-9]{8})\b$/
                                , "Nhập sai định dạng vd: 0339779768"),
                        email: Yup.string()
                            .required("Không bỏ trống trường này").min(12, "Email tối thiểu 12 ký tự")
                            .matches(
                                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                "Nhập sai định dạng vd:nguyenvanan@gmail.com"
                            ).max(30, "Email tối đa 30 ký tự"),
                        note: Yup.string().max(200, "Ghi chú tối đa 200 ký tự."),
                    })}
                    onSubmit={(values, {setErrors}) => handleSubmit(values, setErrors)}
                >
                    {({isValid, dirty}) => (
                        <Form>
                            <fieldset
                                className="form-input shadow"
                                style={{
                                    width: "80%",
                                    border: "1px solid black",
                                    padding: 20,
                                    borderRadius: 20,
                                    height: "auto"
                                }}
                            >
                                <legend className="float-none w-auto px-3">
                                    <h2>Sửa thông tin khách hàng</h2>
                                </legend>
                                <div className="row p-2">
                                    <div className="col-4 p-2">
                                        <label>
                                            Mã khách hàng <span className="text-danger">*</span>{" "}
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field className="form-control mt-2" disabled name="code"/>
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
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
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
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
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
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
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
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
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
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
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                            <ErrorMessage
                                                className=" text-danger"
                                                name="address"
                                                component="small"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>
                                            Ghi chú
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <Field
                                            className="form-control mt-2 border border-dark"
                                            as="textarea"
                                            name="note"
                                        />
                                        <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
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
                                        <button
                                            type="button"
                                            onClick={comeBackPagePrev}
                                            className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                                        >
                                            <AiOutlineRollback className="mx-1"/> Trở về
                                        </button>
                                        {isValid && dirty && (
                                            <button
                                                className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                                                type="submit"
                                            >
                                                <FiEdit className="mx-1"/> Hoàn thành
                                            </button>)}
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-btn"></div>
                        </Form>)}
                </Formik>
            </div>
        </>
    );
};
export default CustomerUpdate;
