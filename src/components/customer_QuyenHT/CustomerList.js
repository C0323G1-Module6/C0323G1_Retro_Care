import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import date from 'date-and-time';

function CustomerList() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    return (
        <div className='container'>

    <h1 style="text-align: center; color: #0d6efd" class="m-4">DANH SÁCH KHÁCH HÀNG</h1>
    {/* <!----------------------------------------- Searching Bar--------------------------------------> */}
    <div className="row m-3" style="display: flex">
        <div className="col-7 col-search">
            <label className="m-1">Lọc theo: </label>
            <div className="btn-group">
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="true">
                    Mã khách hàng
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Nhóm khách hàng</a></li>
                    <li><a className="dropdown-item" href="#">Tên khách hàng</a></li>
                    <li><a className="dropdown-item" href="#">Địa chỉ</a></li>
                    <li><a className="dropdown-item" href="#">Số điện thoại</a></li>
                </ul>
            </div>
            <input
                    style="width: 250px; border-radius: 5px; padding: 5px; border: 1px black solid"
                    placeholder="Tìm kiếm khách hàng" className="bg-white align-middle appearance-none"/>
            <button className="btn btn-outline-primary" style="margin-right: auto;width: auto;margin-left: 5px">
                <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
        </div>
        <div className="col-5 d-flex align-items-center justify-content-end">
            <label className="m-1">Sắp xếp: </label>
            <div className="btn-group">
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="true">
                    Mã khách hàng
                </button>
                <ul class="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Nhóm khách hàng</a></li>
                    <li><a className="dropdown-item" href="#">Tên khách hàng</a></li>
                </ul>
            </div>
        </div>
    </div>
    {/* <!----------------------------------------  Display List -------------------------------------------> */}
    <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
        <table className="table table-hover w-100 leading-normal overflow-hidden rounded-3" id="myTable">
            <thead>
            <tr style="background: #0d6efd; color: #ffffff" contenteditable="true">
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">STT</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider"> Mã khách hàng</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">Tên khách hàng</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">Ngày sinh</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">Địa chỉ</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">Số điện thoại</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">Nhóm khách hàng</th>
                <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">Ghi chú</th>
            </tr>
            </thead>
            <tbody className="bg-light">
            <tr>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">1</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">KLE</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Khách lẻ</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm"></td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm"></td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm"></td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Khách lẻ</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm"></td>
            </tr>
            <tr>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">2</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">KS10001</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Trần A</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">01/01/1991</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Hòa Hải, Đà Nẵng</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">0913179222</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Khách online</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Xem thêm</td>
            </tr>
            <tr>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">3</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">KS10001</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Trần E</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">01/02/1991</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Hòa Hải, Đà Nẵng</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">0913179222</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Khách online</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Xem thêm</td>
            </tr>
            <tr>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">4</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">KS10001</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Trần B</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">01/03/1991</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Hòa Hải, Đà Nẵng</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">0913179222</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Khách sỉ</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Xem thêm</td>
            </tr>
            <tr>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">5</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">KS10001</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Trần C</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">01/04/1991</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Hòa Hải, Đà Nẵng</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">0913179222</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Khách lẻ</td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">Xem thêm</td>
            </tr>
            </tbody>
        </table>
        </div>
        {/* <!------------------------------------------------- Pagination ------------------------------------------------> */}
        <div className="justify-content-center d-flex rounded-bottom m-1">
            <button className="btn btn-primary" style="margin: 5px">
                <i className="fa-solid fa-angles-left"></i>
            </button>
            <div className="text-sm py-2 px-4"
                 style="background:#0d6efd;color: #ffffff;margin: 5px; border-radius: 5px">
                1/5
            </div>
            <button className="btn btn-primary" style="margin: 5px">
                <i className="fa-solid fa-angles-right"></i>
            </button>
        </div>
        {/* <!---------------------------------------------------- Function Bar -------------------------------------------------> */}
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
    )

}
export default CustomerList;