import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCarts,
  addToCart,
  checkQuantity,
  deleteCart,
  getPoint,
  checkAvailability,
} from "../../services/order/CartService";
import { createOrder } from "../../services/order/OrderService";
import { updateCustomer } from "../../services/order/Med";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "./redux/cartAction";
import { el } from "date-fns/locale";
import "../../css/Order.css";

export default function Cart() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [point, setPoint] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [checkout, setCheckOut] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartReducer);

  const navigate = useNavigate();

  let totalPrice = carts.reduce(
    (total, el) => total + el.medicinePrice * el.quantityInCart,
    0
  );

  async function handlePlus(medicineId) {
    let quantity = document.getElementById("input-quantity" + medicineId);

    try {
      const res = await checkQuantity(medicineId, parseInt(quantity.value) + 1);
      // if enuf
      if (quantity.value < 99) {
        quantity.value = parseInt(quantity.value) + 1;
      } else {
        quantity.value = 99;
      }
      await addToCart(1, medicineId, quantity.value);
      setIsUpdated((prev) => !prev);
    } catch {
      swal.fire("Sản phẩm vượt quá số lượng cho phép!", "", "warning");
    }
  }

  async function handleMinus(medicineId, medicineName, cartId) {
    let quantity = document.getElementById("input-quantity" + medicineId);

    try {
      if (quantity.value == 1) {
        swal
          .fire({
            title: "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?",
            text: medicineName,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ",
          })
          .then(async (willDelete) => {
            if (willDelete.isConfirmed) {
              await deleteCart(cartId);
              setIsUpdated((prev) => !prev);
              swal.fire("Xoá sản phẩm thành công!", "", "success");
            }
          });
      }
      if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
      }
      if (quantity.value > 99) {
        quantity.value = 99;
      }
      const res = await checkQuantity(medicineId, quantity.value);
      // if enuf

      await addToCart(1, medicineId, quantity.value);
      setIsUpdated((prev) => !prev);
    } catch {
      swal.fire("Sản phẩm vượt quá số lượng cho phép!", "", "warning");
    }
  }

  const handleDelete = async (cartId, medicineName) => {
    swal
      .fire({
        title: "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?",
        text: medicineName,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý!",
        cancelButtonText: "Huỷ",
      })
      .then(async (willDelete) => {
        if (willDelete.isConfirmed) {
          await deleteCart(cartId);
          setIsUpdated((prev) => !prev);
          swal.fire("Xoá sản phẩm thành công!", "", "success");
        }
      });
  };

  const checkQuantityBeforePayment = async () => {
    // input appuserID in replace of 2
    const invalidQuantityObj = await checkAvailability(1);
    if (Object.keys(invalidQuantityObj).length > 0) {
      setQuantities(invalidQuantityObj);
      return false;
    }
    return true;
  };

  const proceedOrder = async () => {
    const shouldShowCf = await checkQuantityBeforePayment();
    if (shouldShowCf) setShowCf(true);
  };

  const renderPaypal = () => {
    if (window.paypal) {
      window.paypal.Buttons().close();
    }

    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          const totalPrice = document.querySelector(".total-price").value;
          console.log(totalPrice);
          const priceInNum = parseFloat(totalPrice);
          const priceInUSD = priceInNum / 23000;
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "I'm buying stuff :))",
                amount: {
                  currency_code: "USD",
                  value: priceInUSD.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const shouldProceedPayment = await checkQuantityBeforePayment();
          if (shouldProceedPayment) {
            const order = await actions.order.capture();
            // after we're done with paypal
            const totalPrice = parseInt(
              document.querySelector(".total-price").value
            );
            const discount = parseInt(
              document.querySelector(".discount").value
            );
            const point = parseInt(document.querySelector(".point").value);
            console.log(discount);
            console.log(totalPrice);
            console.log(point);
            const plusPoint = totalPrice / 100;
            const loyaltyPoint = point + plusPoint - discount;
            const res = await createOrder(1, loyaltyPoint, totalPrice);
            swal.fire(
              "Thanh toán thành công!",
              "Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của RetroCare!",
              "success"
            );
            setIsUpdated((prev) => !prev);
          } else {
            throw new Error("Product's quantity is not enough");
          }
        },
        onError: (err) => {
          console.log(err);
          swal.fire("Thanh toán không thành công!", "", "error");
        },
      })
      .render("#paypal-button-container");
  };

  const currency = (money) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);

  const getLoyaltyPoint = async () => {
    const data = await getPoint(1);
    setPoint(data);
  };

  const checkLoyaltyPoint = async () => {
    const inputPoint = document.querySelector(".input-point");
    console.log(parseInt(inputPoint.value));

    if (parseInt(inputPoint.value) <= point) {
      if (parseInt(inputPoint.value) <= totalPrice) {
        setDiscount(parseInt(inputPoint.value));
      } else {
        setDiscount(0);
        swal.fire(
          "Sử dụng tích luỹ vượt qúa tổng tiền hoá đơn!",
          "",
          "warning"
        );
      }
    } else {
      setDiscount(0);
      swal.fire("Vượt quá số điểm hiện có!", "", "warning");
    }
  };

  useEffect(() => {
    dispatch(getAllCarts(1));
  }, [isUpdated]);
  useEffect(() => {
    getLoyaltyPoint();
  }, []);

  return (
    <>
      <Header />
      <div
        className="container-fluid my-y p-1 position-relative"
        style={{ top: "5rem", height: "100vh" }}
      >
        <h1 className="text-center mt-2 mb-5 mx-auto">Giỏ Hàng</h1>
        {carts.length > 0 ? (
          <div className="container-fluid w-100">
            <div className="row">
              <div className=" col col-sm-12 col-md-12 col-lg-8 col-xl-8 p-0">
                <div className=" d-flex flex-column justify-content-center align-items-center">
                  <table className="table table-hover">
                    <thead className="text-secondary">
                      <tr className="text-center fw-bold">
                        <td>SẢN PHẨM</td>
                        <td>Giá (VND)</td>
                        <td>Số lượng</td>
                        <td>Tổng (VND)</td>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.length > 0 &&
                        carts.map((el) => {
                          return (
                            <tr key={`el_${el.cartId}`}>
                              <td>
                                <div className="d-flex flex-column flex-md-row align-items-center justify-content-start ">
                                  <span>
                                    <button
                                      className="bg-transparent border-0 fs-4 mx-3"
                                      onClick={() =>
                                        handleDelete(el.cartId, el.medicineName)
                                      }
                                    >
                                      ⊗
                                    </button>
                                  </span>
                                  <img
                                    src={el.medicineImage}
                                    style={{
                                      width: "3.5rem",
                                      height: "4.0rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      navigate(`/details/${el.medicineId}`)
                                    }
                                  />
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="text-center align-middle mx-2"
                                    onClick={() =>
                                      navigate(`/details/${el.medicineId}`)
                                    }
                                  >
                                    <div>{el.medicineName}</div>
                                  </div>
                                </div>
                                {quantities[el.medicineId] >= 0 && (
                                  <small className="text-center text-danger align-middle">
                                    Số lượng còn lại ở kho:{" "}
                                    <small>{quantities[el.medicineId]}</small>
                                  </small>
                                )}
                              </td>

                              <td className=" text-center align-middle fw-bold">
                                {currency(el.medicinePrice)}
                              </td>
                              {/*                            quantity*/}
                              <td className="align-middle">
                                <div className=" d-flex flex-md-row flex-column justify-content-center align-items-center">
                                  <input
                                    onClick={() =>
                                      handleMinus(
                                        el.medicineId,
                                        el.medicineName,
                                        el.cartId
                                      )
                                    }
                                    type="button"
                                    defaultValue="-"
                                    className="  d-flex justify-content-center align-items-end btn-in-cart"
                                    data-field="quantity"
                                  />
                                  <input
                                    readOnly
                                    id={`input-quantity${el.medicineId}`}
                                    type="number"
                                    step={1}
                                    maxlength="2"
                                    min="1"
                                    max="99"
                                    defaultValue={el.quantityInCart}
                                    style={{ width: "50px", height: "35px" }}
                                    name="quantity"
                                    className="input-quantity text-center form-input px-2 mx-0"
                                  />
                                  <input
                                    onClick={() => handlePlus(el.medicineId)}
                                    type="button"
                                    defaultValue="+"
                                    className=" d-flex justify-content-center btn-in-cart"
                                    data-field="quantity"
                                  />
                                </div>
                              </td>
                              {/*                            total price*/}
                              <td className="align-middle text-center fw-bold">
                                {currency(el.medicinePrice * el.quantityInCart)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div
                    className=" mb-5"
                    style={{ display: showCf ? "block" : "none" }}
                    id="confirm-order"
                  >
                    <h3 className=" text-center text-success">
                      XÁC NHẬN THÔNG TIN GIAO HÀNG
                      <img
                        style={{
                          marginLeft: "20px",
                          height: "60px",
                          width: "60px",
                          opacity: "20%",
                        }}
                        src="https://static.vecteezy.com/system/resources/previews/002/206/240/original/fast-delivery-icon-free-vector.jpg"
                      />
                    </h3>
                    <Formik
                      initialValues={{
                        id: carts[0].customerId,
                        name: carts[0].customerName,
                        phoneNumber: carts[0].phoneNumber,
                        email: carts[0].customerEmail,
                        address: carts[0].address,
                        note: "",
                      }}
                      validationSchema={yup.object({
                        name: yup
                          .string()
                          .required("Vui lòng nhập tên khách hàng!"),
                        phoneNumber: yup
                          .string()
                          .matches(/^0[0-9]{9}$/, "0905222777")
                          .required("Vui lòng nhập vào số điện thoại!"),
                        email: yup
                          .string()
                          .email()
                          .required("Vui lòng nhập vào email!"),
                        address: yup
                          .string()
                          .required("Vui lòng nhập vào địa chỉ của bạn!"),
                        note: yup.string().max(255),
                      })}
                      onSubmit={async (values, { setErrors }) => {
                        try {
                          const res = await updateCustomer(values);
                          swal.fire(
                            "Cập nhật thông tin thành công!",
                            "",
                            "success"
                          );
                          // the checkout here is to temporarily fix paypal bug somehow :)
                          if (!checkout) {
                            renderPaypal();
                            setCheckOut(true);
                          }
                        } catch (error) {
                          if (error.response && error.response.data) {
                            setErrors(error.response.data);
                          }
                        }
                      }}
                    >
                      <Form>
                        <div className=" d-flex flex-column justify-content-center align-items-center">
                          <div className=" mb-1 w-100">
                            <label htmlFor="name">
                              Tên khách hàng{" "}
                              <span className=" text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              id="name"
                              name="name"
                              className=" form-control w-100"
                            ></Field>
                            <ErrorMessage
                              name="name"
                              component="p"
                              className="text-danger"
                            ></ErrorMessage>
                          </div>
                        </div>

                        <div className=" mb-1 w-100">
                          <label htmlFor="phoneNumber">
                            Số điện thoại{" "}
                            <span className=" text-danger">*</span>
                          </label>
                          <Field
                            disabled={carts[0].phoneNumber.length > 0}
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className=" form-control w-100"
                          ></Field>
                          <ErrorMessage
                            name="phoneNumber"
                            component="span"
                            className=" text-danger"
                          ></ErrorMessage>
                        </div>
                        <div className=" mb-1 w-100">
                          <label htmlFor="email">
                            Email<span className=" text-danger">*</span>
                          </label>
                          <Field
                            disabled={carts[0].customerEmail.length > 0}
                            type="text"
                            id="email"
                            name="email"
                            className=" form-control w-100"
                          ></Field>
                          <ErrorMessage
                            name="email"
                            component="span"
                            className=" text-danger"
                          ></ErrorMessage>
                        </div>
                        <div className="  mb-1 w-100">
                          <label htmlFor="address">
                            Địa chỉ<span className=" text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            id="address"
                            name="address"
                            className=" form-control w-100"
                          ></Field>
                          <ErrorMessage
                            name="address"
                            component="span"
                            className=" text-danger"
                          ></ErrorMessage>
                        </div>
                        <div className="mb-1 w-100">
                          <label htmlFor="note">Ghi chú:</label>
                          <Field
                            as="textarea"
                            id="note"
                            name="note"
                            className=" form-control w-100"
                          ></Field>
                          <ErrorMessage
                            name="note"
                            component="span"
                            className=" text-danger"
                          ></ErrorMessage>
                        </div>
                        <div className=" w-100 d-flex justify-content-center">
                          <button
                            type="submit"
                            className=" fw-bold btn btn-success mt-3 w-50"
                          >
                            CẬP NHẬT VÀ THANH TOÁN
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                  <div id="paypal-button-container" className="w-50"></div>

                  <Link to="/home" className="btn btn-outline-primary">
                    ← Tiếp tục xem sản phẩm
                  </Link>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 container position-relative">
                <div className="shadow rounded p-3 mb-5 position-sticky top-0 mt-3">
                  <div>
                    <div className="text-secondary fs-5">TỔNG SỐ LƯỢNG</div>
                    <hr className="text-secondary h-2" />
                    <div className="">
                      <div className="border-bottom mb-2 pb-2">
                        <span>Tạm Tính</span>
                        <span className="fw-bold" style={{ float: "right" }}>
                          {currency(totalPrice)}
                        </span>
                      </div>
                      <div className="border-bottom mb-2 pb-2">
                        <span>Giảm giá:</span>
                        <span className="fw-bold" style={{ float: "right" }}>
                          {currency(discount)}
                          <input
                            className="fw-bold discount"
                            type="hidden"
                            value={discount}
                          />
                        </span>
                      </div>
                      <div className="border-bottom mb-2 pb-2">
                        <span>Tổng Tiền</span>
                        <span className="fw-bold" style={{ float: "right" }}>
                          <input
                            className="fw-bold total-price"
                            type="hidden"
                            value={totalPrice - discount}
                          />
                          {currency(totalPrice - discount)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-100 btn btn-warning mt-3 fw-bold"
                      onClick={proceedOrder}
                      disabled={showCf}
                    >
                      TIẾN HÀNH THANH TOÁN
                    </button>
                    <hr />
                    <div>
                      <p className="m-0" style={{ color: "orange" }}>
                        Sử dụng điểm tích luỹ:
                      </p>
                      <small className=" d-inline-block mb-1">
                        Tích luỹ hiện có:
                        <small className=" text-danger mx-2">
                          {currency(point)}
                          <input
                            className="fw-bold point"
                            type="hidden"
                            value={point}
                          />
                        </small>{" "}
                      </small>
                      <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        className="input-quantity form-control input-point"
                      />
                      <button
                        className="w-100 btn btn-outline-success mt-3"
                        onClick={checkLoyaltyPoint}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                  {/*                payment*/}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src="https://www.pharmacity.vn/images/empty-image.png"></img>
            <p className="col col-md-3 col-8 mb-3 text-center">
              Tiếc quá! RetroCare không tìm thấy sản phẩm nào trong giỏ hàng của
              bạn.
            </p>
            <div>
              <Link to="/home" className="btn" style={{ background: "orange" }}>
                ← Tiếp tục xem sản phẩm
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
