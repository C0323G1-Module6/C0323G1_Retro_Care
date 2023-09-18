import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../../img/logo.jpg";
import { BiMenu, BiSolidReport, BiSolidTruck, BiLogOut } from "react-icons/bi";
import { AiOutlineAreaChart } from "react-icons/ai";
import { GiMedicines, GiHumanTarget } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-details">
          <div className="logo_name">
            <img src={logo} width={160} height={30} alt="Logo" />
          </div>
          <BiMenu
            color="white"
            size={30}
            id="btn"
            onClick={toggleSidebar}
          ></BiMenu>
        </div>
        <ul class="nav-list">
          <li>
            <a href="#">
              <AiOutlineAreaChart className="icon" />
              <span class="links_name">Báo cáo</span>
            </a>
            <span class="tooltip">Báo cáo</span>
          </li>
          <li>
            <a href="#">
              <GiMedicines className="icon" />
              <span class="links_name">Thuốc</span>
            </a>
            <span class="tooltip">Thuốc</span>
          </li>
          <li>
            <a href="#">
              <IoIosPeople className="icon" />
              <span class="links_name">Nhân viên</span>
            </a>
            <span class="tooltip">Nhân viên</span>
          </li>
          <li>
            <a href="#">
              <GiHumanTarget className="icon" />
              <span class="links_name">Khách hàng</span>
            </a>
            <span class="tooltip">Khách hàng</span>
          </li>
          <li>
            <a href="#">
              <BiSolidReport className="icon" />
              <span class="links_name">Bán lẻ</span>
            </a>
            <span class="tooltip">Bán lẻ</span>
          </li>
          <li>
            <a href="#">
              <BiSolidTruck className="icon" />
              <span class="links_name">Nhập kho</span>
            </a>
            <span class="tooltip">Nhập kho</span>
          </li>

          <li class="profile">
            <div class="profile-details">Username</div>
            <BiLogOut color="white" id="log_out" />
          </li>
        </ul>
      </div>
      <section class="home-section">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h1
                className="text-2xl font-semibold leading-tight my-3"
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                  color: "#0d6efd",
                }}
              >
                DANH SÁCH TOA THUỐC
              </h1>
            </div>
            <div className="row row-function" style={{ display: "flex" }}>
              <div className="col-9 col-search d-flex align-items-center justify-content-start gap-3">
                <label>Lọc theo</label>
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
                        Tên toa
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Đối tượng
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Triệu chứng
                      </a>
                    </li>
                  </ul>
                </div>
                <input
                  style={{ width: 200, borderRadius: 5 }}
                  className="appearance-none pl-8 pr-6 py-2 bg-smoke-white text-sm focus:outline-none"
                  placeholder="Tìm kiếm toa thuốc"
                />
                <button
                  className="btn btn-outline-primary"
                  style={{ marginRight: "auto", height: 40, marginLeft: 5 }}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                  Tìm kiếm
                </button>
              </div>
              <div className="col-3 d-flex align-items-center justify-content-end gap-3">
                <label>Sắp xếp</label>
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
                        Tên toa
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Đối tượng
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Triệu chứng
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
              <div className="d-inline-block w-100 shadow rounded-lg overflow-hidden">
                <table className="w-100 leading-normal overflow-hidden rounded-3 table table-hover m-0">
                  <thead>
                    <tr style={{ background: "#0d6efd", color: "#ffffff" }}>
                      <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider" />
                      <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                        Mã toa thuốc
                      </th>
                      <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                        Tên toa thuốc
                      </th>
                      <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                        Đối tượng
                      </th>
                      <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                        Triệu chứng
                      </th>
                      <th className="px-3 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                        Ghi chú
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              1
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">TT01</p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Viêm họng
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Trẻ em
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Đau họng, ho
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Cấm trẻ sơ sinh
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              1
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">TT01</p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Viêm họng
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Trẻ em
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Đau họng, ho
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Cấm trẻ sơ sinh
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              1
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">TT01</p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Viêm họng
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Trẻ em
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Đau họng, ho
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Cấm trẻ sơ sinh
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              1
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">TT01</p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Viêm họng
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Trẻ em
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Đau họng, ho
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Cấm trẻ sơ sinh
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              1
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">TT01</p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Viêm họng
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Trẻ em
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Đau họng, ho
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Cấm trẻ sơ sinh
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <div className="justify-content-center d-flex">
                    <button className="btn btn-primary" style={{ margin: 5 }}>
                      <i className="fa-solid fa-angles-left" />
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
                      <i className="fa-solid fa-angles-right" />
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
            </div>
            <div className="d-flex align-items-center justify-content-end gap-3">
              <a
                className="btn btn-outline-primary"
                href="ThanhKN_CreatePrescription.html"
              >
                <i className="fa-solid fa-plus" />
                Thêm mới
              </a>
              <a
                className="btn btn-outline-primary"
                href="ThanhKN_EditPrescription.html"
              >
                <i className="fa-solid fa-pen-to-square" />
                Sửa
              </a>
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-solid fa-trash" />
                Xoá
              </button>
              <a className="btn btn-outline-primary" href="/HuyL_home.html">
                <i className="fa-regular fa-circle-left" />
                Trở về
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
