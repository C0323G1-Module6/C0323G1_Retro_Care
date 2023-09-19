import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../../img/logo.jpg";
import {
  BiMenu,
  BiSolidReport,
  BiSolidTruck,
  BiLogOut,
  BiGrid,
} from "react-icons/bi";
import { AiOutlineAreaChart } from "react-icons/ai";
import { GiMedicines, GiHumanTarget, GiMedicinePills } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menus = [
    { name: "Báo cáo", link: "/dashboard/report", icon: AiOutlineAreaChart },
    { name: "Khách hàng", link: "/dashboard/customer", icon: GiHumanTarget },
    { name: "Thuốc", link: "/dashboard/medicine", icon: GiMedicines },
    {
      name: "Nhóm thuốc",
      link: "/dashboard/kind-of-medicine",
      icon: GiMedicinePills,
    },
    { name: "Nhân viên", link: "/dashboard/employee", icon: IoIosPeople },
    { name: "Bán lẻ", link: "/dashboard/retail", icon: BiSolidReport },
    { name: "Nhà cung cấp", link: "/dashboard/supplier", icon: BiGrid },
    { name: "Nhập kho", link: "/dashboard/warehouse", icon: BiSolidTruck },
  ];

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-details">
          <div className="logo_name">
            <Link to={"/home"}>
              <img src={logo} width={160} height={30} alt="Logo" />
            </Link>
          </div>
          <BiMenu
            color="white"
            size={30}
            id="btn"
            onClick={toggleSidebar}
          ></BiMenu>
        </div>
        <ul class="nav-list">
          {menus?.map((menu, i) => (
            <li key={i}>
              <Link className="link" to={menu?.link}>
                <div>
                  {React.createElement(menu?.icon, { className: "icon" })}
                </div>
                <span className="links_name">{menu?.name}</span>
              </Link>
              <span className="tooltip">{menu?.name}</span>
            </li>
          ))}
          <li class="profile">
            <div class="profile-details">Username</div>
            <Link id="log_out" to={"/home"}>
              <BiLogOut color="white" size={30} />
            </Link>
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
