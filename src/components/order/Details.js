import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMedicineForDisplay,
  addToCartFromHomeAndDetails,
  checkQuantity,
  getQuantityInCart,
} from "../../services/order/CartService";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "./redux/cartAction";

export default function Details() {
  const dispatch = useDispatch();

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
      dispatch(getAllCarts(2));
      toast.success("Thêm sản phẩm thành công!");
    } catch {
      swal.fire("Sản phẩm vượt quá số lượng cho phép!", "", "warning");
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
      <Header />
      <div>
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
      </div>
      <Footer />
    </>
  );
}
