import './style.css'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {crateEmployee, createUserEmployee, getNewEmployee} from "../../services/employee/EmployeeService";

const CreationEmployee = ()=>{
    const [employee,setEmployee] = useState()

    useEffect(()=>{
        loadNewEmployee();
    },[])

    const loadNewEmployee = async () => {
        const newEmployee =await getNewEmployee();
        console.log(newEmployee.data)
        setEmployee(newEmployee.data);
    }
    if (employee === undefined){
        return null;
    }
    return(
        <Formik
            initialValues={{
                codeEmployee: employee?.codeEmployee,
                nameEmployee:"",
                address:"",
                image: "",
                phoneNumber: "",
                startDay:"",
                birthday:"",
                idCard:"",
                note:"",
                appUser:"",
            }}
            validationSchema={Yup.object({
                nameEmployee: Yup.string().required("Vui lòng nhập tên nhân viên")
                    .max(100,"Vui lòng nhập dưới 100 kí tự"),
                address:Yup.string().required("Vui lòng nhập địa chỉ"),
                phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
                startDay:Yup.string().required("Vui lòng nhập ngày bắt đầu làm"),
                birthday:Yup.string().required("Vui lòng nhập ngày sinh"),
                idCard:Yup.string().required("Vui lòng nhập CCCD hoặc CMND"),
            })}
            onSubmit={async (value)=>{
                console.log(value.appUser);
                const status = await createUserEmployee(value.appUser);
                console.log(status);
                const res = await crateEmployee(value);
                console.log(res);
            }}
        >
            <Form>
                <div className="container">
                    <div className="row ">
                        <div className="col-4  d-flex justify-content-center align-items-center">
                            <img src={employee.image} width="250" height="300"
                                 style={{borderRadius: "120px", objectFit: "cover"}}/>
                        </div>
                        <div className="col-8  d-flex justify-content-center ">
                            <fieldset className="form-input shadow">
                                <legend className="float-none w-auto px-3"><h2>Thông tin nhân viên</h2></legend>
                                <div className="row">

                                    <div className="col-3 p-2">
                                        <label>Mã nhân viên</label>
                                    </div>
                                    <div className="col-9">
                                        <Field disable name='codeEmployee' className="text-black-50 form-control mt-2 " type='text' />
                                    </div>
                                    <div className="col-3 p-2">
                                        <label>Tên nhân viên <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='nameEmployee' className="form-control border border-dark mt-2" type="text"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='nameEmployee' style={{color: 'red', marginLeft: '20px'}} component={'small'} />
                                        </div>
                                    </div>
                                    <div className="col-3 p-2">
                                        <label>Địa chỉ <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='address' className="form-control border border-dark mt-2" type="text"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='address' style={{color: 'red', marginLeft: '20px'}} component={'small'}/>
                                        </div>

                                    </div>
                                    <div className="col-3 p-2">
                                        <label>Số điện thoại <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='phoneNumber' className="form-control border border-dark mt-2" type="text"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='phoneNumber' style={{color: 'red', marginLeft: '20px'}} component={'small'}/>
                                        </div>

                                    </div>
                                    <div className="col-3 p-2">
                                        <label>Tên tài khoản <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='appUser' className="form-control border border-dark mt-2" type="text"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='appUser' style={{color: 'red', marginLeft: '20px'}} component={'small'}/>
                                        </div>
                                    </div>
                                    <div className="col-3 p-2">
                                        <label>Ngày vào làm <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='startDay' className="form-control border border-dark mt-2" type="date"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='startDay' style={{color: 'red', marginLeft: '20px'}} component={'small'}/>
                                        </div>
                                    </div>
                                    <div className="col-3  p-2">
                                        <label>Ngày sinh <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='birthday' className="form-control border border-dark mt-2" type="date"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='birthday' style={{color: 'red', marginLeft: '20px'}} component={'small'}/>
                                        </div>
                                    </div>

                                    <div className="col-3 p-2">
                                        <label>CCCD/CMND <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <Field name='idCard' className="form-control border border-dark mt-2" type="text"/>
                                        <div style={{height: '16px'}}>
                                            <ErrorMessage name='idCard' style={{color: 'red', marginLeft: '20px'}} component={'small'} />
                                        </div>
                                    </div>
                                    <div className="col-3 p-2">
                                        <label>Chức vụ <sup>*</sup></label>
                                    </div>
                                    <div className="col-9">
                                        <select as='select' className="form-select border border-dark mt-2">
                                            <option value="1">Nhân viên</option>
                                            <option value="2">Quản lý</option>
                                        </select>
                                        <div style={{height: '16px'}}>
                                            <small style={{color: 'red',marginLeft: '20px'}}>error</small>
                                        </div>
                                    </div>
                                    <div className="form-floating  mt-2">
                                        <Field as='textarea' name='note' className="form-control border border-dark" placeholder="Leave a comment here"
                                               id="floatingTextarea"/>
                                        <label htmlFor="floatingTextarea">Note</label>
                                    </div>
                                    <div className="col-4 p-2 mt-3">
                                        <span>(<span style={{color: 'red'}}>*</span>) Thông tin bắt buộc</span>
                                    </div>
                                    <div className="col-8 mt-3">
                                        <a href="/#">
                                            <button className="btn btn-outline-secondary float-end  mx-1 mt-2 shadow"><i
                                                className="fa-solid fa-rotate-left"></i> Trở về
                                            </button>
                                        </a>
                                        <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow">
                                            <i className="fa-solid fa-rotate-right"></i>
                                            Làm mới
                                        </button>
                                        <button type={"submit"} className="btn btn-outline-primary float-end mx-1 mt-2 shadow"><i
                                            className="fa-solid fa-plus"></i> Thêm Mới
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>



    )
}

export default CreationEmployee;