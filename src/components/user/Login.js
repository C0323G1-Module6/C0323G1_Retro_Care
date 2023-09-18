import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from 'yup';
import * as appUserService from '../../services/AppUserService';

const Login = () => {

    const loginByUserName = async (appUser, setErrors) => {
        try {
            const result = await appUserService.loginByUserName(appUser);
            console.log(result.data);
        } catch (e) {
            switch (e.response.status) {
                case 406:
                    setErrors(e.response.data);
                    return;
                case 403:
                    alert(e.response.data);
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: e.response.data,
                    //     footer: '<a href="">Why do I have this issue?</a>'
                    // })
            }

        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    userName: "",
                    password: ""
                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .required("Không để trống tài khoản")
                        .test('check-userName', 'Không để trống tài khoản', (value) => value.trim().length !== 0)
                        .min(3, 'Số lượng ký tự phải lớn hơn hoặc bằng 3')
                        .max(100, 'Số lượng ký tự bé hơn hoặc bằng 100'),

                    password: Yup.string()
                        .required("Không để trống mật khẩu")
                        .test('check-userName', 'Không để trống mật khẩu', (value) => value.trim().length !== 0)
                        .min(3, 'Số lượng ký tự phải lớn hơn hoặc bằng 3')
                        .max(100, 'Số lượng ký tự bé hơn hoặc bằng 100'),

                })}
                onSubmit={(values, { setSubmitting, setErrors }) => {

                    setSubmitting(false);

                    let cloneValues = {
                        ...values,

                    }
                    loginByUserName(cloneValues, setErrors);
                }}
            >
                <Form>
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <div className="col-md-4 p-5 shadow-sm border rounded-3">
                            <h2 className="text-center mb-4 text-primary">Đăng Nhập</h2>
                            {/* Input userName */}
                            <div className="mb-1">
                                <label htmlFor="userName" className="form-label">
                                    Tài khoản <span className="text-danger">*</span>
                                </label>
                                <Field type="text" className="form-control border border-primary" id="userName" name="userName" aria-describedby="emailHelp" />
                                <div style={{ height: '15px' }}>
                                    <ErrorMessage component='small' className="text-danger" name="userName" />
                                </div>
                            </div>

                            {/* Input password */}
                            <div className="mb-1">
                                <label htmlFor="password" className="form-label">
                                    Mật khẩu <span className="text-danger">*</span>
                                </label>
                                <Field type="password" className="form-control border border-primary" id="password" name="password" />
                                <div style={{ height: '15px' }}>
                                    <ErrorMessage component='small' className="text-danger" name="password" />
                                </div>
                            </div>

                            <p className="small">
                                <a className="text-primary" href="forget-password.html">Quên mật khẩu?</a>
                            </p>
                            {/* Button Login */}
                            <div className="d-grid">
                                <button className="btn btn-primary">
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <a href="#"><i className="fa-brands fa-square-facebook" style={{ color: '#115cdf', fontSize: 35 }} /></a>
                                    <a href="#"><i className="fa-brands fa-square-google-plus" style={{ color: '#ff0000', fontSize: 35 }} />
                                    </a>
                                </div>
                                <div className="mb-0">
                                    Bạn chưa có tài khoản?
                                    <a href="NhatNHH_signup.html" className="text-primary fw-bold">
                                        Đăng ký
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>


        </>
    )
}

export default Login;