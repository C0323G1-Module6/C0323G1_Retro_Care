import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMedicineForDisplay,
  addToCartFromHomeAndDetails,
  checkQuantity,
  getQuantityInCart,
} from "../../services/order/CartService";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function Details() {
  const [activeIndex, setActiveIndex] = useState(0); // this is to control 'active' value
  const { id } = useParams();
  console.log(id);

  const [medicine, setMedicine] = useState({});
  const [images, setImages] = useState([]);

  const getMedicineDetails = async () => {
    const data = await getMedicineForDisplay(id);
    setMedicine(data);
    // split string of images into el of array
    const str = data.medicine_Images.split(",");
    setImages(str);
    console.log(data.medicine_Images);
    console.log(data);
  };

  const addToCart = async (medicineId) => {
    const quantity = document.getElementById("quantity-value").value;
    const quantityInCart = await getQuantityInCart(2, medicineId);
    console.log(quantityInCart);
    try {
      const res = await checkQuantity(id, parseInt(quantity) + quantityInCart);
      console.log(res);
      const add = await addToCartFromHomeAndDetails(2, medicineId, quantity);
      toast("Thêm sản phẩm thành công!", {
        style: {
          color: "red",
          border: "1px solid pink",
        },
      });
    } catch {
      swal("Sản phẩm vượt quá số lượng cho phép!", "", "warning");
    }
  };

  function handlePlus() {
    let quantityInput = document.getElementById("quantity-value");
    if (quantityInput.value < 99) {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    } else {
      quantityInput.value = 99;
    }
  }

  function handleMinus() {
    let quantityInput = document.getElementById("quantity-value");
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
    if (quantityInput.value > 99) {
      quantityInput.value = 99;
    }
  }

  const currency = (money) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);

  useEffect(() => {
    getMedicineDetails();
  }, []);

  return (
    <>
      <>
        {/* start of header  */}
        <header className="site-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="header-logo">
                  <a href="/HuyL_home.html">
                    <img src="/logo.jpg" width={160} height={36} alt="Logo" />
                  </a>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="main-navigation d-flex justify-content-between">
                  <button className="menu-toggle">
                    <span />
                    <span />
                  </button>
                  <nav className="header-menu col-lg-6">
                    <ul className="menu food-nav-menu">
                      <li>
                        <a href="/HuyL_home.html">Trang chủ</a>
                      </li>
                      <li>
                        <a href="#menu">Danh mục</a>
                      </li>
                      {/* Doing dropdown */}
                      <li className="nav-item">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Điều khiển
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="/prototype/report/DuyTV_GeneralReport.html"
                            >
                              Báo cáo
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="prototype/warehouse/HuyHD_Warehouse.html"
                            >
                              Nhập kho
                            </a>
                          </li>
                          <li className="nav-item dropend">
                            <a
                              className="nav-link dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Quản lý
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/description/ThanhKN_ListPrescription.html"
                                >
                                  Toa thuốc
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/type_of_medicine/prototype/CaoNV_ListPharmacy.html"
                                >
                                  Nhóm thuốc
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/product/DaoPTA_ProductList.html"
                                >
                                  Thuốc
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/supplier/ThanhVH_listSupplier.html"
                                >
                                  Nhà cung ứng
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/customer/QuyenHT_CustomerList.html"
                                >
                                  Khách hàng
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/employee/SonTT_EmployeeList.html"
                                >
                                  Nhân viên
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/prototype/invoice/VuDT_MedicineBillList.html"
                                >
                                  Hoá đơn
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="nav-item dropend">
                            <a
                              className="nav-link dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Hệ thống
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href="#">
                                  Đổi mật khẩu
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Quản lý tài khoản
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      {/* End */}
                    </ul>
                  </nav>
                  <div className="header-right col-lg-6">
                    <form action="#" className="header-search-form for-des">
                      <input
                        type="search"
                        className="form-input"
                        placeholder="Tìm kiếm..."
                      />
                      <button type="submit">
                        <i className="uil uil-search" />
                      </button>
                    </form>
                    <a
                      href="/prototype/cart/HanhNLM_cart.html"
                      className="header-btn header-cart"
                    >
                      <i className="uil uil-shopping-bag" />
                      <span className="cart-number">3</span>
                    </a>
                    <a
                      href="prototype/account/NhatNHH_login.html"
                      className="user"
                    >
                      <img
                        src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                        alt="user-img"
                        className="user-img"
                      />
                      <span className="user-info">Đăng nhập</span>
                      {/* Dropdown list Start */}
                      <div className="user-dropdown-list">
                        <div className="user-dropdown-item">
                          <i className="bx bx-log-out-circle" />
                          <div className="dropdown-text">Đăng xuất</div>
                        </div>
                      </div>
                      {/* Dropdown list end */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* header ends  */}
        {medicine.id && (
          <div
            className="container mt-5 position-relative"
            style={{ top: "5rem" }}
          >
            <div className=" row row-cols-md-2 row-cols-1 ">
              <div
                id="carouselExampleIndicators"
                className="carousel slide col col-md-6 col-auto"
                data-bs-ride="true"
                style={{ height: "100%" }}
              >
                <div className="carousel-indicators">
                  {images.length > 0 &&
                    images.map((el, index) => {
                      return (
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to={index}
                          className={index === activeIndex ? "active" : ""}
                          aria-current="true"
                          aria-label={`Slide ${index + 1}`}
                          style={{ width: 60, height: 70 }}
                        >
                          <img
                            src={el}
                            alt="..."
                            className="d-block w-100"
                            style={{ border: "1px lightskyblue solid" }}
                          />
                        </button>
                      );
                    })}
                </div>
                {/* ----- */}
                <div className="carousel-inner">
                  {images.length > 0 &&
                    images.map((el, index) => {
                      return (
                        <div
                          className={`carousel-item ${
                            index === activeIndex ? "active" : ""
                          }`}
                        >
                          <img src={el} className="d-block w-100" alt="..." />
                        </div>
                      );
                    })}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className=" col col-md-6 col-auto">
                <h1 className="name">{medicine.medicine_Name}</h1>
                <h3>
                  {currency(medicine.price)}{" "}
                  <h5 className=" d-inline">/ {medicine.unit_Name}</h5>
                </h3>
                <div
                  style={{
                    backgroundColor: "lightblue",
                    borderRadius: 10,
                  }}
                  className="p-4"
                >
                  <p className="m-0" style={{ fontSize: "14px" }}>
                    Giá đã bao gồm Thuế.
                  </p>
                  <p className=" m-0" style={{ fontSize: "14px" }}>
                    Phí vận chuyển và các chi phí khác (nếu có) sẽ được thể hiện
                    khi đặt hàng
                  </p>
                </div>
                <p className="mt-2">{medicine.medicine_Note}</p>

                {Math.floor(medicine.quantity / medicine.conversion_Rate) >
                0 ? (
                  <h6 style={{ color: "green" }}>Còn hàng</h6>
                ) : (
                  <h6 style={{ color: "red" }}>Hết hàng</h6>
                )}

                <div className="buttons d-flex justify-content-between align-items-center">
                  <div className="input-group col d-flex justify-content-start">
                    <input
                      type="button"
                      defaultValue="-"
                      className="button-minus"
                      data-field="quantity"
                      onClick={handleMinus}
                    />
                    <input
                      id="quantity-value"
                      type="number"
                      step={1}
                      maxlength="2"
                      min="1"
                      max="99"
                      defaultValue={1}
                      style={{ width: "50px", height: "35px" }}
                      name="quantity"
                      className=" input-quantity text-center form-input px-2"
                    />
                    <input
                      type="button"
                      defaultValue="+"
                      className="button-plus"
                      data-field="quantity"
                      onClick={handlePlus}
                    />
                  </div>
                  <button
                    onClick={() => addToCart(medicine.id)}
                    className="col btn"
                    style={{
                      backgroundColor: "orange",
                      height: 38,
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    THÊM VÀO GIỎ HÀNG
                  </button>
                </div>
                <hr />
                <p>
                  Mã:{" "}
                  <span style={{ color: "blue", fontSize: 14 }}>
                    {medicine.medicine_Code}
                  </span>
                </p>
                <hr />
                <p>
                  Danh mục:{" "}
                  <span style={{ color: "blue", fontSize: 14 }}>
                    {medicine.kind_Of_Medicine_Name}
                  </span>
                </p>
                <hr />
                <p>
                  Từ khoá:{" "}
                  <span style={{ color: "blue", fontSize: 14 }}>
                    Men vi sinh lợi khuẩn
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* footer starts  */}
        <footer
          className="site-footer position-relative"
          style={{ top: "5rem" }}
        >
          <div className="top-footer pt-5">
            <div className="sec-wp">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="footer-info">
                      <div className="footer-logo">
                        <a href="/HuyL_home.html">
                          <img src="logo.jpg" alt="" />
                        </a>
                      </div>
                      <p>Liên hệ với chúng tôi</p>
                      <div className="social-icon">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="uil uil-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="uil uil-instagram" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="uil uil-github-alt" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="uil uil-youtube" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="footer-flex-box">
                      <div className="footer-menu">
                        <h3 className="h3-title">Danh mục</h3>
                        <ul className="column-2">
                          <li>
                            <a href="#home">Dược phẩm</a>
                          </li>
                          <li>
                            <a href="#about">Thực phẩm chức năng</a>
                          </li>
                          <li>
                            <a href="#menu">Chăm sóc sức khoẻ</a>
                          </li>
                          <li>
                            <a href="#gallery">Chăm sóc da</a>
                          </li>
                        </ul>
                      </div>
                      <div className="footer-menu food-nav-menu">
                        <h3 className="h3-title">Liên kết</h3>
                        <ul className="column-2">
                          <li>
                            <a href="#about">Trang chủ</a>
                          </li>
                          <li>
                            <a href="#blog">Blog</a>
                          </li>
                          <li>
                            <a href="#contact">Contact</a>
                          </li>
                        </ul>
                      </div>
                      <div className="footer-menu">
                        <h3 className="h3-title">Về chúng tôi</h3>
                        <ul>
                          <li>
                            <a href="#">Chính sách</a>
                          </li>
                          <li>
                            <a href="#">Chăm sóc khách hàng</a>
                          </li>
                          <li>
                            <a href="#">Quy định giao hàng</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="copyright-text">
                    <p>
                      Copyright © 2023
                      <span className="name">C0323G1 </span>CodeGym Đà Nẵng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    </>
  );
}
