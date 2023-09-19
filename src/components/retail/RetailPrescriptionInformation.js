import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



export default function RetailPrescriptionInfomation() {
    return(
        <>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
    <fieldset className="border border-dark rounded-3 p-3 w-50" style={{backgroundColor: '#F8F9FA'}}>
        <legend className="float-none w-auto px-3">Thông tin đơn thuốc</legend>
        <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Tên đơn thuốc</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" value="Đơn thuốc ho" readonly/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Triệu chứng</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" readonly value="Sổ mũi, ho, nhức đầu"/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Đối tượng</label>
            <div className="col-sm-4">
                <select className="form-select" aria-label="Default select example">
                    <option value="1">Trẻ em</option>
                    <option value="2">Người lớn</option>
                    <option value="3">Phụ nữ mang thai</option>
                </select>
            </div>
            <label className="col-sm-3 col-form-label">Số ngày uống </label>
            <div className="col-sm-2">
                <input type="number" className="form-control" />
            </div>
        </div>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-10">
            <fieldset className="border border-dark rounded-3 p-3 w-100">
                <legend className="float-none w-auto px-3">Chỉ định</legend>
               
                <div className="mb-3 row d-flex align-items-center justify-content-start">
                    <label className="col-sm-1 col-form-label">1.</label>
                    <div className="col-sm-5">
                        <input className="form-control" value="Thuốc ho 1" readonly />
                    </div>
                    <label className="col-sm-2 col-form-label">Số viên</label>
                    <div className="col-sm-2">
                        <input readonly className="form-control" value="2" />
                    </div>

                    <div className="col-sm-2">
                        <a
                                href="#"
                                type="button"
                                id="delRow"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                title="Xóa"
                                className="btn btn-outline-primary"
                                
                        >
                            <i className="fa-solid fa-trash"></i> Xoá
                        </a>
                    </div>
                </div>
                <div className="mb-3 row d-flex align-items-center justify-content-start">
                    <div className="col-sm-1">&nbsp;</div>
                    <label className="col-sm-3 col-form-label">Ngày uống: </label>
                    <div className="col-sm-2">
                        <input  className="form-control" readonly value="1" />
                    </div>
                    <label className="col-sm-1 col-form-label">lần,</label>
                    <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                    <div className="col-sm-2">
                        <input  className="form-control" readonly value="2" />
                    </div>
                    <label className="col-sm-1 col-form-label">viên</label>
                </div>
                
                <div className="mb-3 row d-flex align-items-center justify-content-start">
                    <label className="col-sm-1 col-form-label">2.</label>
                    <div className="col-sm-5">
                        <input className="form-control" value="Thuốc ho 2" readonly />
                    </div>
                    <label className="col-sm-2 col-form-label">Số viên</label>
                    <div className="col-sm-2">
                        <input readonly className="form-control" value="3" />
                    </div>

                    <div className="col-sm-2">
                        <a
                                href="#"
                                type="button"
                                id="delRow"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                title="Xóa"
                                className="btn btn-outline-primary"
                            
                    
                        >
                            <i className="fa-solid fa-trash"></i> Xoá
                        </a>
                    </div>
                </div>
                <div className="mb-3 row d-flex align-items-center justify-content-start">
                    <div className="col-sm-1">&nbsp;</div>
                    <label className="col-sm-3 col-form-label">Ngày uống: </label>
                    <div className="col-sm-2">
                        <input  className="form-control" readonly value="1" />
                    </div>
                    <label className="col-sm-1 col-form-label">lần,</label>
                    <label className="col-sm-2 col-form-label">Mỗi lần: </label>
                    <div className="col-sm-2">
                        <input  className="form-control" readonly value="1" />
                    </div>
                    <label className="col-sm-1 col-form-label">viên</label>
                </div>
               




            </fieldset>
            <a  className="btn btn-outline-primary">Thêm vào hóa đơn</a>
            <a  className="btn btn-outline-primary">In toa</a>
            <a href="VuNL_RetailPrescriptionList.html" className="btn btn-outline-primary"><i className="fa-regular fa-circle-left"></i>Huỷ</a>
        </div>
    </fieldset>
</div>

<div
        className="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
>
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteModalLabel">
                    Xóa thuốc
                </h1>
                <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">Bạn có muốn xóa thuốc này không?</div>
            <div className="modal-footer">
                <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                >
                    Không
                </button>
                <button
                        type="button"
                        className="btn btn-primary"
                        id="deleteConfirm"
                        data-bs-dismiss="modal"
                >
                    Có
                </button>
            </div>
        </div>
    </div>
</div>
</>
    )
}