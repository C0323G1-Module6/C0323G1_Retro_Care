import React from "react";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Sliders = () => {
  return (
    <>
      <section className="banner-top bg-light d-flex pb-4">
        <div className="slider-banner d-flex col-8">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            loop={true}
            spaceBetween={20}
            className="mySwiper-promotion"
          >
            <SwiperSlide>
              <img
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913-1694600382533.png"
                alt="slide1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(2)-1693295214629.png"
                alt="slide2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/MicrosoftTeams-image%20(7)-1688698512325.jpg"
                alt="slide3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(14)-1693300179023.png"
                alt="slide4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/WEB-1693476977103.png"
                alt="slide5"
              />
            </SwiperSlide>
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
