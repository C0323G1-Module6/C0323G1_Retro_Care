import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
import arrow from "../../img/arrow.png";
import drugStoreImage from "../../img/drug-store.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import * as homeService from "../../services/home/HomeService";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { addToCartFromHomeAndDetails } from "../../services/order/CartService";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarts } from "../order/redux/cartAction";
import * as utils from "../../services/utils/utils";
import {
  infoAppUserByJwtToken,
  getIdByUserName,
} from "../../services/user/AppUserService";
import Swal from "sweetalert2";
import Sliders from "./Sliders";

const Home = () => {
  const navigate = useNavigate();
  const [medicineList, setMedicineList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [medicineListWithKind, setMedicineListWithKind] = useState([]);
  const [medicineForChildren, setMedicineForChildren] = useState([]);

  const [appUserId, setAppUserId] = useState(null);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartReducer);

  useEffect(() => {
    document.title = "RetroCare - Trang chủ";
  }, []);

  useEffect(() => {
    getMedicineList();
    getFavoriteList();
    getMedicineListWithKind();
    getMedicineForChildren();
  }, []);

  const getMedicineList = async () => {
    const response = await homeService.findMedicineForHomepage("", "");
    setMedicineList(response.data);
  };

  const getMedicineListWithKind = async () => {
    const response = await homeService.findMedicineForHomepage("", "bổ");
    setMedicineListWithKind(response.data);
  };

  const getMedicineForChildren = async () => {
    const response = await homeService.findMedicineForHomepage("", "cảm cúm");
    setMedicineForChildren(response.data);
  };

  const getFavoriteList = async () => {
    const response = await homeService.findFavoriteMedicineForHomepage();
    setFavoriteList(response.data);
  };
  const addToCart = async (medicineId) => {
    const isLoggedIn = infoAppUserByJwtToken();
    if (!isLoggedIn) {
      Swal.fire("Vui lòng đăng nhập tài khoản!", "", "warning");
      navigate("/login");
    } else {
      const id = await getIdByUserName(isLoggedIn.sub);
      console.log(id.data);
      setAppUserId(id.data);
      const response = await addToCartFromHomeAndDetails(
        id.data,
        medicineId,
        1
      );
      dispatch(getAllCarts(id.data));
      toast.success("Thêm sản phẩm thành công");
    }
  };
  return (
    <div>
      <Header onInputChange={() => {}} />
      <section className="main-banner" id="home">
        <div className="sec-wp">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner-text">
                  <h1 className="h1-title">
                    <span>RetroCare</span>
                  </h1>
                  <h5>
                    Chào mừng bạn đến với nơi cung cấp dược phẩm và các sản phẩm
                    chăm sóc sức khoẻ lớn nhất
                  </h5>
                  <div className="banner-btn mt-4">
                    <a href="#" className="sec-btn">
                      Về chúng tôi
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-img-wp">
                  <div
                    className="banner-img"
                    style={{
                      backgroundImage:
                        "url(https://pharmcourse.com/storage/web/other/photo_2022-07-25%2009.29.29.png)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brands-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="brand-title">
                <h5 className="h5-title">Đối tác của chúng tôi</h5>
              </div>
              <div className="brands-row">
                <div className="brands-box">
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/brand-images/17_Hotchland.png"
                    alt=""
                  />
                </div>
                <div className="brands-box">
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/brand-images/Nutrigen.png"
                    alt=""
                  />
                </div>
                <div className="brands-box">
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/brand-images/innerb.png"
                    alt=""
                  />
                </div>
                <div className="brands-box">
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/brand-images/80_Nature_way.png"
                    alt=""
                  />
                </div>
                <div className="brands-box">
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/brand-images/Solgar.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Sliders />

      <section className="bg-light repeat-img pt-2 pb-2">
        <div className="sec-wp">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5 w-50">Sản phẩm mới nhất</p>
              </div>
            </div>
          </div>
          <div className="product">
            <button className="pre-btn" id="arrow-prev-1">
              <img src={arrow} alt="arrow" />
            </button>
            <button className="nxt-btn" id="arrow-nxt-1">
              <img src={arrow} alt="arrow" />
            </button>
            <div className="product-container">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                cssMode={true}
                navigation={{
                  nextEl: "#arrow-nxt-1",
                  prevEl: "#arrow-prev-1",
                }}
                loop={true}
                speed={500}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {medicineList?.map((el, index) => {
                  const discountPercentage = utils.getDiscount(
                    el.medicinePrice
                  );
                  const actualPrice =
                    Math.ceil(
                      el.medicinePrice /
                        ((100 - discountPercentage) / 100) /
                        1000
                    ) * 1000;
                  return (
                    <SwiperSlide key={index}>
                      <div className="product-card">
                        <div className="product-image">
                          <span className="discount-tag">
                            {`${discountPercentage}% off`}
                          </span>
                          <Link to={`/details/${el.medicineId}`}>
                            <img
                              src={el.medicineImage}
                              className="product-thumb"
                              alt=""
                            />
                          </Link>
                          <button
                            className="card-btn"
                            onClick={() => addToCart(el.medicineId)}
                          >
                            Mua
                          </button>
                        </div>
                        <div className="product-info">
                          <p className="product-short-description">
                            {el.medicineName}
                          </p>
                          <div className="d-flex justify-content-between">
                            <span className="price">
                              {parseFloat(el.medicinePrice).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }
                              )}{" "}
                              VNĐ
                            </span>
                            <span className="product-unit">
                              {el.medicineUnit}
                            </span>
                          </div>
                          <div>
                            <span className="actual-price">
                              {actualPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                              VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                ;
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light repeat-img pt-2 pb-2">
        <div className="sec-wp">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5 w-50">Sản phẩm bán chạy</p>
              </div>
            </div>
          </div>

          <div className="product">
            <button className="pre-btn" id="arrow-prev-2">
              <img src={arrow} alt="arrow" />
            </button>
            <button className="nxt-btn" id="arrow-nxt-2">
              <img src={arrow} alt="arrow" />
            </button>
            <div className="product-container">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                cssMode={true}
                navigation={{ nextEl: "#arrow-nxt-2", prevEl: "#arrow-prev-2" }}
                loop={true}
                speed={500}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {favoriteList?.map((el, index) => {
                  const discountPercentage = utils.getDiscount(
                    el.medicinePrice
                  );
                  const actualPrice =
                    Math.ceil(
                      el.medicinePrice /
                        ((100 - discountPercentage) / 100) /
                        1000
                    ) * 1000;
                  return (
                    <SwiperSlide key={index}>
                      <div className="product-card">
                        <div className="product-image">
                          <span className="discount-tag">
                            {`${discountPercentage}% off`}
                          </span>
                          <Link to={`/details/${el.medicineId}`}>
                            <img
                              src={el.medicineImage}
                              className="product-thumb"
                              alt=""
                            />
                          </Link>
                          <button
                            className="card-btn"
                            onClick={() => addToCart(el.medicineId)}
                          >
                            Mua
                          </button>
                        </div>
                        <div className="product-info">
                          <p className="product-short-description">
                            {el.medicineName}
                          </p>
                          <div className="d-flex justify-content-between">
                            <span className="price">
                              {parseFloat(el.medicinePrice).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }
                              )}{" "}
                              VNĐ
                            </span>
                            <span className="product-unit">
                              {el.medicineUnit}
                            </span>
                          </div>
                          <div>
                            <span className="actual-price">
                              {actualPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                              VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                ;
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light repeat-img pt-2 pb-2">
        <div className="sec-wp">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5 w-50">Danh mục thuốc bổ</p>
              </div>
            </div>
          </div>

          <div className="product">
            <button className="pre-btn" id="arrow-prev-3">
              <img src={arrow} alt="arrow" />
            </button>
            <button className="nxt-btn" id="arrow-nxt-3">
              <img src={arrow} alt="arrow" />
            </button>
            <div className="product-container">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                cssMode={true}
                navigation={{ nextEl: "#arrow-nxt-3", prevEl: "#arrow-prev-3" }}
                loop={true}
                speed={500}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {medicineListWithKind?.map((el, index) => {
                  const discountPercentage = utils.getDiscount(
                    el.medicinePrice
                  );
                  const actualPrice =
                    Math.ceil(
                      el.medicinePrice /
                        ((100 - discountPercentage) / 100) /
                        1000
                    ) * 1000;
                  return (
                    <SwiperSlide key={index}>
                      <div className="product-card">
                        <div className="product-image">
                          <span className="discount-tag">
                            {`${discountPercentage}% off`}
                          </span>
                          <Link to={`/details/${el.medicineId}`}>
                            <img
                              src={el.medicineImage}
                              className="product-thumb"
                              alt=""
                            />
                          </Link>
                          <button
                            className="card-btn"
                            onClick={() => addToCart(el.medicineId)}
                          >
                            Mua
                          </button>
                        </div>
                        <div className="product-info">
                          <p className="product-short-description">
                            {el.medicineName}
                          </p>
                          <div className="d-flex justify-content-between">
                            <span className="price">
                              {parseFloat(el.medicinePrice).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }
                              )}{" "}
                              VNĐ
                            </span>
                            <span className="product-unit">
                              {el.medicineUnit}
                            </span>
                          </div>
                          <div>
                            <span className="actual-price">
                              {actualPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                              VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                ;
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light repeat-img pt-2 pb-2">
        <div className="sec-wp">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5 w-50">
                  Thuốc cảm dành cho trẻ em
                </p>
              </div>
            </div>
          </div>

          <div className="product">
            <button className="pre-btn" id="arrow-prev-4">
              <img src={arrow} alt="arrow" />
            </button>
            <button className="nxt-btn" id="arrow-nxt-4">
              <img src={arrow} alt="arrow" />
            </button>
            <div className="product-container">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                cssMode={true}
                navigation={{ nextEl: "#arrow-nxt-4", prevEl: "#arrow-prev-4" }}
                loop={true}
                speed={500}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {medicineForChildren?.map((el, index) => {
                  const discountPercentage = utils.getDiscount(
                    el.medicinePrice
                  );
                  const actualPrice =
                    Math.ceil(
                      el.medicinePrice /
                        ((100 - discountPercentage) / 100) /
                        1000
                    ) * 1000;
                  return (
                    <SwiperSlide key={index}>
                      <div className="product-card">
                        <div className="product-image">
                          <span className="discount-tag">
                            {`${discountPercentage}% off`}
                          </span>
                          <Link to={`/details/${el.medicineId}`}>
                            <img
                              src={el.medicineImage}
                              className="product-thumb"
                              alt=""
                            />
                          </Link>
                          <button
                            className="card-btn"
                            onClick={() => addToCart(el.medicineId)}
                          >
                            Mua
                          </button>
                        </div>
                        <div className="product-info">
                          <p className="product-short-description">
                            {el.medicineName}
                          </p>
                          <div className="d-flex justify-content-between">
                            <span className="price">
                              {parseFloat(el.medicinePrice).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }
                              )}{" "}
                              VNĐ
                            </span>
                            <span className="product-unit">
                              {el.medicineUnit}
                            </span>
                          </div>
                          <div>
                            <span className="actual-price">
                              {actualPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                              VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                ;
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="book-table bg-light pt-2 pb-2">
        <div className="sec-wp">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sec-title text-center mb-5">
                  <p className="sec-sub-title mb-5 w-50">
                    Chương trình khuyến mãi
                  </p>
                </div>
              </div>
            </div>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={6000}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Autoplay, Navigation]}
              className="mySwiper-bottom"
            >
              <SwiperSlide>
                <a
                  href="#"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage:
                      "url(https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/WEB-1693476977103.png)",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <a
                  href="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913-1694600382533.png"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage:
                      "url(https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913-1694600382533.png)",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <a
                  href="#"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage: `url(${drugStoreImage})`,
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <div
        className="bg-pattern bg-light repeat-img"
        style={{
          backgroundImage: "url(assets/images/blog-pattern-bg.png)",
        }}
      >
        <section className="blog-sec" id="blog">
          <div className="sec-wp">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="sec-title text-center pt-5 mb-3">
                    <p className="sec-sub-title mb-5 w-50">
                      Chuyên mục sức khoẻ
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="blog-box">
                    <div
                      className="blog-img back-img"
                      style={{
                        backgroundImage:
                          "url(https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/microsoftteams-image-108.webp)",
                      }}
                    />

                    <div className="blog-text">
                      <p className="blog-date">01/01/2023</p>
                      <a href="#" className="h4-title">
                        Chăm sóc da
                      </a>
                      <p>
                        Với phái đẹp, làn da khỏe mạnh, trẻ trung, tươi sáng là
                        vô cùng quan trọng. Tuy nhiên để đạt được điều này, các
                        bạn gái cần chăm sóc da mặt thường xuyên mỗi ngày.
                      </p>
                      <a href="#" className="sec-btn">
                        Xem
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="blog-box">
                    <div
                      className="blog-img back-img"
                      style={{
                        backgroundImage:
                          "url(https://vhnbio.vn/assets/upload/images/news/chat_dinh_duong_vi_luong_va_suc_khoe.jpg)",
                      }}
                    />

                    <div className="blog-text">
                      <p className="blog-date">01/02/2023</p>
                      <a href="#" className="h4-title">
                        Dinh dưỡng và sức khoẻ
                      </a>
                      <p>
                        Dinh dưỡng là một phần thiết yếu đối với sức khỏe của
                        con người. Thông qua chế độ dinh dưỡng hàng ngày, bạn có
                        thể nhận biết được tình trạng sức khỏe hiện tại và tương
                        lai.
                      </p>
                      <a href="#" className="sec-btn">
                        Xem
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="blog-box">
                    <div
                      className="blog-img back-img"
                      style={{
                        backgroundImage:
                          "url(https://www.cet.edu.vn/wp-content/uploads/2019/04/fastfood-la-gi.jpg)",
                      }}
                    />

                    <div className="blog-text">
                      <p className="blog-date">01/03/2023</p>
                      <a href="#" className="h4-title">
                        Tác hại của đồ ăn nhanh
                      </a>
                      <p>
                        Sử dụng đồ ăn nhanh nhiều chất béo, calo và carbs đã qua
                        chế biến hơn mức cơ thể cần trong một bữa ăn khiến bạn
                        nhanh chóng tăng cân và béo phì. Thừa cân và béo phì .
                      </p>
                      <a href="#" className="sec-btn">
                        Xem
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <ToastContainer autoClose={2000} className="toast-position" />
    </div>
  );
};

export default Home;
