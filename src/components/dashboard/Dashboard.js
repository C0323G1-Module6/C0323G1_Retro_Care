import React, { useState, useEffect } from "react";
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
import { TbReportMedical } from "react-icons/tb";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import * as userService from "../../services/user/AppUserService";

const Dashboard = () => {
  const [userName, setUsername] = useState("");
  const roleAdmin = userService.checkRoleAppUser("ROLE_ADMIN");
  const roleManager = userService.checkRoleAppUser("ROLE_MANAGER");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const response = await userService.infoAppUserByJwtToken();
    setUsername(response);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menus = [
    {
      name: "Báo cáo",
      link: "/dashboard/report",
      icon: AiOutlineAreaChart,
    },
    {
      name: "Khách hàng",
      link: "/dashboard/customer",
      icon: GiHumanTarget,
    },
    {
      name: "Thuốc",
      link: "/dashboard/medicine",
      icon: GiMedicines,
    },
    {
      name: "Nhóm thuốc",
      link: "/dashboard/kind-of-medicine",
      icon: GiMedicinePills,
    },
    {
      name: "Toa thuốc",
      link: "/dashboard/prescription",
      icon: TbReportMedical,
    },
    {
      name: "Nhân viên",
      link: "/dashboard/employee",
      icon: IoIosPeople,
    },
    {
      name: "Nhà cung cấp",
      link: "/dashboard/supplier",
      icon: BiGrid,
    },
    {
      name: "Nhập kho",
      link: "/dashboard/invoice",
      icon: BiSolidTruck,
    },
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
        <ul className="nav-list">
          {(roleAdmin || roleManager) && (
            <>
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
            </>
          )}
          <li>
            <Link className="link" to="/dashboard/list-invoice-order">
              <div>
                <BiSolidReport className="icon" />
              </div>
              <span className="links_name">Bán lẻ</span>
            </Link>
            <span className="tooltip">Bán lẻ</span>
          </li>
          <li className="profile">
            <div className="profile-details">{userName?.sub}</div>
            <Link id="log_out" to={"/home"}>
              <BiLogOut color="white" size={30} />
            </Link>
          </li>
        </ul>
      </div>
      <section className="home-section overflow-hidden pt-5">
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
