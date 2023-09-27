import React, { useEffect, useState } from "react";
import logo from "../../img/logo.jpg";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate, NavLink } from "react-router-dom";
import * as userService from "../../services/user/AppUserService";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "../order/redux/cartAction";
import {
  getIdByUserName,
  infoAppUserByJwtToken,
} from "../../services/user/AppUserService";
import { BiCog, BiLogOutCircle, BiUserCircle } from "react-icons/bi";
import * as kindOfMedicines from "../../services/kindOfMedicine/KindOfMedicineService";

const Header = ({ inputSearch, onInputChange }) => {
  const navigate = useNavigate();
  const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
  const [userName, setUsername] = useState("");
  const [keyword, setKeyword] = useState("");
  const [userId, setUserId] = useState("");
  const [types, setTypes] = useState([]);

  // replace 2 with userId
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartReducer);
  const roleAdmin = userService.checkRoleAppUser("ROLE_ADMIN");
  const roleManager = userService.checkRoleAppUser("ROLE_MANAGER");
  const roleEmployee = userService.checkRoleAppUser("ROLE_EMPLOYEE");

  useEffect(() => {
    getAppUserId();
    getTypesMedicine();
  }, []);

  useEffect(() => {
    getUsername();
  }, []);

  const getTypesMedicine = async () => {
    const response = await kindOfMedicines.getList();
    setTypes(response);
    console.log(response);
  };

  const getUsername = async () => {
    const response = await userService.infoAppUserByJwtToken();
    setUsername(response);
  };

  const getAppUserId = async () => {
    const isLoggedIn = infoAppUserByJwtToken();
    if (isLoggedIn) {
      const id = await getIdByUserName(isLoggedIn.sub);
      setUserId(id.data);
      dispatch(getAllCarts(id.data));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    setJwtToken(undefined);
    setUsername(undefined);
    navigate("/home");
    Swal.fire({
      title: "Đăng xuất thành công",
      icon: "success",
    });
    navigate("/home");
    window.location.reload();
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const searchMedicines = (keyword) => {
    navigate(`/home/search/${keyword}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchMedicines(keyword);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="row justify-content-between">
          <div className="d-flex align-items-center" style={{ width: "12rem" }}>
            <div className="header-logo">
              <Link to={"/home"}>
                <img src={logo} width={160} height={40} alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-10 col-md-10">
            <div className="main-navigation d-flex justify-content-between align-items-center">
              <button className="menu-toggle">
                <span></span>
                <span></span>
              </button>
              <nav className="header-menu col-lg-6 col-md-6 d-flex">
                <ul className="menu food-nav-menu">
                  <li>
                    <Link to={"/home"}>Trang chủ</Link>
                  </li>
                  <li>
                    <a href="#about">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#" className="category">
                      <div
                        className="category-info"
                        style={{ overflow: "hidden" }}
                      >
                        Danh mục
                      </div>
                      <div className="category-dropdown-list ">
                        {types?.map((type, index) => (
                          <Link
                            key={index}
                            to={`/home/list-medicines/${type.name}`}
                            className="category-dropdown-item"
                          >
                            <div className="dropdown-text">{type.name}</div>
                          </Link>
                        ))}
                      </div>
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="header-right col-lg-6 d-flex align-items-center justify-content-end">
                <form className="header-search-form for-des">
                  <input
                    type="search"
                    id="form-input-home"
                    className="form-input m-0"
                    placeholder="Tìm kiếm..."
                    value={inputSearch}
                    onChange={(event) => {
                      handleInputChange(event);
                      onInputChange(event);
                    }}
                  />
                  <button type="submit" onClick={(e) => handleSearch(e)}>
                    <CiSearch />
                  </button>
                </form>
                {userName && (
                  <Link to="/cart" href="" className="header-btn header-cart">
                    <FiShoppingCart />
                    <span className="cart-number">{carts.length}</span>
                  </Link>
                )}

                <a href="#" className="user">
                  <img
                    src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                    alt="user-img"
                    className="user-img"
                  />
                  {!userName ? (
                    <Link to="/login">
                      <span className="user-info">Đăng nhập</span>
                    </Link>
                  ) : (
                    <span className="user-info" style={{ overflow: "hidden" }}>
                      {userName.sub}
                    </span>
                  )}

                  <div className="user-dropdown-list">
                    {JwtToken ? (
                      <>
                        <Link
                          to={`/user-infor/${userId}`}
                          className="user-dropdown-item"
                        >
                          <BiUserCircle className="me-3 ms-0" size={25} />
                          <div className="dropdown-text">Thông tin</div>
                        </Link>
                        {(roleAdmin || roleEmployee || roleManager) && (
                          <Link
                            to={"/dashboard/retail"}
                            className="user-dropdown-item"
                          >
                            <BiCog className="me-3 ms-0" size={25} />
                            <div className="dropdown-text">Chức năng</div>
                          </Link>
                        )}
                        <Link className="user-dropdown-item">
                          <BiLogOutCircle className="me-3 ms-0" size={25} />
                          <div
                            className="dropdown-text"
                            onClick={() => {
                              handleLogOut();
                            }}
                          >
                            Đăng xuất
                          </div>
                        </Link>
                      </>
                    ) : null}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
