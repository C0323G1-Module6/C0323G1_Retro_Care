import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMedicineForDisplay,
  addToCartFromHomeAndDetails,
  checkQuantity,
  getQuantityInCart,
} from "../../services/order/CartService";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert2";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "./redux/cartAction";
import "../../css/Order.css";
import { useNavigate } from "react-router-dom";
import {
  getIdByUserName,
  infoAppUserByJwtToken,
} from "../../services/user/AppUserService";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0); // this is to control 'active' value
  const { id } = useParams();
  console.log(id);

  const [medicine, setMedicine] = useState({});
  const [images, setImages] = useState([]);
  const [appUserId, setAppUserId] = useState(null);

  const getMedicineDetails = async () => {
    try {
      const res = await getMedicineForDisplay(id);
      setMedicine(res.data);
      // split string of images into el of array
      const str = res.data.medicine_Images.split(",");
      setImages(str);
      console.log(res.data.medicine_Images);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status == 406) {
        swal.fire("Không tìm thấy sản phẩm bạn cần tìm!", "", "error");
        navigate("/home");
      }
    }
  };

  const addToCart = async (medicineId) => {
    const isLoggedIn = infoAppUserByJwtToken();
    if (!isLoggedIn) {
      swal.fire("Vui lòng đăng nhập tài khoản!", "", "warning");
      localStorage.setItem("tempURL", window.location.pathname);
      navigate("/login");
    } else {
      // extract appUserId from token
      const id = await getIdByUserName(isLoggedIn.sub);
      setAppUserId(id.data);
      // do checking
      const quantity = document.getElementById("quantity-value").value;
      const quantityInCart = await getQuantityInCart(id.data, medicineId);
      console.log(quantityInCart);
      if (parseInt(quantity) <= 0) {
        swal.fire("Vui lòng thêm ít nhất 1 sản phẩm!", "", "warning");
      } else {
        try {
          const res = await checkQuantity(
            medicineId,
            parseInt(quantity) + quantityInCart
          );
          console.log(res);
          const add = await addToCartFromHomeAndDetails(
            id.data,
            medicineId,
            quantity
          );
          dispatch(getAllCarts(id.data));
          toast.success("Thêm sản phẩm thành công!");
        } catch {
          swal.fire(
            "Sản phẩm vượt quá số lượng cho phép!",
            "Số lượng trong giỏ hàng của bạn: " + quantityInCart,
            "warning"
          );
        }
      }
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

  const currency = (money) => {
    return new Intl.NumberFormat("vi-VN").format(money);
  };

  useEffect(() => {
    document.title = "RetroCare - Thông tin chi tiết";
  }, []);

  useEffect(() => {
    getMedicineDetails();
  }, []);

  return (
    <>
      <Header />
      <div id="hannah" className="pb-5">
        <div className="mb-5">
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
                  <h4>
                    <span>{currency(medicine.price)} VNĐ</span>
                    <span> / {medicine.unit_Name}</span>
                  </h4>
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
                      Phí vận chuyển và các chi phí khác (nếu có) sẽ được thể
                      hiện khi đặt hàng
                    </p>
                  </div>
                  <p className="mt-2">{medicine.medicine_Note}</p>

                  {Math.floor(medicine.quantity / medicine.conversion_Rate) >
                  0 ? (
                    <h6 style={{ color: "green" }}>
                      Còn hàng (
                      <span>
                        {Math.floor(
                          medicine.quantity / medicine.conversion_Rate
                        )}
                      </span>
                      )
                    </h6>
                  ) : (
                    <h6 style={{ color: "red" }}>Hết hàng</h6>
                  )}

                  <div className="buttons d-flex justify-content-between align-items-center">
                    <div className="btn-input-group col d-flex justify-content-start align-items-end ">
                      <input
                        type="button"
                        defaultValue="-"
                        className="btn-minus"
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
                        style={{
                          width: "50px",
                          height: "35px",
                          border: "1px white",
                          borderRadius: "5px",
                        }}
                        name="quantity"
                        className=" input-quantity text-center px-2"
                      />
                      <input
                        type="button"
                        defaultValue="+"
                        className="btn-plus"
                        data-field="quantity"
                        onClick={handlePlus}
                      />
                    </div>
                    <button
                      onClick={() => addToCart(medicine.id)}
                      className="col btn fw-bold mb-0"
                      style={{
                        backgroundColor: "orange",
                        height: "38px",
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                  <hr />
                  <p>
                    <span className=" fw-bold">Mã sản phẩm: </span>
                    <span>{medicine.medicine_Code}</span>
                  </p>
                  <hr />
                  <p>
                    <span className=" fw-bold">Danh mục: </span>
                    <span>{medicine.kind_Of_Medicine_Name}</span>
                  </p>
                  <hr />
                  <p>
                    <span className=" fw-bold">Nhà sản xuất: </span>
                    <span> {medicine.maker}</span>
                  </p>
                  <p>
                    <span className=" fw-bold">Thành phần hoạt chất: </span>

                    <span className=" d-inline-block ">
                      {" "}
                      {medicine.activeElement}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ToastContainer autoClose={2000} className="toast-position" />
    </>
  );
}
