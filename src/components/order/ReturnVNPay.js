import React, { useEffect, useState, CSSProperties } from "react";
import {
  getOrderDetails,
  createOrder,
} from "../../services/order/OrderService";
import { useNavigate, Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Swal from "sweetalert2";
import { getAllCarts } from "./redux/cartAction";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

export default function ReturnVNPay() {
  const [responseCode, setResponseCode] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [dataList, setDataList] = useState({});
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#119cd4");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findOrderDetais = async (orderId) => {
    const data = await getOrderDetails(orderId);
    setOrderDetails(data);
  };

  const getURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get("vnp_ResponseCode");
    console.log(responseCode);
    setResponseCode(responseCode);
  };

  const paymentSuccess = async () => {
    if (responseCode == "00") {
      const temp = localStorage.getItem("tempOrder");
      const tempOrder = JSON.parse(temp);
      setDataList(tempOrder);
      console.log(JSON.parse(temp));
      localStorage.removeItem("tempOrder");

      try {
        const create = await createOrder(
          tempOrder.appUserId,
          tempOrder.loyaltyPoint,
          tempOrder.totalPrice,
          tempOrder.deletedCartIDs,
          tempOrder.customerToPay,
          true
        );
        dispatch(getAllCarts(tempOrder.appUserId));
        await findOrderDetais(create.data);
        setLoading(false);
      } catch (err) {
        Swal.fire({
          title: "Thanh toán không thành công!",
          timer: 1500,
          icon: "error",
          showConfirmButton: false,
        }).then(async () => {
          localStorage.removeItem("tempOrder");
        });
      }
    } else {
      Swal.fire({
        title: "Xin lỗi chúng tôi không thể thực hiện thanh toán này!",
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      }).then(async () => {
        localStorage.removeItem("tempOrder");
      });
    }
  };

  useEffect(() => {
    getURL();
  }, []);

  useEffect(() => {
    if (responseCode != null) {
      paymentSuccess();
    }
  }, [responseCode]);

  const currency = (money) => {
    return new Intl.NumberFormat("vi-VN").format(money);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color={color} loading={loading} size={150} />
      </div>
    );
  }

  return (
    <>
      <Header />
      {responseCode === null ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img src="https://www.pharmacity.vn/images/empty-image.png"></img>
          <p className="col col-md-3 col-8 mb-3 text-center">
            Tiếc quá! RetroCare không thể thực hiện thanh toán đơn hàng này cho
            bạn! Vui lòng thử lại nhé!
          </p>
          <div>
            <Link to="/home" className="btn" style={{ background: "orange" }}>
              ← Tiếp tục xem sản phẩm
            </Link>
          </div>
        </div>
      ) : (
        <div id="hannah" className="container">
          <div style={{ marginTop: "50px" }} className=" h-auto">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img
                src="https://www.pharmacity.vn/images/poom-happy.png"
                className=" h-25 w-25 mt-5"
              ></img>
              <p className="col col-md-5 col-8 mb-3 text-center">
                Cảm ơn bạn đã sử dụng dịch vụ của RetroCare! Vui lòng xem chi
                tiết đơn hàng bên dưới nhé!
              </p>
            </div>
          </div>

          <div className="container-fluid p-1 position-relative h-auto">
            <h1
              className="text-center mb-5 mx-auto "
              style={{ color: "#119cd4" }}
            >
              THÔNG TIN ĐƠN HÀNG
            </h1>

            {orderDetails.length > 0 && (
              <div className="container-fluid w-100">
                <div className="row">
                  <div className=" col col-sm-12 col-md-12 col-lg-8 col-xl-8 p-0">
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
                          {orderDetails.length > 0 &&
                            orderDetails.map((el, index) => {
                              return (
                                <tr key={`el_${index}`}>
                                  <td>
                                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-start ">
                                      <img
                                        src={el.medicineImage}
                                        style={{
                                          width: "3.5rem",
                                          height: "4.0rem",
                                          cursor: "pointer",
                                        }}
                                      />
                                      <div
                                        style={{ cursor: "pointer" }}
                                        className="text-center align-middle mx-2"
                                      >
                                        <div>{el.medicineName}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className=" text-center align-middle fw-bold">
                                    {currency(el.medicinePrice)}
                                  </td>
                                  {/*                            quantity*/}
                                  <td className="align-middle">
                                    <div className=" d-flex flex-md-row flex-column justify-content-center align-items-center">
                                      <input
                                        readOnly
                                        type="number"
                                        defaultValue={el.quantityInCart}
                                        style={{
                                          width: "50px",
                                          height: "35px",
                                        }}
                                        name="quantity"
                                        className="text-center input-quantity"
                                      />
                                    </div>
                                  </td>
                                  {/*                            total price*/}
                                  <td className="align-middle text-center fw-bold">
                                    {currency(
                                      el.medicinePrice * el.quantityInCart
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
                      <div className=" mb-3 w-75" id="confirm-order">
                        <h3
                          className=" text-center"
                          style={{ color: "#119cd4" }}
                        >
                          ĐỊA CHỈ NHẬN HÀNG
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

                        <form>
                          <div className=" d-flex flex-column justify-content-center align-items-center">
                            <div className=" mb-1 w-100">
                              <label htmlFor="name">
                                Tên khách hàng{" "}
                                <span className=" text-danger">*</span>
                              </label>
                              <input
                                readOnly
                                value={dataList.customerToPay.name}
                                type="text"
                                id="name"
                                name="name"
                                className=" form-control w-100"
                              ></input>
                            </div>
                          </div>

                          <div className=" mb-1 w-100">
                            <label htmlFor="phoneNumber">
                              Số điện thoại{" "}
                              <span className=" text-danger">*</span>
                            </label>
                            <input
                              readOnly
                              value={dataList.customerToPay.phoneNumber}
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              className=" form-control w-100"
                            ></input>
                          </div>
                          <div className=" mb-1 w-100">
                            <label htmlFor="email">
                              Email<span className=" text-danger">*</span>
                            </label>
                            <input
                              readOnly
                              value={dataList.customerToPay.email}
                              type="text"
                              id="email"
                              name="email"
                              className=" form-control w-100"
                            ></input>
                          </div>
                          <div className="  mb-1 w-100">
                            <label htmlFor="address">
                              Địa chỉ<span className=" text-danger">*</span>
                            </label>
                            <input
                              readOnly
                              value={dataList.customerToPay.address}
                              type="text"
                              id="address"
                              name="address"
                              className=" form-control w-100"
                            ></input>
                          </div>
                          <div className="mb-1 w-100">
                            <label htmlFor="note">Ghi chú:</label>
                            <input
                              readOnly
                              value={dataList.customerToPay.note}
                              as="textarea"
                              id="note"
                              name="note"
                              className=" form-control w-100"
                            ></input>
                          </div>
                        </form>
                      </div>
                      <Link to="/home" className="btn btn-outline-primary mb-5">
                        ← Tiếp tục xem sản phẩm
                      </Link>
                      </div>

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
                            <span
                              className="fw-bold"
                              style={{ float: "right" }}
                            >
                              {currency(dataList.totalPriceBeforeDiscount)} VNĐ
                            </span>
                          </div>
                          <div className="border-bottom mb-2 pb-2">
                            <span>Giảm giá:</span>
                            <span
                              className="fw-bold"
                              style={{ float: "right" }}
                            >
                              {currency(dataList.discount)} VNĐ
                            </span>
                          </div>
                          <div className="border-bottom mb-2 pb-2">
                            <span>Tổng Tiền</span>
                            <span
                              className="fw-bold"
                              style={{ float: "right" }}
                            >
                              {currency(dataList.totalPrice)} VNĐ
                            </span>
                          </div>
                        </div>
                        <hr />
                      </div>
                      {/*                payment*/}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
