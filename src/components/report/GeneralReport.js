import { Link } from "react-router-dom";
import "./Report.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import {
  AiOutlineLineChart,
  AiOutlinePrinter,
  AiOutlineRollback,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { getReport } from "../../services/report/ReportService";

const GeneralReport = () => {
  const [reportName, setReportName] = useState("");
  const [validateDto, setValidateDto] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [profit, setProfit] = useState([]);
  const [bestSellerMedicine, setBestSellerMedicine] = useState([]);
  const [debt, setDebt] = useState([]);
  const [expireMedicine, setExpireMedicine] = useState([]);
  const [medicineNeedMore, setMedicineNeedMore] = useState([]);
  const [saleDiary, setSaleDiary] = useState([]);

  useEffect(() => {
    loadDataReport(reportName, validateDto);
  }, [reportName, validateDto]);

  const loadDataReport = async (reportName, validateDto) => {
    const result = [];
    switch (reportName) {
      case "revenue":
        result = await getReport(reportName, validateDto);
        setRevenue(result);
        break;
      case "profit":
        result = await getReport(reportName, validateDto);
        setProfit(result);
        break;
      case "debt":
        result = await getReport(reportName, validateDto);
        setDebt(result);
        break;
      case "expireMedicine":
        result = await getReport(reportName, validateDto);
        setExpireMedicine(result);
        break;
      case "bestSellerMedicine":
        result = await getReport(reportName, validateDto);
        setBestSellerMedicine(result);
        break;
      case "saleDiary":
        result = await getReport(reportName, validateDto);
        setSaleDiary(result);
        break;
      case "medicineNeedMore":
        result = await getReport(reportName, validateDto);
        setMedicineNeedMore(result);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Formik>
        <div className="row">
          <div className="col-12">
            <div className="  mx-auto" style={{ width: "85%" }}>
              <h1 className="text-center text-primary my-3">BÁO CÁO</h1>
              <fieldset
                className="form-input shadow mx-auto my-5"
                style={{ width: "97%", height: "95%" }}
              >
                <legend className="float-none w-auto px-3">
                  <h2>Báo cáo tổng hợp</h2>
                </legend>
                <h5>Thời gian xuất báo cáo</h5>
                <div className="row col-12 justify-content-center p-3">
                  <div className="col-2">
                    <label className="p-2">Từ ngày</label>
                  </div>
                  <div className="col-3">
                    <input className="form-control" type="date" />
                  </div>
                  <div className="col-2">
                    <label className="p-2">Đến ngày</label>
                  </div>
                  <div className="col-3 d-flex justify-content-center">
                    <input className="form-control" type="date" />
                  </div>
                  <div className="col-2">
                    <button className="btn btn-outline-primary">
                      <AiOutlinePrinter className="mx-1" />
                      Xuất excel
                    </button>
                  </div>
                </div>
                <div className=" col-12 my-5  justify-content-center">
                  <h5>Loại báo cáo</h5>
                  <div className="d-flex justify-content-center p-3">
                    <div className="mx-5">
                      <h5>Thu chi - Công nợ</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="revenue"
                        />
                        <label className="form-check-label" htmlFor="revenue">
                          Báo cáo doanh thu
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="profit"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="profit">
                          Báo cáo lợi nhuận
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="debt"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="debt">
                          Báo cáo công nợ
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="saleDiary"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="saleDiary">
                          Nhật kí bán hàng
                        </label>
                      </div>
                    </div>
                    <div className="mx-5 ">
                      <h5>Danh sách, phân tích</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="needImportProduct"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="needImportProduct"
                        >
                          Báo cáo thuốc cần nhập thêm
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="expireProduct"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="expireProduct"
                        >
                          Báo cáo thuốc sắp hết hạn
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="generalReport"
                          id="bestSellerProduct"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="bestSellerProduct"
                        >
                          100 thuốc bán chạy nhất
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="justify-content-center mx-auto"
                  style={{ width: "95%", height: "95%" }}
                >
                  <Link to="/home">
                    <button className="btn btn-outline-primary float-end mx-3">
                      <AiOutlineRollback className="mx-1" />
                      Trở về
                    </button>
                  </Link>
                  <Link
                    to={"/dashboard/report/chart"}
                    className="btn btn-outline-primary float-end"
                  >
                    <AiOutlineLineChart className="mx-1" />
                    Biểu đồ
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default GeneralReport;
