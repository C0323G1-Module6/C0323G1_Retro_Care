import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as homeService from "../../services/home/HomeService";

export const SearchPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [medicineList, setMedicineList] = useState([]);
  const [keyword, setKeyword] = useState(params.keyword);

  useEffect(() => {
    getMedicineList();
  }, [params.keyword]);

  const getMedicineList = async () => {
    const response = await homeService.findMedicineForHomepage(keyword, "");
    console.log(response);
    setMedicineList(response);
  };

  const handleInputChange = async (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <Header inputSearch={keyword} onInputChange={handleInputChange} />
      <section
        className="our-menu bg-light repeat-img pb-5"
        style={{ padding: "7rem 0 0" }}
      >
        <div className="container min-vh-100">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center">
                <p className="sec-sub-title mb-5">Kết quả</p>
              </div>
            </div>
          </div>
          <div className="row">
            {medicineList?.map((el, index) => {
              const randomIndex = Math.floor(Math.random() * 3);
              const discountOptions = [5, 10, 15];
              const discountPercentage = discountOptions[randomIndex];
              const actualPrice =
                Math.ceil(
                  el.medicinePrice / ((100 - discountPercentage) / 100) / 1000
                ) * 1000;
              return (
                <div className="col-lg-3" key={index}>
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
                        onClick={() => {
                          navigate(`/details/${el.medicineId}`);
                        }}
                      >
                        Xem chi tiết
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
                        <span className="product-unit">Hộp</span>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default SearchPage;
