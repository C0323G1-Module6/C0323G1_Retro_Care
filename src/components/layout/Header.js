import React, { useEffect, useState } from "react";
import logo from "../../img/logo.jpg";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/user/AppUserService";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "../order/redux/cartAction";

const Header = ({ inputSearch, onInputChange }) => {
  const navigate = useNavigate();
  const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
  const [userName, setUsername] = useState("");
  const [keyword, setKeyword] = useState(" ");

  // replace 2 with userId
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartReducer);
  useEffect(() => {
    dispatch(getAllCarts(1));
  }, []);

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const response = await userService.infoAppUserByJwtToken();
    setUsername(response);
  };

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    setJwtToken(undefined);
    setUsername(undefined);
    Swal.fire({
      title: "Đăng xuất thành công",
      icon: "success",
    });
    navigate("/home");
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
              <div className="header-right col-lg-6 d-flex align-items-center justify-content-end">
                <form className="header-search-form for-des">
                  <input
                    type="search"
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
                    <span className="user-info">{userName.sub}</span>
                  )}

                  <div className="user-dropdown-list">
                    {JwtToken ? (
                      <>
                        <Link
                          to={"/dashboard/prescription"}
                          className="user-dropdown-item"
                        >
                          <i className="bx bx-log-out-circle"></i>
                          <div className="dropdown-text">Chức năng</div>
                        </Link>
                        <div className="user-dropdown-item">
                          <i className="bx bx-log-out-circle"></i>
                          <div
                            className="dropdown-text"
                            onClick={() => handleLogOut()}
                          >
                            Đăng xuất
                          </div>
                        </div>
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
