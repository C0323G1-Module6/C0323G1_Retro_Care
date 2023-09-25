import React from "react";

const HavingNoResults = () => {
  return (
    <>
      <div className="row position-relative">
        <h2
          className="position-absolute d-inline-block text-center"
          style={{ top: "2rem", color: "rgb(157,178,222)" }}
        >
          Không tìm thấy kết quả tìm kiếm. Vui lòng thử lại...
        </h2>
        <img
          src="https://i0.wp.com/www.ecommerce-nation.com/wp-content/uploads/2017/08/How-to-Give-Your-E-Commerce-No-Results-Page-the-Power-to-Sell.png?resize=1000%2C600&ssl=1"
          alt=""
        />
      </div>
    </>
  );
};
export default HavingNoResults;
