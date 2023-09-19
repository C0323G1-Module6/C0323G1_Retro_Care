import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as appUserService from '../../services/user/AppUserService';
import { BsFacebook } from "react-icons/bs"
import { AiFillGoogleCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import Swal from "sweetalert2";

const Login = () => {
    const FBID = process.env.REACT_APP_KEY;
    const navigate = useNavigate();

    const loginWithFacebook = async (resolve) => {
        try {
            const result = await appUserService.loginWithFacebook({ facebookMail: resolve.data.email });
            console.log(result);
            appUserService.addJwtTokenToLocalStorage(result.data.jwtToken);
            navigate("/home");
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data,
            })
        }
    }

    const loginByUserName = async (appUser, setErrors) => {
        try {
            const result = await appUserService.loginByUserName(appUser);
            appUserService.addJwtTokenToLocalStorage(result.data.jwtToken);
            navigate("/home")
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data,
            })

        }

    }

    return (
        <Formik
            initialValues={{
                userName: "",
                password: ""
            }}

            onSubmit={(values, { setSubmitting }) => {

                setSubmitting(false);

                let cloneValues = {
                    ...values,

                }
                loginByUserName(cloneValues);
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
                            </div>
                        </div>

                        {/* Input password */}
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">
                                Mật khẩu <span className="text-danger">*</span>
                            </label>
                            <Field type="password" className="form-control border border-primary" name="password" />
                            <div style={{ height: '15px' }}>
                            </div>
                        </div>

                        {/* Button Login */}
                        <div className="d-grid mt-4">
                            <button className="btn btn-primary" type="submit">
                                Đăng nhập
                            </button>
                        </div>
                        {/* Login in by social */}
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                            <div>
                                <LoginSocialFacebook
                                    className="btn border-0"
                                    appId="294412776626440"
                                    onResolve={(resolve) => {
                                        console.log(resolve);
                                        loginWithFacebook(resolve);
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