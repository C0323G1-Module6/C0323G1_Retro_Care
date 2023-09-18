import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../../img/logo.jpg";
import { BiMenu, BiSolidReport, BiSolidTruck, BiLogOut } from "react-icons/bi";
import { AiOutlineAreaChart } from "react-icons/ai";
import { GiMedicines, GiHumanTarget } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { Outlet } from "react-router-dom";

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
      <section class="home-section overflow-hidden pt-5">
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
