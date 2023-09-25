import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as appUserService from '../../services/user/AppUserService';
import { BsFacebook } from "react-icons/bs"
import { AiFillGoogleCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import Swal from "sweetalert2";
import { te } from "date-fns/locale";


const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'RetroCare - Đăng nhập'
    }, [])

    const handleLogin = async (resolve) => {
        try {

            const result = await appUserService.loginWithFacebook({ facebookMail: resolve.data.email });
            appUserService.addJwtTokenToLocalStorage(result.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (tempURL) {
                navigate(tempURL);
            } else {
                navigate('/home');

            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data,
            })
        }   
    }

    const loginWithFacebook = async (resolve) => {
        console.log(resolve);
        Swal.fire({
            text: 'Chào '+resolve.data.name+', bạn có muốn đăng nhập thông qua facebook ' + resolve.data.email+" không?",
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: `Thoát`,
        }).then((result) => {

            if (result.isConfirmed) {
                handleLogin(resolve)
            } else if (result.isDenied) {
                return;
            }
        })

    }

    const loginByUserName = async (appUser) => {
        try {
            const result = await appUserService.loginByUserName(appUser);
            appUserService.addJwtTokenToLocalStorage(result.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (tempURL) {
                navigate(tempURL);
            } else {
                navigate('/home');

            }
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
                                        loginWithFacebook(resolve);
                                    }}

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