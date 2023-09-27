import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as appUserService from '../../services/user/AppUserService';
import * as Yup from 'yup';
import Swal from "sweetalert2";



const Register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'RetroCare - Đăng ký'
    }, [])
    const registerAppUser = async (appUser, setErrors) => {

        const cloneAppUser = {
            ...appUser,
        }
        try {
            const result = await appUserService.registerAppUser(cloneAppUser);
            Swal.fire({
                icon: 'success',
                title: 'Quay về trang dăng nhập',
            })
            navigate("/login");
        } catch (e) {
            if (e.response.status === 406) {
                setErrors(e.response.data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: e.response.data,
                })
            }
        }
    }

    const checkConfirmPassword = (confirmPassword) => {
        let password = document.getElementById("password").value;
        return password === confirmPassword;
    }

    // Validate register
    const validateRegister = {
        userName: Yup.string()
            .required("Không để trống tài khoản")
            .test('check-userName', 'Không để trống tài khoản', (value) => value.trim().length !== 0)
            .min(3, 'Số lượng ký tự phải lớn hơn hoặc bằng 3')
            .max(50, 'Số lượng ký tự bé hơn hoặc bằng 100'),

        password: Yup.string()
            .required("Không để trống mật khẩu")
            .test('check-userName', 'Không để trống mật khẩu', (value) => value.trim().length !== 0)
            .min(3, 'Số lượng ký tự phải lớn hơn hoặc bằng 3')
            .max(50, 'Số lượng ký tự bé hơn hoặc bằng 100'),

        confirmPassword: Yup.string()
            .required("Không để trống mật khẩu")
            .test('check-userName', 'Không để trống mật khẩu', (value) => value.trim().length !== 0)
            .min(3, 'Số lượng ký tự phải lớn hơn hoặc bằng 3')
            .max(50, 'Số lượng ký tự bé hơn hoặc bằng 50')
            .test('check-confirm-password', 'Mật khẩu không khớp', (value) => checkConfirmPassword(value))
    }

    return (

        <Formik
            initialValues={{
                userName: "",
                password: "",
                confirmPassword: "",
            }}

            validationSchema={Yup.object(validateRegister)}

            onSubmit={(values, { setSubmitting, setErrors }) => {
                setSubmitting(false);
                registerAppUser(values, setErrors);
            }}
        >
            <Form>
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-md-4 p-5 shadow-sm border rounded-3">
                        <h2 className="text-center mb-4 text-primary">Đăng Ký</h2>
                        {/* Input user name */}
                        <div className="mb-1">
                            <label htmlFor="userName" className="form-label">
                                Tài khoản <span className="text-danger">*</span>
                            </label>
                            <Field type="text" className="form-control border border-primary" name="userName" />
                            <div style={{ height: 15 }}>
                                <ErrorMessage className="text-danger" component='small' name="userName" />
                            </div>
                        </div>

                        {/* Input password */}
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">
                                Mật khẩu <span className="text-danger">*</span>
                            </label>
                            <Field type="password" onblur="inputPass()"
                                className="form-control border border-primary" name="password" id="password" />
                            <div style={{ height: 15 }}>
                                <ErrorMessage className="text-danger" component='small' name="password" />
                            </div>
                        </div>

                        {/* Input confirm password */}
                        <div className="mb-1">
                            <label htmlFor="confirmPassword" className="form-label">
                                Nhập lại mật khẩu <span className="text-danger">*</span>
                            </label>
                            <Field type="password" onblur="inputConfirmPass()"
                                className="form-control border border-primary" name="confirmPassword" />
                            <div style={{ height: 15 }}>
                                <ErrorMessage className="text-danger" component='small' name="confirmPassword" />
                            </div>
                        </div>

                        {/* Button submit */}
                        <div className="d-grid mt-3">
                            <button className="btn btn-primary" type="submit">
                               Tiếp tục
                            </button>
                        </div>

                        {/* Button back to /login */}
                        <div className="mt-3">
                            <p className="mb-0 text-end">
                                <Link to={`/login`} className="text-primary fw-bold">
                                    Quay lại
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>



    )
}

export default Register;