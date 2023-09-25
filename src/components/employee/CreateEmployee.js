import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import {
  crateEmployee,
  getNewEmployee,
} from "../../services/employee/EmployeeService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { parse, differenceInYears } from "date-fns";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const CreationEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState();
  const imgPreviewRef = useRef(null);
  const inputFileRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const saveEmployee = async (employee, setErrors) => {
    if(imageUpload !== null){
    const fileName = `images/${imageUpload.name + v4()}`;
    const imageRef = ref(storage, fileName);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        try {
          await crateEmployee({
            ...employee,
            image: url,
          })
              .then(() => {
                navigate("/dashboard/employee");
              })
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Tạo mới thành công !",
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    icon: "icon-post",
                  },
                });
              });
        } catch (err) {
          if (err.response.data) {
            setErrors(err.response.data);
          }
        }
      });
    });
    }else {
      try {
      await crateEmployee({
        ...employee,
        image:"https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg?fit=512%2C20000&quality=95&ssl=1"
      }).then(() => {
        navigate("/dashboard/employee");
      })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Tạo mới thành công !",
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                icon: "icon-post",
              },
            });
          });
      } catch (err) {
        if (err.response.data) {
          setErrors(err.response.data);
        }
      }
    }
  };
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 3000000) {
      Swal.fire({
        icon: "error",
        title: "Dung lượng ảnh tối đa 3MB",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          icon: "icon-post",
        },
      });
      return;
    }
    setImageUpload(file);
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      imgPreviewRef.current.src = reader.result;
      imgPreviewRef.current.style.display = "block";
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    document.title = "RetroCare - Thêm mới nhân viên";
    loadNewEmployee();
  }, []);

  const loadNewEmployee = async () => {
    const newEmployee = await getNewEmployee();
    setEmployee(newEmployee.data);
  };
  if (employee === undefined) {
    return null;
  }
  return (
    <Formik
      initialValues={{
        codeEmployee: employee?.codeEmployee,
        nameEmployee: "",
        address: "",
        image: "",
        phoneNumber: "",
        startDay: "",
        birthday: "",
        idCard: "",
        note: "",
        appUser: "",
      }}
      validationSchema={Yup.object({
        nameEmployee: Yup.string()
          .required("Vui lòng nhập tên nhân viên.")
          .max(100, "Vui lòng nhập dưới 100 kí tự.")
          .matches(
            /^[\p{L}\s]+$/u,
            "Tên nhân viên chỉ được chứa chữ cái và khoảng trắng."),
        address: Yup.string()
          .required("Vui lòng nhập địa chỉ.")
          .max(100, "Vui lòng nhập dưới 100 kí tự.")
            .matches(/^[\p{L}\p{N}\s]+$/u,"Địa chỉ chỉ chứa số, chữ và dấu '/'"),
        phoneNumber: Yup.string()
          .required("Vui lòng nhập số điện thoại.")
          .min(10, "Vui lòng chỉ nhập từ 10 đến 11 số.")
          .max(11, "Vui lòng chỉ nhập từ 10 đến 11 số.")
          .matches(
            /^0\d{9,10}$/u,
            "Số điện thoại phải đúng định dạng 0XXXXXXXXX"),
        startDay: Yup.date().required("Vui lòng nhập ngày bắt đầu làm.."),
        birthday: Yup.string()
          .required("Vui lòng nhập ngày sinh.")
          .test("age", "Nhân viên chưa đủ 18 tuổi.", function (value) {
            const currentDate = new Date();
            const selectedDate = parse(value, "yyyy-MM-dd", new Date());
            const age = differenceInYears(currentDate, selectedDate);
            return age >= 18;
          }),
        idCard: Yup.string()
          .required("Vui lòng nhập CCCD hoặc CMND.")
          .max(12, "Vui lòng nhập từ 12 kí tự trở xuống.")
          .matches(
            /^\d{9}(\d{3})?$/u,
            "Vui lòng chỉ nhập số và độ dài là 9 hoặc 12."),
        appUser: Yup.string().required("Vui lòng nhập tên tài khoản.")
            .max(30,"Vui lòng nhập dưới 30 kí tự")
            .matches(/^[0-9a-zA-Z]+$/u,"Tên tài khoản chỉ chứa chữ và số"),
        note: Yup.string().max(100,"Vui lòng nhập note dưới 100 kí tự")
      })}
      onSubmit={(value, { setErrors }) => {
        let timerInterval;
        Swal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        saveEmployee(value, setErrors);
      }}
    >
      <Form>
        <div className="container">
          <div className="row ">
            <div className="col-4  d-flex justify-content-center align-items-center">
              <img
                src={employee.image}
                ref={imgPreviewRef}
                width="400"
                height="600"
                style={{
                  borderRadius: "50px",
                  objectFit: "cover",
                  border: "1px solid black",
                }}
              />
            </div>
            <div className="col-8  d-flex justify-content-center ">
              <fieldset className=" shadow" style={{width: '590px',
                height: 'auto',
                border: '1px solid #000000',
                padding: '20px',
                borderRadius: '20px',
                backgroundColor: '#F8F9Fa'}}>
                <legend className="float-none w-auto px-3">
                  <h2>Thông tin nhân viên</h2>
                </legend>
                <div className="row">
                  <div className="col-3 p-2">
                    <label style={{ fontWeight:"bold"}}>Mã nhân viên</label>
                  </div>
                  <div className="col-9">
                    <Field
                      disable
                      name="codeEmployee"
                      className="text-black-50 form-control mt-2 "
                      type="text"
                    />
                  </div>
                  <div className="col-3 p-2">
                    <label style={{ fontWeight:"bold"}}>
                      Tên nhân viên <sup style={{color:"red"}}>*</sup>
                    </label>
                  </div>
                  <div className="col-9">
                    <Field
                      name="nameEmployee"
                      className="form-control border border-dark mt-2"
                      type="text"
                    />
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                        name="nameEmployee"
                        style={{ color: "red", marginLeft: "20px" }}
                        component={"small"}
                      />
                    </div>
                  </div>
                  <div className="col-3 p-2">
                    <label style={{ fontWeight:"bold"}}>
                      Địa chỉ <sup style={{color:"red"}}>*</sup>
                    </label>
                  </div>
                  <div className="col-9">
                    <Field
                      name="address"
                      className="form-control border border-dark mt-2"
                      type="text"
                    />
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                        name="address"
                        style={{ color: "red", marginLeft: "20px" }}
                        component={"small"}
                      />
                    </div>
                  </div>
                  <div className="col-3 p-2">
                    <label style={{ fontWeight:"bold"}}>
                      Số điện thoại <sup style={{color:"red"}}>*</sup>
                    </label>
                  </div>
                  <div className="col-9">
                    <Field
                      name="phoneNumber"
                      className="form-control border border-dark mt-2"
                      type="text"
                    />
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                        name="phoneNumber"
                        style={{ color: "red", marginLeft: "20px" }}
                        component={"small"}
                      />
                    </div>
                  </div>
                  <div className="col-3 p-2">
                    <label style={{ fontWeight:"bold"}}>
                      Tên tài khoản <sup style={{color:"red"}}>*</sup>
                    </label>
                  </div>
                  <div className="col-9">
                    <Field
                      name="appUser"
                      className="form-control border border-dark mt-2"
                      type="text"
                    />
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                        name="appUser"
                        style={{ color: "red", marginLeft: "20px" }}
                        component={"small"}
                      />
                    </div>
                  </div>
                  <div className="col-3 p-2">
                    <label style={{ fontWeight:"bold"}}>
                      Ngày vào làm <sup style={{color:"red"}}>*</sup>
                    </label>
                  </div>
                  <div className="col-9">
                    <Field
                      name="startDay"
                      className="form-control border border-dark mt-2"
                      type="date"
                    />
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                        name="startDay"
                        style={{ color: "red", marginLeft: "20px" }}
                        component={"small"}
                      />
                    </div>
                  </div>
                  <div className="col-3  p-2">
                    <label style={{ fontWeight:"bold"}}>
                      Ngày sinh <sup style={{color:"red"}}>*</sup>
                    </label>
                  </div>
                  <div className="col-9">
                    <Field
                      name="birthday"
                      className="form-control border border-dark mt-2"
                      type="date"
                    />
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                        name="birthday"
                        style={{ color: "red", marginLeft: "20px" }}
                        component={"small"}
                      />
                    </div>
                  </div>

                    <div className="col-3 p-2">
                      <label style={{ fontWeight:"bold"}}>
                        CCCD/CMND <sup style={{color:"red"}}>*</sup>
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                          name="idCard"
                          className="form-control border border-dark mt-2"
                          type="text"
                      />
                      <div style={{ height: "16px" }}>
                        <ErrorMessage
                            name="idCard"
                            style={{ color: "red", marginLeft: "20px" }}
                            component={"small"}
                        />
                      </div>
                    </div>
                    {/*<div className="col-3 p-2">*/}
                    {/*    <label style={{ fontWeight:"bold"}}>Chức vụ <sup style={{color:"red"}}>*</sup></label>*/}
                    {/*</div>*/}
                    {/*<div className="col-9">*/}
                    {/*    <select  className="form-select border border-dark mt-2">*/}
                    {/*        <option value="1">Nhân viên</option>*/}
                    {/*        <option value="2">Quản lý</option>*/}
                    {/*    </select>*/}
                    {/*    /!*<div style={{height: '16px'}}>*!/*/}
                    {/*    /!*    <small style={{color: 'red',marginLeft: '20px'}}>error</small>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}
                    <div className="col-3 p-2">
                      <label style={{ fontWeight:"bold"}}>Ảnh nhân viên</label>
                    </div>
                    <div className="col-9">
                      <div className="input-group mt-2 ">
                        <Field
                            type="file"
                            class="form-control"
                            aria-describedby="inputGroupFileAddon03"
                            aria-label="Upload"
                            accept="image/png, image/gif, image/jpeg"
                            ref={inputFileRef}
                            onChange={handleInputChange}
                            name="image"
                        />
                      </div>
                    </div>
                    <div className="form-floating  mt-2">
                      <Field
                          as="textarea"
                          name="note"
                          className="form-control border border-dark"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                      />
                      <label htmlFor="floatingTextarea">Note</label>
                    </div>
                    <div style={{ height: "16px" }}>
                      <ErrorMessage
                          name="image"
                          style={{ color: "red", marginLeft: "20px" }}
                          component={"small"}
                      />
                    </div>
                    <div className="col-4 p-2 mt-3">
                    <span>
                      (<span style={{ color: "red" }}>*</span>) Thông tin bắt
                      buộc
                    </span>
                    </div>
                    <div className="col-8 mt-3">
                      <div>
                        <Link to={"/dashboard/employee"}>
                          <button className="btn btn-outline-secondary float-end  mx-1 mt-2 shadow">
                            <i className="fa-solid fa-rotate-left"></i> Trở về
                          </button>
                        </Link>
                        <button type="reset" className="btn btn-outline-primary float-end mx-1 mt-2 shadow">
                          <i className="fa-solid fa-rotate-right"></i>
                          Làm mới
                        </button>
                        <button
                            type={"submit"}
                            className="btn btn-outline-primary float-end mx-1 mt-2 shadow"
                        >
                          <i className="fa-solid fa-plus"></i> Thêm Mới
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
  );
};

export default CreationEmployee;
