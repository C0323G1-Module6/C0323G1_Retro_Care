import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
  AiOutlineRollback,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "#0d6efd" }} className="m-4">
        DANH SÁCH KHÁCH HÀNG
      </h1>
      <div className="row m-3" style={{ display: "flex" }}>
        <div className="col-7 col-search">
          <label className="m-1">Lọc theo: </label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              Mã khách hàng
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Nhóm khách hàng
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Tên khách hàng
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Địa chỉ
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Số điện thoại
                </a>
              </li>
            </ul>
          </div>
          <input
            style={{
              width: 250,
              borderRadius: 5,
              padding: 5,
              border: "1px black solid",
            }}
            placeholder="Tìm kiếm khách hàng"
            className="bg-white align-middle appearance-none"
          />
          <button
            className="btn btn-outline-primary"
            style={{ marginRight: "auto", width: "auto", marginLeft: 5 }}
          >
            <i className="fa-solid fa-magnifying-glass" /> Tìm kiếm
          </button>
        </div>
        <div className="col-5 d-flex align-items-center justify-content-end">
          <label className="m-1">Sắp xếp: </label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              Mã khách hàng
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Nhóm khách hàng
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Tên khách hàng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
        <table
          className="table table-hover w-100 leading-normal overflow-hidden rounded-3 m-0"
          id="myTable"
        >
          <thead>
            <tr
              style={{ background: "#0d6efd", color: "#ffffff" }}
              contentEditable="true"
            >
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                STT
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Mã khách hàng
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Tên khách hàng
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Ngày sinh
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Địa chỉ
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Số điện thoại
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Nhóm khách hàng
              </th>
              <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody className="bg-light">
            <tr>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                1
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                KLE
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                Khách lẻ
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm" />
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm" />
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm" />
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                Khách lẻ
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm" />
            </tr>
            <tr>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                2
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                KS10001
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                Trần A
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                01/01/1991
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                Hòa Hải, Đà Nẵng
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                0913179222
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                Khách online
              </td>
              <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                Xem thêm
              </td>
            </tr>
          </tbody>
        </table>
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
                borderRadius: 5,
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
                borderRadius: 5,
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end gap-3">
        <a
          className="btn btn-outline-primary"
          href="ThanhKN_CreatePrescription.html"
        >
          <FaPlus className="mx-1" />
          Thêm mới
        </a>
        <a
          className="btn btn-outline-primary"
          href="ThanhKN_EditPrescription.html"
        >
          <FiEdit className="mx-1" />
          Sửa
        </a>
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <FaRegTrashAlt className="mx-1" />
          Xoá
        </button>
        <a className="btn btn-outline-primary" href="/HuyL_home.html">
          <AiOutlineRollback className="mx-1" />
          Trở về
        </a>
      </div>
    </div>
  );
}
export default CustomerList;
