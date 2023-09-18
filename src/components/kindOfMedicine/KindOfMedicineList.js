import React from 'react';
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
    AiOutlineRollback,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from "react-icons/ai";

function KindOfMedicineList(props) {
    return (
        <div>
            <div className="container">
                <div className="">
                    <div className="table-wrapper">
                        {/* tittle */}
                        <div className="table-tittle p-3">
                            <div className="row">
                                <div className="text-center">
                                    <h1 style={{ color: "#0D6EFD" }}>DANH SÁCH NHÓM THUỐC</h1>
                                </div>
                            </div>
                        </div>
                        {/* search */}
                        <div className="d-flex gap-3 my-3">
                            <input
                                style={{ width: 250, borderRadius: 5 }}
                                className="form-control"
                            />
                            <button className="btn btn-outline-primary" style={{ width: 120 }}>
                                <i className="fa-solid fa-magnifying-glass" />
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="rounded-3 shadow-lg">
                        {/* table */}
                        <table className="table table-responsive table-hover ">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã nhóm thuốc</th>
                                    <th>Tên nhóm thuốc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>BG-01</td>
                                    <td>Bổ gan</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>BM-02</td>
                                    <td>Bổ máu</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>BP-03</td>
                                    <td>Bổ phổi</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>BT-04</td>
                                    <td>Bổ tim</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>BT-05</td>
                                    <td>Bổ tim</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* pagination */}
                        <div className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="justify-content-center d-flex">
                                <button className="btn btn-primary" style={{ margin: 5 }}>
                                    <AiOutlineDoubleLeft />
                                </button>
                                <div
                                    className="text-sm py-2 px-4"
                                    style={{
                                        background: "#0d6efd",
                                        color: "#ffffff",
                                        margin: 5,
                                        borderRadius: 5
                                    }}
                                >
                                    1/5
                                </div>
                                <button className="btn btn-primary" style={{ margin: 5 }}>
                                    <AiOutlineDoubleRight />
                                </button>
                                <div
                                    className="rounded-lg"
                                    style={{
                                        background: "#0d6efd",
                                        color: "black",
                                        margin: 5,
                                        borderRadius: 5
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* fieldset */}
                    <div className="row justify-content-center m-3 h-10">
                        <fieldset className="col-12 border border-dark rounded-3 p-3  d-flex justify-content-center table-responsive">
                            {/* mã thuốc */}
                            <div className=" m-5">
                                <label id="pharmacyCode" htmlFor="" className="form-label">
                                    Mã nhóm thuốc
                                </label>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="form-control"
                                    placeholder=""
                                    aria-describedby="helpId"
                                />
                            </div>
                            {/* nhóm thuốc */}
                            <div className=" m-5">
                                <label id="pharmacyName" htmlFor="" className="form-label">
                                    Tên nhóm thuốc
                                </label>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="form-control"
                                    placeholder=""
                                    aria-describedby="helpId"
                                />
                            </div>
                            <legend className="float-none w-auto px-3">Thông tin thuốc</legend>
                        </fieldset>
                    </div>
                    {/* action */}
                    <div className="d-flex align-items-center justify-content-end gap-3">
                        {/* add */}
                        <button className="btn btn-outline-primary" onclick="add()">
                            <FaPlus className="mx-1" />
                            Thêm mới
                        </button>
                        {/* edit */}
                        <button className="btn btn-outline-primary">
                            <FiEdit className="mx-1" />
                            Sửa
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onclick="clear()"
                        >
                            <i className="fa-solid fa-trash" />
                            Xoá
                        </button>
                        <a className="btn btn-outline-primary" href="/HuyL_home.html">
                            <AiOutlineRollback className="mx-1" />
                            Trở về
                        </a>
                    </div>
                    {/* MOdal action */}
                    <div className="modal fade" id="exampleModal" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Xác nhận xoá nhóm thuốc</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <p>Bạn có chắc muốn xoá nhóm thuốc không.</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Huỷ xoá
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        Xoá
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div class=" col-8 m-2 d-flex table-responsive  ">
    
        
   
      </div> */}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default KindOfMedicineList;