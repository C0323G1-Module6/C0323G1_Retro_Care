import React, { useEffect, useState } from "react";
import '../../css/supplier/ThanhVH_Supplier.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSupplierById, updateSupplierById } from "../../services/supplier/SupplierService";
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';


function UpdateSupplierComponent() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({});
  const { idSupplier } = useParams();


  const getSupplier = async () => {
    const data = await getSupplierById(idSupplier);
    setSupplier(data);
  }

  useEffect(() => {
    getSupplier()
  }, [idSupplier])

  console.log(supplier.code);
  return (
    <>
      {supplier.id &&
        <div id="ThanhVH">
          <meta charSet="UTF-8" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
          <div className="d-flex justify-content-center">
            <Formik
              initialValues={{
                code: supplier.code,
                name: supplier.name,
                email: supplier.email,
                address: supplier.address,
                phoneNumber: supplier.phoneNumber,
                note: supplier.note,
              }}
              validationSchema={yup.object({
                code: yup.string()
                  .required("Không được để trống trường này")
                  .min(3, "Mã nhà cung cấp tối thiểu 3 ký tự và tối đa 30 ký tự")
                  .max(30, "Mã nhà cung cấp tối thiểu 3 ký tự và tối đa 30 ký tự")
                  .matches(/^(?!.*[^A-Z])(?!.*\s)[A-Z]{3,30}$/, "Các ký tự được viết hoa,không có khoảng trắng,không có ký tự đặc biệt vd: NUTINE"),
                name: yup.string()
                  .required("Không được để trống trường này")
                  .min(3, "Tên nhà cung cấp tối thiểu 3 ký tự và tối đa 100 ký tự")
                  .max(100, "Tên nhà cung cấp thiểu 3 ký tự và tối đa 100 ký tự")
                  .required(/^[\p{Lu}][\p{Ll}]*([\s][\p{Lu}][\p{Ll}]*)*$/, "Vui lòng viết hoa chữ cái đầu của từng từ và có khoảng trắng giữa các từ, vd: Dược Phẩm Pharmacity"),
                email: yup.string()
                  .required("Không được để trống trường này")
                  .min(12, "Email tối thiểu 12 ký tự và tối đa 50 ký tự")
                  .max(50, "Email tối thiểu 12 ký tự và tối đa 50 ký tự")
                  .required(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Vui lòng nhập theo định dạng: xxx@xxx.xxx với x không phải là ký tự đặc biệt"),
                address: yup.string()
                  .required("Không được để trống trường này")
                  .min(5, "Địa chỉ tối thiểu 5 ký tự và tối đa 150 ký tự")
                  .max(150, "Địa chỉ tối thiểu 5 ký tự và tối đa 150 ký tự"),
                phoneNumber: yup.string()
                  .required("Không được để trống trường này")
                  .min(10, "Số điện thoại vui lòng nhập 10 chữ số")
                  .max(10, "Số điện thoại vui lòng nhập 10 chữ số")
                  .matches(/^0[0-9]{9}$/, "Vui lòng nhập theo định dạng 0xxxxxxxxx với x là ký tự số")

              })}
              onSubmit={async (supplier) => {
                const newSupplier = {
                  ...supplier
                }
                console.log(newSupplier);
                updateSupplierById(idSupplier, newSupplier).then(() => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Thay đổi thành công',
                    timer: 2000
                  }).then(() => {
                    navigate('/supplier')
                  })
                })
              }
              }>
              <Form style={{ marginTop: '33px' }}>
                <fieldset className="form-input shadow">
                  <legend className="float-none w-auto px-3">
                    <h2>Thay đổi thông tin nhà cung cấp</h2>
                  </legend>
                  <div className="row p-2">
                    <div className="col-4 p-2">
                      <label>Mã nhà cung cấp <span style={{ color: 'red' }}>*</span> </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" name='code' type="text" />
                      <ErrorMessage className="p-3 mb-2 text-danger" name='code' component='div'> </ErrorMessage>
                    </div>
                    <div className="col-4 p-2">
                      <label>Tên nhà cung cấp<span style={{ color: 'red' }}>*</span> </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" name='name' type="text" />
                      <ErrorMessage className="p-3 mb-2 text-danger" name='name' component='div' />
                    </div>
                    <div className="col-4 p-2">
                      <label>Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" type="text" name='phoneNumber' />
                      <ErrorMessage className="p-3 mb-2 text-danger" name='phoneNumber' component={'div'} />
                    </div>
                    <div className="col-4 p-2">
                      <label>Địa chỉ </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" type="text" name='address' />
                      <ErrorMessage className="p-3 mb-2 text-danger" name='address' component={'div'} />
                    </div>
                    <div className="col-4 p-2">
                      <label>Email <span style={{ color: 'red' }}>*</span></label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" type="email" name='email' />
                      <ErrorMessage className="p-3 mb-2 text-danger" name='email' component={'div'} />
                    </div>
                    <div className="col-4 p-2">
                      <label>Ghi chú </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" as="textarea" name='note' />
                    </div>
                    <div className="col-4 p-2 mt-3">
                      <div className="float-start">
                        <small className="text-danger">(*)</small> Thông tin bắt buộc
                      </div>
                    </div>
                    <div className="col-8 mt-3">
                      <Link to={`/supplier`} type="button" className="btn btn-outline-secondary  float-end mx-1 mt-2 shadow"><i className="fa-solid fa-rotate-left" />Trở về</Link>
                      <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow" type="submit">
                        Thay đổi
                      </button>
                    </div>
                  </div>
                </fieldset>
                <div className="form-btn" />
              </Form>
            </Formik>
          </div>
        </div>
      }
    </>
  )
}
export default UpdateSupplierComponent;