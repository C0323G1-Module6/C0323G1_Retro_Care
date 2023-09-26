import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getCustomerDetailByUserId,
    updateCustomer,
    updateNewCustomer
} from "../../services/customer/CustomerService";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "./CustomerCreate.css";
import {differenceInYears, isAfter, parseISO} from "date-fns";
import XRegExp from "xregexp";

const UserCustomer = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const loadCustomerDetail = async (id) => {
        try {
            const result = await getCustomerDetailByUserId(id);
            console.log(result)
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
                console.log(e);
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
    const comeBackPagePrev = () => {
        navigate(-1);
    }
    const handleSubmit = async (value, setErrors) => {
        try {
            console.log(value);
            const result = await updateNewCustomer(value);
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
        document.title = 'RetroCare - Cập nhật hố sơ cá nhân';
    }, [params.id]);
    if (!customer) {
        return null;
    }
    return (
        <>
            <Formik
                initialValues={{
                    ...customer,
                    note: ""
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
                        ).max(30, "Email tối đa 30 ký tự")
                })}
                onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
            >
                {({ isValid,dirty }) => (
                    <div   className="row shadow mx-auto image-with-body"
                           style={{width: "80%", marginTop: "2%", borderRadius: 20, marginLeft: "2%"}}>
                        <div className="col-5 image-with-text">
                            <div style={{marginTop: "8%"}}>
                                {/*<h5 style={{fontWeight: "bold", color: "whitesmoke"}}>Bạn đã cập nhật ?</h5>*/}
                                {/*<p style={{color: "whitesmoke", fontWeight: "bold"}}>*/}
                                {/*    Để xem các sản phẩm, giá cả và ưu đãi mới nhất, bạn cần phải đăng ký.*/}
                                {/*    Vui lòng nhập thông tin của bạn để chúng tôi có thể liên hệ với bạn và*/}
                                {/*    gửi cho bạn liên kết đến tất cả các sản phẩm.*/}
                                {/*</p>*/}
                            </div>
                            <div className=" mt-5">
                                {/*<h5 style={{fontWeight: "bold", color: "whitesmoke"}}>Bạn đã cập nhật trước khi ?</h5>*/}
                                {/*<p style={{color: "whitesmoke", fontWeight: "bold"}}>*/}
                                {/*    Nếu bạn đã đăng ký trước đó nhưng quên hoặc không tìm thấy liên kết*/}
                                {/*    chúng tôi đã gửi cho bạn, vui lòng gọi cho chúng tôi hoặc gửi email cho*/}
                                {/*    chúng tôi. Bạn có thể đăng ký lại nếu muốn, nhưng không cần thiết nếu*/}
                                {/*    bạn đã đăng ký rồi.*/}
                                {/*</p>*/}
                            </div>
                            <div className="mt-5">
                                {/*<h5 style={{fontWeight: "bold", color: "whitesmoke"}}>Làm sao để cập nhật thông tin ?</h5>*/}
                                {/*<p style={{color: "whitesmoke", fontWeight: "bold"}}>*/}
                                {/*    Vui lòng điền đầy đủ thông tin để được cập nhật, sau đó hãy bấm nút cập*/}
                                {/*    nhật để kết thúc thao tác.*/}
                                {/*</p>*/}
                            </div>
                        </div>
                        <Form className="col-7 px-3 pt-3" style={{borderRadius: 20}}>
                            <h2 style={{color: "#6C757D", marginLeft: "2rem"}}>
                                Hồ sơ thông tin cá nhân
                            </h2>
                            <hr/>
                            <div className="mx-auto pt-2 pb-3" style={{width: "90%"}}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Họ và tên <small style={{color: "red"}}>*</small>
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder=" Chưa có thông tin vd: Nguyễn Văn An"
                                        name="name"
                                    />
                                    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                        <ErrorMessage
                                            className=" text-danger"
                                            name="name"
                                            component="small"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Địa chỉ email <small style={{color: "red"}}>*</small>
                                    </label>
                                    <Field
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="name@example.com"
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
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">
                                        Số điện thoại <small style={{color: "red"}}>*</small>
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="phoneNumber"
                                        placeholder="VD: 0339779751"
                                        name="phoneNumber"
                                    />
                                    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                        <ErrorMessage
                                            className=" text-danger"
                                            name="phoneNumber"
                                            component="small"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="birthday" className="form-label">
                                        Ngày sinh <small style={{color: "red"}}>*</small>
                                    </label>
                                    <Field
                                        type="date"
                                        className="form-control"
                                        id="birthday"
                                        name="birthday"
                                    />
                                    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                        <ErrorMessage
                                            className=" text-danger"
                                            name="birthday"
                                            component="small"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="form-label">
                                        Địa chỉ <small style={{color: "red"}}>*</small>
                                    </label>
                                    <Field
                                        as="textarea"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        placeholder="Vd :120 tên đường, quận/huyện , tỉnh/thành"
                                        defaultValue={""}
                                    />
                                    <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                        <ErrorMessage
                                            className=" text-danger"
                                            name ="address"
                                            component ="small"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 d-flex justify-content-between align-items-center">
                                    <div  style={{float: "start"}}>
                                        <small className="text-danger">(*)</small> Thông tin cần thiết để mua
                                        hàng
                                    </div>
                                    <div >
                                        { isValid && dirty && (
                                            <button
                                                className="btn btn-success float-end mx-1 mt-2 shadow"
                                                type="submit"
                                            >Cập nhật
                                            </button>)}
                                    </div>
                                    <div >
                                        <button
                                            type="button"
                                            onClick={comeBackPagePrev}
                                            className="btn btn-outline-secondary float-end mx-1 mt-2 shadow"
                                        >
                                            Trở về
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>)}</Formik>

        </>
    );
};
export default UserCustomer;