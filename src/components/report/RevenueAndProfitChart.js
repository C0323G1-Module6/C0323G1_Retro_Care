import { AiOutlineLineChart, AiOutlineRollback } from "react-icons/ai";
import "./Report.css";
import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
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
import { getProfit, getRevenue } from "../../services/report/ReportService";
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenues, setRevenue] = useState([]);
  const [profits, setProfit] = useState([]);
  const [periodRevenue, setPeriodRevenue] = useState(0);
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
    const labels = revenue.map((item) =>
      format(parseISO(item.sellDate), "dd/MM/yyyy")
    );
    console.log(labels);
    const data = {
      labels,
      datasets: [
        {
          label: "Doanh thu",
          data: revenue.map((item) => item.total),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Lợi nhuận",
          data: profit.map((item) => item.total),
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
      setRevenue(revenueResult);
      setProfit(profitResult);
      setStartDate(values.startDate);
      setEndDate(values.endDate);
    } catch (err) {
      if (err.response.data) {
        setErrors(err.response.data);
      }
    }
  };
  console.log(periodRevenue);
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
                      <label htmlFor="endDate">Đến ngày</label>
                      <Field
                        className="form-control "
                        type="date"
                        placeholder="Chọn ngày kết thúc"
                        id="endDate"
                        name="endDate"
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
                        <p> {periodRevenue} VNĐ</p>
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
                    style={{ width: "97%", height: "100%" }}
                  >
                    <legend className="float-none w-auto px-3">
                      <h5>Biểu đồ</h5>
                    </legend>
                    {drawChart(revenues, profits)}
                    <Link
                      to={"/dashboard/generalReport"}
                      className="btn btn-outline-primary float-end mx-3 mt-4"
                    >
                      <AiOutlineRollback className="mx-1" />
                      Trở về
                    </Link>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};
export default RevenueAndProfitChart;