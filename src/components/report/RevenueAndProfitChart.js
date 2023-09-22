import { AiOutlineLineChart, AiOutlineRollback } from "react-icons/ai";
import "./Report.css";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  getProfit,
  getRevenue,
  getSumReport,
} from "../../services/report/ReportService";
import { format, parseISO } from "date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const RevenueAndProfitChart = () => {
  const [revenues, setRevenue] = useState([]);
  const [profits, setProfit] = useState([]);
  const [sumReport, setSumReport] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let mes = "";
  const drawChart = (revenue, profit) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Biểu đồ doanh thu - lợi nhuận",
          font: {
            size: 30,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    let finishDate = new Date(endDate);
    let dates = [];
    let revenueData = [];
    let profitData = [];

    // Tạo mảng các ngày từ startDate đến endDate
    let currentDate = new Date(startDate);
    while (currentDate <= finishDate) {
      dates.push(currentDate.toISOString().slice(0, 10)); // Lưu ý: Chỉ lấy phần ngày tháng (YYYY-MM-DD)
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Sắp xếp mảng các ngày theo thứ tự tăng dần
    dates.sort((a, b) => new Date(a) - new Date(b));
    if (revenue != [] || profit != []) {
      mes = "";
      // Lặp qua mảng các ngày đã sắp xếp và kiểm tra dữ liệu doanh thu
      dates.forEach((date) => {
        const revenueObj = revenue.find((item) => item.sellDate === date);
        const profitObj = profit.find((item) => item.sellDate === date);
        if (revenueObj) {
          revenueData.push(revenueObj.total);
        } else {
          revenueData.push(0); // Hoặc có thể sử dụng 0 nếu biểu đồ yêu cầu
        }
        if (profitObj) {
          profitData.push(profitObj.total);
        } else {
          profitData.push(0); // Hoặc có thể sử dụng 0 nếu biểu đồ yêu cầu
        }
        console.log(revenueObj);
      });
    } else {
      mes = "Không có dữ liệu";
    }

    const labels = dates.map((item) => format(parseISO(item), "dd/MM/yyyy"));

    const data = {
      labels,
      datasets: [
        {
          label: "Doanh thu",
          // data: revenue.map((item) => item.total),
          data: revenueData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Lợi nhuận",
          // data: profit.map((item) => item.total),
          data: profitData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    console.log(data);

    return <Line options={options} data={data} />;
  };

  const handleSubmit = async (values, setErrors) => {
    try {
      const revenueResult = await getRevenue(values.startDate, values.endDate);
      const profitResult = await getProfit(values.startDate, values.endDate);
      const sumReportResult = await getSumReport(
        values.startDate,
        values.endDate
      );
      setRevenue(revenueResult);
      setProfit(profitResult);
      setSumReport(sumReportResult);
      setStartDate(values.startDate);
      setEndDate(values.endDate);
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        setErrors(err.response.data);
      }
      setRevenue([]);
      setProfit([]);
      setSumReport([]);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          startDate: "",
          endDate: "",
        }}
        onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
      >
        <div className="container-fluid row">
          <div className=" col-12 my-3 ">
            <h1 className="text-center text-primary my-3 ">
              BIỂU ĐỒ DOANH THU - LỢI NHUẬN
            </h1>
            <div className="row">
              <div className="col-4">
                <Form>
                  <div className="row ">
                    <fieldset
                      className="form-input shadow mx-auto my-3"
                      style={{ width: "97%", height: "40%" }}
                    >
                      <legend className="float-none w-auto px-3">
                        <h5>Thời gian xuất báo cáo</h5>
                      </legend>
                      <label htmlFor="startDate">Từ ngày</label>
                      <Field
                        className="form-control"
                        type="date"
                        placeholder="Chọn ngày bắt đầu"
                        id="startDate"
                        name="startDate"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="startDate"
                        component="small"
                      />
                      <label htmlFor="endDate">Đến ngày</label>
                      <Field
                        className="form-control "
                        type="date"
                        placeholder="Chọn ngày kết thúc"
                        id="endDate"
                        name="endDate"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="endDate"
                        component="small"
                      />
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-primary my-3"
                        >
                          <AiOutlineLineChart className="mx-1" />
                          Biểu đồ
                        </button>
                      </div>
                    </fieldset>
                  </div>
                </Form>
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
                        <p> {sumReport.sumRevenue} VNĐ</p>
                      </div>
                      <div className="col-5">
                        <p>Lợi nhuận</p>
                      </div>
                      <div className="col-7">
                        <p> {sumReport.sumProfit} VNĐ</p>
                      </div>
                      <div className="col-5">
                        <p>Doanh thu TB</p>
                      </div>
                      <div className="col-7">
                        <p> {sumReport.averageRevenue} VNĐ</p>
                      </div>
                      <div className="col-5">
                        <p>Lợi nhuận TB</p>
                      </div>
                      <div className="col-7">
                        <p> {sumReport.averageProfit} VNĐ</p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="col-8">
                <div className="row">
                  <fieldset
                    className="form-input shadow mx-auto my-3"
                    style={{ width: "97%", height: "100%" }}
                  >
                    <legend className="float-none w-auto px-3">
                      <h5>Biểu đồ</h5>
                    </legend>
                    {drawChart(revenues, profits)}
                    <div style={{ height: "20px" }}>
                      <p style={{ textAlign: "center", color: "red" }}>{mes}</p>
                    </div>
                  </fieldset>
                </div>
                <Link
                  to={"/dashboard/report"}
                  className="btn btn-outline-primary float-end"
                >
                  <AiOutlineRollback className="mx-1" />
                  Trở về
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};
export default RevenueAndProfitChart;
