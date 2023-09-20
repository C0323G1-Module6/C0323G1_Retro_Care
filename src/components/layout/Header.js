import React, { useState } from "react";
import logo from "../../img/logo.jpg";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/user/AppUserService";

const Header = () => {
  const navigate = useNavigate();
  const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
  const [userName, setUsername] = useState(userService.infoAppUserByJwtToken);

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    setJwtToken(undefined);
    setUsername(undefined);
    alert("Bạn đã đăng xuất thành công");
    navigate("/home");
  };
  return (
    <header className="site-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 d-flex align-items-center">
            <div className="header-logo">
              <Link to={"/home"}>
                <img src={logo} width={160} height={40} alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="main-navigation d-flex justify-content-between">
              <button className="menu-toggle">
                <span></span>
                <span></span>
              </button>
              <nav className="header-menu col-lg-6">
                <ul className="menu food-nav-menu">
                  <li>
                    <Link to={"/home"}>Trang chủ</Link>
                  </li>
                  <li>
                    <a href="#menu">Danh mục</a>
                  </li>
                </ul>
              </nav>
              <div className="header-right col-lg-6 d-flex align-items-center">
                <form
                  action="/prototype/search/HuyL_searchContent.html"
                  className="header-search-form for-des"
                >
                  <input
                    type="search"
                    className="form-input m-0"
                    placeholder="Tìm kiếm..."
                  />
                  <button type="submit">
                    <CiSearch />
                  </button>
                </form>
                <a
                  href="/prototype/cart/HanhNLM_cart.html"
                  className="header-btn header-cart"
                >
                  <FiShoppingCart />
                  <span className="cart-number">3</span>
                </a>
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
                    <span className="user-info">{userName}</span>
                  )}

                  <div className="user-dropdown-list">
                    <Link
                      to={"/dashboard/prescription"}
                      className="user-dropdown-item"
                    >
                      <i className="bx bx-log-out-circle"></i>
                      <div className="dropdown-text">Chức năng</div>
                    </Link>
                    {JwtToken ? (
                      <div className="user-dropdown-item">
                        <div
                          className="dropdown-text"
                          onClick={() => handleLogOut()}
                        >
                          Đăng xuất
                        </div>
                      </div>
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
