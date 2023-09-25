import React, { useEffect, useState } from "react";
import '../../css/supplier/ThanhVH_Supplier.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSupplierById, updateSupplierById } from "../../services/supplier/SupplierService";
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';
import XRegExp from 'xregexp';
import { FiEdit } from "react-icons/fi";
import { AiOutlineRollback } from "react-icons/ai";


function UpdateSupplierComponent() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({});
  const { idSupplier } = useParams();


  const getSupplier = async () => {
     try {
        const result = await getSupplierById(idSupplier);
        setSupplier(result);
     }catch (e) {
        if(e.response.status === 400 || e.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi kết nối',
            text:'Không tìm thấy nhà cung cấp',
            showConfirmButton: false,
            timer: 1500
          });
        }
        navigate("/dashboard/supplier");
     }
  }
  const handleSubmit = async (value,setErrors) => {
    try {
      await updateSupplierById(idSupplier,value);
      Swal.fire(
        {
          icon:'success',
          title:'Thay đổi thành công',
          timer:2000,
          showCancelButton:true,
          showConfirmButton:false
        }
      ).then(() => {navigate("/dashboard/supplier")});
    } catch (err) {
      if (err.response.data) {
        setErrors(err.response.data);
      }
      if (err.response.status === 500) {
        setErrors(err.response.data);
      }
    }
  };
  useEffect(() => {
    document.title = 'RetroCare - Chỉnh sửa nhà cung cấp'
    getSupplier()
  }, [idSupplier])

  return (
    <>
      {supplier.id &&
        <div id="ThanhVH">
          <meta charSet="UTF-8" />
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
                  .required("Không được để trống trường này.")
                  .min(3, "Mã nhà cung cấp tối thiểu 3 ký tự.")
                  .max(30, "Mã nhà cung cấp tối đa 30 ký tự.")
                  .matches(/^(?!.*[^A-Z])(?!.*\s)[A-Z]{3,30}$/, "Nhập sai định dạng vd: NUTINE."),
                name: yup.string()
                  .required("Không được để trống trường này.")
                  .min(3, "Tên nhà cung cấp tối thiểu 3 ký tự.")
                  .max(100, "Tên nhà cung cấp tối đa 100 ký tự.")
                  .matches(XRegExp('^\\p{Lu}\\p{Ll}*([\\s]\\p{Lu}\\p{Ll}*)*$'),"Nhập sai định dạng vd: Dược Phẩm Pharmacity."),
                email: yup.string()
                  .required("Không được để trống trường này.")
                  .min(12, "Email tối thiểu 12 ký tự.")
                  .max(50, "Email tối đa 50 ký tự.")
                  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Nhập sai định dạng: xxx@xxx.xxx với x không phải là ký tự đặc biệt."),
                address: yup.string()
                  .required("Không được để trống trường này.")
                  .min(5, "Địa chỉ tối thiểu 5 ký tự.")
                  .max(150, "Địa chỉ tối đa 150 ký tự"),
                phoneNumber: yup.string()
                  .required("Không được để trống trường này.")
                  .min(10, "Số điện thoại vui lòng nhập 10 chữ số.")
                  .max(10, "Số điện thoại vui lòng nhập 10 chữ số.")
                  .matches(/^0[0-9]{9}$/, "Vui lòng nhập theo định dạng 0xxxxxxxxx với x là ký tự số.")

              })}
              onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}

              >
              <Form style={{ marginTop: '33px' }}>
                <fieldset className="form-input shadow">
                  <legend className="float-none w-auto px-3">
                    <h2>Thay đổi thông tin nhà cung cấp</h2>
                  </legend>
                  <div className="row p-2">
                  <div className="col-4 p-4" style={{marginTop:'-10px'}}>
                      <label>Mã nhà cung cấp <span style={{ color: 'red' }}>*</span> </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" name='code' disabled type="text" />
                      <ErrorMessage className="text-danger" name='code' component='div'> </ErrorMessage>
                    </div>
                    <div className="col-4 p-4" style={{marginTop:'-10px'}}>
                      <label>Tên nhà cung cấp<span style={{ color: 'red' }}>*</span> </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" name="name" type="text" />
                      <div style={{height: '40px'}}>
                      <ErrorMessage className="text-danger" name="name" component='div' />
                      </div>
                    </div>
                    <div className="col-4 p-4" style={{marginTop:'-10px'}}>
                      <label>Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" type="text" name='phoneNumber' />
                      <div style={{height: '40px'}}>
                      <ErrorMessage className=" text-danger" name='phoneNumber' component={'div'} />
                      </div>
                    </div>
                    <div className="col-4 p-4" style={{marginTop:'-10px'}}>
                      <label>Địa chỉ </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" type="text" name='address' />
                      <div style={{height: '30px'}}>
                      <ErrorMessage className=" text-danger" name='address' component={'div'} />
                      </div>
                    </div>
                    <div className="col-4 p-4" style={{marginTop:'-10px'}}>
                      <label>Email <span style={{ color: 'red' }}>*</span></label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" type="email" name='email' />
                      <div style={{height: '40px'}}>
                      <ErrorMessage className="text-danger" name='email' component={'div'} />
                      </div>
                    </div>
                    <div className="col-4 p-4" style={{marginTop:'-10px'}}>
                      <label>Ghi chú </label>
                    </div>
                    <div className="col-8">
                      <Field className="form-control mt-2 border border-dark" as="textarea" name='note' style={{height:'100px'}} />
                    </div>
                    <div className="col-4 p-2 mt-3">
                      <div className="float-start">
                        <small className="text-danger">(*)</small> Thông tin bắt buộc
                      </div>
                    </div>
                    <div className="col-8 mt-3">
                      <Link to={`/dashboard/supplier`} type="button" className="btn btn-outline-secondary  float-end mx-1 mt-2 shadow"><AiOutlineRollback />Trở về</Link>
                      <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow" type="submit">
                      <FiEdit className="mx-1" /> Hoàn thành
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