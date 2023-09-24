import React from "react";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Sliders = () => {
  return (
    <>
      <section className="banner-top bg-light d-flex">
        <div className="slider-banner col-8 bg-info">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
        <div className="img-banner col-4">
          <div clss>
            <img
              src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/392x134-1693299578716.png"
              alt="img-right-1"
            />
          </div>
          <div>
            <img
              src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/392x134px-1691463642426.png"
              alt="img-right-1"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Sliders;
