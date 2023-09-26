import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  checkQuantity,
  deleteCart,
  getPoint,
  checkAvailability,
  deleteMultiProduct,
} from "../../services/order/CartService";
import {
  createOrder,
  createVNPayPayment,
} from "../../services/order/OrderService";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "./redux/cartAction";
import "../../css/Order.css";
import {
  getIdByUserName,
  infoAppUserByJwtToken,
} from "../../services/user/AppUserService";
import Billing from "./Billing";
// Fix something
export default function Cart() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [point, setPoint] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [checkout, setCheckOut] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [appUserId, setAppUserId] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerToPay, setCustomerToPay] = useState({});
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  const getAppUserIdFirst = async () => {
    const isLoggedIn = infoAppUserByJwtToken();
    if (!isLoggedIn) {
      swal.fire("Vui lòng đăng nhập tài khoản!", "", "warning");
      navigate("/login");
    } else {
      const id = await getIdByUserName(isLoggedIn.sub);
      console.log("igiigigig");
      console.log(id.data);
      setAppUserId(id.data);
      console.log("im here");
      await getLoyaltyPoint(id.data);
    }
  };

  async function handlePlus(medicineId, medQuantity, conversionRate) {
    let quantity = document.getElementById("input-quantity" + medicineId);
    let quantityInStock = Math.floor(medQuantity / conversionRate);

    try {
      const res = await checkQuantity(medicineId, parseInt(quantity.value) + 1);
      // if enuf - allow to buy maximum 99
      if (quantity.value < 99) {
        quantity.value = parseInt(quantity.value) + 1;
      } else {
        quantity.value = 99;
      }
      await addToCart(appUserId, medicineId, quantity.value);
      setIsUpdated((prev) => !prev);
      // update the quantity in selectedMedicines state
      setSelectedMedicines(
        selectedMedicines.map((medicine) =>
          medicine.medicineId === medicineId
            ? { ...medicine, quantityInCart: quantity.value }
            : medicine
        )
      );
    } catch {
      swal.fire(
        "Sản phẩm vượt quá số lượng cho phép!",
        "Số lượng còn lại ở kho: " + quantityInStock,
        "warning"
      );
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
              // Update the selectedMedicines state
              setSelectedMedicines(
                selectedMedicines.filter(
                  (medicine) => medicine.medicineId !== medicineId
                )
              );
            }
          });
      }
      if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
      }

      await addToCart(appUserId, medicineId, quantity.value);
      setIsUpdated((prev) => !prev);
      setSelectedMedicines(
        selectedMedicines.map((medicine) =>
          medicine.medicineId === medicineId
            ? { ...medicine, quantityInCart: quantity.value }
            : medicine
        )
      );
    } catch {}
  }

  const handleMultiSelect = (el) => {
    if (
      selectedMedicines.find(
        (medicine) => medicine.medicineId === el.medicineId
      )
    ) {
      setSelectedMedicines(
        selectedMedicines.filter(
          (medicine) => medicine.medicineId !== el.medicineId
        )
      );
    } else {
      setSelectedMedicines([...selectedMedicines, el]);
    }
    setDiscount(0);
  };

  const handleDelete = async () => {
    if (selectedMedicines.length === 0) {
      swal.fire({
        title: "Vui lòng chọn sản phẩm cần xoá!",
        icon: "warning",
      });
    } else {
      let deletedCartIDs = [];
      selectedMedicines.forEach((med) => deletedCartIDs.push(med.cartId));
      console.log(deletedCartIDs);
      let names = selectedMedicines
        .map((medicine) => medicine.medicineName)
        .join(", ");

      swal
        .fire({
          title:
            "Bạn có muốn xoá " +
            selectedMedicines.length +
            " sản phẩm này khỏi giỏ hàng?",
          text: names,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý!",
          cancelButtonText: "Huỷ",
        })
        .then(async (willDelete) => {
          if (willDelete.isConfirmed) {
            await deleteMultiProduct(deletedCartIDs);
            setIsUpdated((prev) => !prev);
            // update the selectedMedicines
            setSelectedMedicines(
              selectedMedicines.filter(
                (med) => !deletedCartIDs.includes(med.cartId)
              )
            );
            setDiscount(0);
            swal.fire("Xoá sản phẩm thành công!", "", "success");
          }
        });
    }
  };

  const checkQuantityBeforePayment = async () => {
    // input appuserID in replace of 2
    const invalidQuantityObj = await checkAvailability(appUserId);
    if (Object.keys(invalidQuantityObj).length > 0) {
      setQuantities(invalidQuantityObj);
      return false;
    }
    return true;
  };

  const proceedOrder = async () => {
    if (selectedMedicines.length > 0) {
      const shouldShowCf = await checkQuantityBeforePayment();
      if (shouldShowCf) setShowCf(true);
    } else {
      swal.fire("Vui lòng chọn sản phẩm để thanh toán!", "", "warning");
    }
  };

  const renderPaypal = (customer) => {
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
            const totalPrice = Math.ceil(
              document.querySelector(".total-price").value
            );
            const discount = Math.ceil(
              document.querySelector(".discount").value
            );
            const point = Math.ceil(document.querySelector(".point").value);
            let deletedCartIDs = [];
            selectedMedicines.forEach((med) => deletedCartIDs.push(med.cartId));
            console.log(discount);
            console.log(totalPrice);
            console.log(point);
            const plusPoint = Math.ceil(totalPrice / 100);
            const loyaltyPoint = Math.ceil(point + plusPoint - discount);

            const res = await createOrder(
              appUserId,
              loyaltyPoint,
              totalPrice,
              deletedCartIDs,
              customer,
              false
            );
            navigate("/success", {
              state: {
                orderId: res.data,
                totalPrice: totalPrice,
                discount: discount,
                customer: customer,
              },
            });
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

  const currency = (money) => {
    return new Intl.NumberFormat("vi-VN").format(money);
  };

  const getLoyaltyPoint = async (appUserId) => {
    const data = await getPoint(appUserId);
    setPoint(data);
  };

  const checkLoyaltyPoint = async () => {
    const inputPoint = document.querySelector(".input-point");
    console.log(parseInt(inputPoint.value));

    if (parseInt(inputPoint.value) < 0) {
      swal.fire("Điểm tích luỹ không thể là số âm!", "", "warning");
    } else {
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
    }
  };

  const handleVNPAY = async () => {
    let finalPrice = totalPrice - discount;
    const plusPoint = totalPrice / 100;
    const loyaltyPoint = point + plusPoint - discount;
    let deletedCartIDs = [];
    selectedMedicines.forEach((med) => deletedCartIDs.push(med.cartId));
    const tempOrder = {
      appUserId: appUserId,
      loyaltyPoint: loyaltyPoint,
      totalPrice: finalPrice,
      customerToPay: customerToPay,
      deletedCartIDs: deletedCartIDs,
      totalPriceBeforeDiscount: totalPrice,
      discount: discount,
    };
    localStorage.setItem("tempOrder", JSON.stringify(tempOrder));

    const res = await createVNPayPayment(finalPrice);
    window.location.href = res;
  };

  const handleCheckedAll = () => {
    setSelectedMedicines([]);
    let checkboxes = document.querySelectorAll("input[type='checkbox']");

    if (isCheckedAll) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      setIsCheckedAll(false);
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      setIsCheckedAll(true);
      setSelectedMedicines(carts);
    }
    setDiscount(0);
  };

  useEffect(() => {
    document.title = "RetroCare - Giỏ Hàng";
  }, []);

  useEffect(() => {
    getAppUserIdFirst();
  }, []);

  useEffect(() => {
    let newTotalPrice = selectedMedicines.reduce(
      (total, el) => total + el.medicinePrice * el.quantityInCart,
      0
    );

    setTotalPrice(newTotalPrice);
  }, [selectedMedicines]);

  useEffect(() => {
    dispatch(getAllCarts(appUserId));
  }, [isUpdated]);

  const handleLogOut = () => {
    window.location.href('/home');
  }

  return (
    <>
      <Header />
      <div id="hannah" className="pb-5 pt-5">
        <div className="container-fluid p-1 position-relative">
          <h1 className="text-center my-5 mx-auto" style={{ color: "#0340c1" }}>
            GIỎ HÀNG
          </h1>

          {carts.length > 0 ? (
            <div className="container-fluid w-100">
              <div className="row">
                <div className=" col col-sm-12 col-md-12 col-lg-8 col-xl-8 p-0">
                  <div className=" d-flex justify-content-end">
                    <button
                      type="button"
                      className=" mx-5 p-0 text-primary"
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      onClick={handleCheckedAll}
                    >
                      Chọn tất cả
                    </button>
                    <button
                      type="button"
                      className=" mx-5 p-0 text-primary"
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      onClick={handleDelete}
                    >
                      Xoá sản phẩm
                    </button>
                  </div>
                  <div className=" d-flex flex-column justify-content-center align-items-center">
                    <table className="table table-hover">
                      <thead className="text-secondary">
                        <tr className="text-center fw-bold">
                          <td>SẢN PHẨM</td>
                          <td>Giá (VNĐ)</td>
                          <td>Số lượng</td>
                          <td>Tổng (VNĐ)</td>
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
                                      <input
                                        id={`el_${el.cartId}`}
                                        type="checkbox"
                                        name="multiSelect"
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                          marginRight: "20px",
                                        }}
                                        onChange={() => handleMultiSelect(el)}
                                      />
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
                                      className=" d-flex justify-content-center align-items-end btn-minus"
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
                                      style={{
                                        width: "50px",
                                        height: "35px",
                                        border: "1px white",

                                        borderRadius: "5px",
                                      }}
                                      name="quantity"
                                      className="text-center input-quantity"
                                    />
                                    <input
                                      onClick={() =>
                                        handlePlus(
                                          el.medicineId,
                                          el.medicineQuantity,
                                          el.conversionRate
                                        )
                                      }
                                      type="button"
                                      defaultValue="+"
                                      className=" d-flex justify-content-center btn-plus"
                                    />
                                  </div>
                                </td>
                                {/*                            total price*/}
                                <td className="align-middle text-center fw-bold">
                                  {currency(
                                    el.medicinePrice * el.quantityInCart
                                  )}{" "}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <div
                      className=" mb-3"
                      style={{ display: showCf ? "block" : "none" }}
                      id="confirm-order"
                    >
                      <h3 className=" text-center" style={{ color: "#0340c1" }}>
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
                          setCustomerToPay(values);
                          try {
                            swal.fire(
                              "Cập nhật thông tin thành công!",
                              "",
                              "success"
                            );
                            // the checkout here is to temporarily fix paypal bug somehow :)
                            if (!checkout) {
                              setCheckOut(true);
                              renderPaypal(values);
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
                              XÁC NHẬN VÀ THANH TOÁN
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                    <div className=" w-100 d-flex justify-content-center">
                      <button
                        className="btn fw-bold w-50"
                        style={{
                          marginBottom: "20px",
                          color: "black",
                          backgroundColor: "#119cd4",
                          border: "1px #119cd4 solid ",
                          display: checkout ? "block" : "none",
                        }}
                        onClick={handleVNPAY}
                      >
                        THANH TOÁN VỚI VNPAY
                      </button>
                    </div>
                    <div id="paypal-button-container" className="w-50"></div>

                    <Link to="/home" className="btn btn-outline-primary mb-5">
                      ← Tiếp tục xem sản phẩm
                    </Link>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 container position-relative">
                  <div className="shadow rounded p-3 mb-5 position-sticky top-0 mt-3">
                    <div>
                      <div className="text-secondary fs-5 fw-bold">
                        TỔNG SỐ LƯỢNG
                      </div>
                      <hr className="text-secondary h-2" />
                      <div className="">
                        <div className="border-bottom mb-2 pb-2">
                          <span>Tạm Tính</span>
                          <span className="fw-bold" style={{ float: "right" }}>
                            {currency(totalPrice)} VNĐ
                          </span>
                        </div>
                        <div className="border-bottom mb-2 pb-2">
                          <span>Giảm giá:</span>
                          <span className="fw-bold" style={{ float: "right" }}>
                            {currency(discount)} VNĐ
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
                            {currency(totalPrice - discount)} VNĐ
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
                          Sử dụng điểm tích luỹ:{" "}
                          <span style={{ fontSize: "14px" }}>
                            (1 RETRO = 1 VNĐ)
                          </span>
                        </p>
                        <small className=" d-inline-block mb-1">
                          Tích luỹ hiện có:
                          <small className=" text-danger mx-2">
                            {currency(point)} RETRO
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
                          className="input-quantity form-control w-100 input-point"
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
                Tiếc quá! RetroCare không tìm thấy sản phẩm nào trong giỏ hàng
                của bạn.
              </p>
              <div>
                <Link
                  to="/home"
                  className="btn"
                  style={{ background: "orange" }}
                >
                  ← Tiếp tục xem sản phẩm
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
