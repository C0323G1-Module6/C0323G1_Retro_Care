import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from 'yup';
import * as appUserService from '../../services/user/AppUserService';
import { BsFacebook } from "react-icons/bs"
import { AiFillGoogleCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";

const Login = () => {
    const FBID = process.env.REACT_APP_KEY;
    const navigate = useNavigate();

    const loginByUserName = async (appUser, setErrors) => {
        try {
            const result = await appUserService.loginByUserName(appUser);
            localStorage.setItem("JWT", result.data.jwtToken)
            navigate("/home")
        } catch (e) {
            if (e.response.status === 406) {
                setErrors(e.response.data);
            } else {
                alert(e.response.data);
            }
        }
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: e.response.data,
        //     footer: '<a href="">Why do I have this issue?</a>'
        // })


    }

    return (
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
                            <Field type="text" className="form-control border border-primary" name="userName" />
                            <div style={{ height: '15px' }}>
                                <ErrorMessage component='small' className="text-danger" name="userName" />
                            </div>
                        </div>

                        {/* Input password */}
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">
                                Mật khẩu <span className="text-danger">*</span>
                            </label>
                            <Field type="password" className="form-control border border-primary" name="password" />
                            <div style={{ height: '15px' }}>
                                <ErrorMessage component='small' className="text-danger" name="password" />
                            </div>
                        </div>

                        <p className="small">
                            <a className="text-primary" href="forget-password.html">Quên mật khẩu?</a>
                        </p>
                        {/* Button Login */}
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit">
                                Đăng nhập
                            </button>
                        </div>
                        {/* Login in by social */}
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                            <div>
                                <LoginSocialFacebook
                                    className="btn border-0"
                                    appId={`${FBID}`}
                                    onResolve={(resolve) => {
                                        console.log(resolve);
                                        // loginWithFacebook(resolve);
                                    }}
                                    onReject={(reject) => console.log(reject)}
                                >
                                    <BsFacebook color="blue" size={30} />
                                </LoginSocialFacebook>
                           
                            <a href="#">
                                <AiFillGoogleCircle style={{ color: '#ff0000', fontSize: 35 }} />
                            </a>
                            </div>
                            <div className="mb-0">
                                Bạn chưa có tài khoản?&nbsp;
                                <Link to={`/register`} className="text-primary fw-bold">
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Login;