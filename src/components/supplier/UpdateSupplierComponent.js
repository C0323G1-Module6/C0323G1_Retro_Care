import React from "react";
import '../../css/supplier/ThanhVH_Supplier.css';
import { Link } from "react-router-dom";

function UpdateSupplierComponent() {
   return (
    <div id="ThanhVH">
    <meta charSet="UTF-8" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
 
    <div className="d-flex justify-content-center">
      <form style={{marginTop: '33px'}}>
        <fieldset className="form-input shadow">
          <legend className="float-none w-auto px-3">
            <h2>Thay đổi thông tin nhà cung cấp</h2>
          </legend>
          <div className="row p-2">
            <div className="col-4 p-2">
              <label>Mã nhà cung cấp <span style={{color: 'red'}}>*</span> </label>
            </div>
            <div className="col-8">
              <input className="form-control mt-2 border border-dark" type="text" required />
              <small className="p-3 mb-2 text-danger"> </small>
            </div>
            <div className="col-4 p-2">
              <label>Tên nhà cung cấp<span style={{color: 'red'}}>*</span> </label>
            </div>
            <div className="col-8">
              <input className="form-control mt-2 border border-dark" type="text" required />
              <small className="p-3 mb-2 text-danger" />
            </div>
            <div className="col-4 p-2">
              <label>Số điện thoại <span style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-8">
              <input className="form-control mt-2 border border-dark" type="text" pattern="[0-9]{11}" title="Không được nhập chữ và tối đa 11 số" required />
              <small className="p-3 mb-2 text-danger" />
            </div>
            <div className="col-4 p-2">
              <label>Địa chỉ </label>
            </div>
            <div className="col-8">
              <input className="form-control mt-2 border border-dark" type="text  " required />
              <small className="p-3 mb-2 text-danger" />
            </div>
            <div className="col-4 p-2">
              <label>Email <span style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-8">
              <input className="form-control mt-2 border border-dark" type="email" required />
              <small className="p-3 mb-2 text-danger" />
            </div>
            <div className="col-4 p-2">
              <label>Ghi chú </label>
            </div>
            <div className="col-8">
              <textarea className="form-control mt-2 border border-dark" type="text" rows={5} defaultValue={""} />
            </div>
            <div className="col-4 p-2 mt-3">
              <div className="float-start">
                <small className="text-danger">(*)</small> Thông tin bắt buộc
              </div>
            </div>
            <div className="col-8 mt-3">
              <Link to={`/supplier`} className="btn btn-outline-secondary  float-end mx-1 mt-2 shadow"><i className="fa-solid fa-rotate-left" />Trở về</Link>
              <button className="btn btn-outline-primary float-end mx-1 mt-2 shadow">
                Thay đổi
              </button>
            </div>
          </div>
        </fieldset>
        <div className="form-btn" />
      </form>
    </div>
  </div>
   )
}
export default UpdateSupplierComponent;