import { AiOutlineLineChart, AiOutlineRollback } from "react-icons/ai";
import "./Report.css";
import { Link } from "react-router-dom";

const RevenueAndProfitChart = () => {
  return (
    <>
      <div className="container-fluid row">
        <div className=" col-12 my-3 ">
          <h1 className="text-center text-primary my-3 ">
            BIỂU ĐỒ DOANH THU - LỢI NHUẬN
          </h1>
          <div className="row">
            <div className="col-4">
              <div className="row ">
                <fieldset
                  className="form-input shadow mx-auto my-3"
                  style={{ width: "97%", height: "40%" }}
                >
                  <legend className="float-none w-auto px-3">
                    <h5>Thời gian xuất báo cáo</h5>
                  </legend>
                  <label htmlFor="startDate">Từ ngày</label>
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Chọn ngày bắt đầu"
                    id="startDate"
                  />
                  <label htmlFor="endDate">Đến ngày</label>
                  <input
                    className="form-control "
                    type="date"
                    placeholder="Chọn ngày kết thúc"
                    id="endDate"
                  />
                  <div className="d-flex justify-content-center">
                    <button type="submit"  className="btn btn-outline-primary my-3">
                      <AiOutlineLineChart className="mx-1"/>
                      Biểu đồ
                    </button>
                  </div>
                </fieldset>
              </div>
              <div className="row">
                <fieldset
                  className="form-input shadow mx-auto"
                  style={{ width: "97%", height: "60%" }}
                >
                  <legend className="float-none w-auto px-3">
                    <h5>Báo cáo chi tiết</h5>
                  </legend>
                  <div className="row">
                    <div className="col-5">
                      <p>Doanh thu</p>
                    </div>
                    <div className="col-7">
                      <p> 174,000,000 VNĐ</p>
                    </div>
                    <div className="col-5">
                      <p>Lợi nhuận</p>
                    </div>
                    <div className="col-7">
                      <p> 17,400,000 VNĐ</p>
                    </div>
                    <div className="col-5">
                      <p>Doanh thu TB</p>
                    </div>
                    <div className="col-7">
                      <p> 24,857,143 VNĐ</p>
                    </div>
                    <div className="col-5">
                      <p>Lợi nhuận TB</p>
                    </div>
                    <div className="col-7">
                      <p> 2,485,715 VNĐ</p>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="col-8 ">
              <div className="row">
                <fieldset
                  className="form-input shadow mx-auto my-3"
                  style={{ width: "97%" }}
                >
                  <legend className="float-none w-auto px-3">
                    <h5>Biểu đồ</h5>
                  </legend>
                  <canvas
                    id="myChart"
                    style={{ width: "100%", maxWidth: 600 }}
                  />
                </fieldset>
              </div>
              <Link
                to={"/dashboard/generalReport"}
                className="btn btn-outline-primary float-end mx-3"
              >
                <AiOutlineRollback className="mx-1" />
                Trở về
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RevenueAndProfitChart;
