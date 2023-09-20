import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
import arrow from "../../img/arrow.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import * as homeService from "../../services/home/HomeService";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const Home = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    getMedicineList();
    getFavoriteList();
  }, []);

  const getMedicineList = async () => {
    const response = await homeService.findMedicineForHomepage("", "");
    setMedicineList(response);
  };

  const getFavoriteList = async () => {
    const response = await homeService.findFavoriteMedicineForHomepage();
    setFavoriteList(response);
  };

  return (
    <div>
      <Header />
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
                    <a href="#menu" className="sec-btn">
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

      <section className="our-menu bg-light repeat-img pt-5 pb-5" id="menu">
        <div className="sec-wp">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5">Sản phẩm</p>
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
                slidesPerView={4}
                spaceBetween={30}
                cssMode={true}
                navigation={{ nextEl: "#arrow-prev-1", prevEl: "#arrow-nxt-1" }}
                loop={true}
                speed={6000}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {medicineList?.map((el, inxdex) => (
                  <SwiperSlide key={inxdex}>
                    <div className="product-card">
                      <div className="product-image">
                        <span className="discount-tag">30% off</span>
                        <a href="/prototype/cart/HanhNLM_product-details.html">
                          <img
                            src={el.medicineImage}
                            className="product-thumb"
                            alt=""
                          />
                        </a>
                        <button className="card-btn">Mua</button>
                      </div>
                      <div className="product-info">
                        <p className="product-short-description">
                          {el.medicineName}
                        </p>
                        <span className="price">{el.medicinePrice} VNĐ</span>
                        <span className="actual-price">90.000 VNĐ</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="our-menu bg-light repeat-img pt-5 pb-5" id="menu">
        <div className="sec-wp">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5">Được yêu thích</p>
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
                slidesPerView={4}
                spaceBetween={30}
                cssMode={true}
                navigation={{ nextEl: "#arrow-prev-2", prevEl: "#arrow-nxt-2" }}
                loop={true}
                speed={6000}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">20% off</span>
                      <a href="/prototype/cart/HanhNLM_product-details.html">
                        <img
                          src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P00222_11-thumbnail-510x510-70.jpg"
                          className="product-thumb"
                          alt=""
                        />
                      </a>
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">Phosphalugen</p>
                      <span className="price">90.000 VNĐ</span>
                      <span className="actual-price">100.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">30% off</span>
                      <a href="/prototype/cart/HanhNLM_product-details.html">
                        <img
                          src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P25055_11-thumbnail-510x510-70.jpg"
                          className="product-thumb"
                          alt=""
                        />
                      </a>
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">
                        LiveSpo Clausy
                      </p>
                      <span className="price">150.000 VNĐ</span>
                      <span className="actual-price">99.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">50% off</span>
                      <a href="/prototype/cart/HanhNLM_product-details.html">
                        <img
                          src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P25907_1-thumbnail-510x510-70.jpg"
                          className="product-thumb"
                          alt=""
                        />
                      </a>
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">
                        KUDOS Bone (Tuýp 20 viên)
                      </p>
                      <span className="price">113.000 VNĐ</span>
                      <span className="actual-price">96.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">25% off</span>
                      <img
                        src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P10577_11-thumbnail-510x510-70.jpg"
                        className="product-thumb"
                        alt=""
                      />
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">Anessa</p>
                      <span className="price">80.000 VNĐ</span>
                      <span className="actual-price">70.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">10% off</span>
                      <img
                        src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P00053_New-thumbnail-510x510-70.jpg"
                        className="product-thumb"
                        alt=""
                      />
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">Berroca</p>
                      <span className="price">80.000 VNĐ</span>
                      <span className="actual-price">75.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">5% off</span>
                      <img
                        src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P02359_11-thumbnail-510x510-70.jpg"
                        className="product-thumb"
                        alt=""
                      />
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">Megaduo</p>
                      <span className="price">95.000 VNĐ</span>
                      <span className="actual-price">100.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">50% off</span>
                      <img
                        src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P09293_1-thumbnail-510x510-70.jpg"
                        className="product-thumb"
                        alt=""
                      />
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">Sản phẩm 1</p>
                      <span className="price">20.000 VNĐ</span>
                      <span className="actual-price">40.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product-card">
                    <div className="product-image">
                      <span className="discount-tag">50% off</span>
                      <img
                        src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P25907_1-thumbnail-510x510-70.jpg"
                        className="product-thumb"
                        alt=""
                      />
                      <a href="/prototype/cart/HanhNLM_cart.html">
                        <button type="button" className="card-btn">
                          Mua
                        </button>
                      </a>
                    </div>
                    <div className="product-info">
                      <p className="product-short-description">Sản phẩm 1</p>
                      <span className="price">20.000 VNĐ</span>
                      <span className="actual-price">40.000 VNĐ</span>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="book-table bg-light pt-5 pb-5">
        <div className="sec-wp">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sec-title text-center mb-5">
                  <p className="sec-sub-title mb-5">Khuyến mãi</p>
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
              className="mySwiper"
            >
              <SwiperSlide>
                <a
                  href="https://medicare.vn/wp-content/uploads/2023/08/Banner-web-T08_Home.jpg"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage:
                      "url(https://medicare.vn/wp-content/uploads/2023/08/Banner-web-T08_Home.jpg)",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <a
                  href="https://medicare.vn/wp-content/uploads/2023/08/1.jpg"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage:
                      "url(https://medicare.vn/wp-content/uploads/2023/08/1.jpg)",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <a
                  href="https://medicare.vn/wp-content/uploads/2023/08/1.jpg"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage:
                      "url(https://medicare.vn/wp-content/uploads/2023/08/1.jpg)",
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <a
                  href="https://medicare.vn/wp-content/uploads/2023/08/5-1400x658.jpg"
                  className="book-table-img back-img swiper-slide"
                  style={{
                    backgroundImage:
                      "url(https://medicare.vn/wp-content/uploads/2023/08/5-1400x658.jpg)",
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
                    <p className="sec-sub-title mb-5">Blog</p>
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
    </div>
  );
};

export default Home;
