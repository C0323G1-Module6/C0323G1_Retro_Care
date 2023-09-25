import { Link } from "react-router-dom";
import "./Report.css";

import {
  AiOutlineLineChart,
  AiOutlinePrinter,
  AiOutlineRollback,
} from "react-icons/ai";
import { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { getReport } from "../../services/report/ReportService";
import ExcelJS from "exceljs";
import { parseISO, format } from "date-fns";

const GeneralReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [revenue, setRevenue] = useState([]);
  const [profit, setProfit] = useState([]);
  const [bestSellerMedicine, setBestSellerMedicine] = useState([]);
  const [debt, setDebt] = useState([]);
  const [expireMedicine, setExpireMedicine] = useState([]);
  const [medicineNeedMore, setMedicineNeedMore] = useState([]);
  const [saleDiary, setSaleDiary] = useState([]);
  const [message, setMessage] = useState("");
  let currentDate = format(new Date(), "dd/MM/yyyy");

  const exportExcel = (dataArray, sheetName, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Tạo Title
    let titleName = "";
    switch (sheetName) {
      case "revenue":
        titleName = "BÁO CÁO TỔNG HỢP DOANH THU";
        break;
      case "profit":
        titleName = "BÁO CÁO TỔNG HỢP LỢI NHUẬN";
        break;
      case "bestSellerMedicine":
        titleName = "BÁO CÁO TỔNG HỢP SẢN PHẨM BÁN CHẠY NHẤT";
        break;
      case "debt":
        titleName = "BÁO CÁO TỔNG HỢP CÔNG NỢ VỚI NHÀ CUNG CẤP";
        break;
      case "expireMedicine":
        titleName = "BÁO CÁO TỔNG HỢP CÁC LOẠI THUỐC GẦN HẾT HẠN SỬ DỤNG";
        break;
      case "medicineNeedMore":
        titleName = "BÁO CÁO TỔNG HỢP CÁC LOẠI THUỐC CẦN NHẬP THÊM";
        break;
      case "saleDiary":
        titleName = "BÁO CÁO TỔNG HỢP NHẬT KÍ BÁN HÀNG";
        break;
      default:
        break;
    }

    const titleRow = worksheet.addRow([titleName]);
    worksheet.mergeCells(1, 1, 1, 3);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: "center" };

    const reportDate = worksheet.addRow(["Ngày xuất báo cáo: " + currentDate]);
    reportDate.font = { bold: true, size: 12 };

    worksheet.addRow();
    console.log(dataArray[0]);

    console.log(Object.keys(dataArray[0]));

    // Tạo header
    let headers = Object.keys(dataArray[0]).map(
      (header) => {
        switch (header) {
          case "sellDate":
            return header = "NGÀY BÁN";
          case "total":
            return header = "TỔNG TIỀN (VNĐ)";
          case "id":
            return header = "MÃ";
          case "name":
            return header = "TÊN";
          case "quantity":
            return header = "SỐ LƯỢNG HIỆN CÓ";
          case "amount":
            return header = "SỐ LƯỢNG ĐÃ BÁN";
          case "company":
            return header = "TÊN CÔNG TY";
          case "expiry":
            return header = "HẠN SỬ DỤNG";
          default:
            return header.toUpperCase();
        }
      }
    );
    headers = headers.reverse();
    console.log(headers);

    const headersRow = worksheet.addRow(headers);
    const borderStyle = {
      style: "thin",
      color: { argb: "000000" },
    };

    headersRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" }, // Màu nền của header
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle,
      };
    });

    headersRow.font = { bold: true, name: "Arial", size: 12 };

    // Thêm dữ liệu
    dataArray.forEach((item, index) => {
      let row = Object.values(item);
      row = row.reverse();
      const dataRow = worksheet.addRow(row);
      const fillColor = index % 2 === 0 ? "FFC0C0C0" : "FFD3D3D3";
      dataRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: fillColor }, // Mẫu màu nền cho dòng dữ liệu
        };
        cell.border = {
          top: borderStyle,
          left: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
        };
      });
    });

    worksheet.columns.forEach((column) => {
      column.width = 30;
      // Độ rộng mong muốn cho các cột
    });

    // Xuất tệp Excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleSubmit = async (values, setErrors) => {
    try {
      const result = await getReport(
        values.startDate,
        values.endDate,
        values.reportName
      );
      setMessage("");
      let fileName = values.reportName + " " + currentDate + ".xlsx";
      const reportTitle = values.reportName;
      let newResult = [];
      if (
        reportTitle === "revenue" ||
        reportTitle === "profit" ||
        reportTitle === "saleDiary"
      ) {
        newResult = result.map((item) => ({
          ...item,
          sellDate: format(parseISO(item.sellDate), "dd/MM/yyyy"),
          total:
            new Intl.NumberFormat("vi-VN")
              .format(Math.ceil(item.total))
              .toString()
        }));
      }
      if (reportTitle === "expireMedicine") {
        newResult = result.map((item) => ({
          ...item,
          expiry: format(parseISO(item.expiry), "dd/MM/yyyy"),
        }));
      }
      if (reportTitle === "debt") {
        newResult = result.map((item) => ({
          ...item,
          total:
            new Intl.NumberFormat("vi-VN")
              .format(Math.ceil(item.total))
              .toString()
        }));
      }
      if (
        reportTitle === "bestSellerMedicine" ||
        reportTitle === "medicineNeedMore"
      ) {
        newResult = result.map((item) => ({
          ...item,
        }));
      }

      exportExcel(newResult, values.reportName, fileName);
    } catch (err) {
      setMessage("Không có dữ liệu để hiển thị");
      if (err) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          startDate: "",
          endDate: "",
          reportName: "revenue",
        }}
        onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mx-auto" style={{ width: "90%" }}>
                <h1 className="text-center text-primary my-3">BÁO CÁO</h1>
                <Form>
                  <fieldset
                    className="form-input-report shadow mx-auto my-5"
                    style={{ width: "97%", height: "95%" }}
                  >
                    <legend className="float-none w-auto px-3">
                      <h2>Báo cáo tổng hợp</h2>
                    </legend>
                    <h5>Thời gian xuất báo cáo</h5>
                    <div className="row justify-content-center py-3">
                      <div className="d-flex">
                        <div className="col-2 h-75">
                          <label className="p-2">Từ ngày</label>
                        </div>
                        <div className="col-3 h-75">
                          <Field
                            className="form-control"
                            type="date"
                            name="startDate"
                            id="startDate"
                          />
                          <div className="my-2" style={{ height: "16px" }}>
                            <ErrorMessage
                              className="text-danger"
                              name="startDate"
                              component="small"
                            />
                          </div>
                        </div>
                        <div className="col-2 h-75">
                          <label className="p-2">Đến ngày</label>
                        </div>
                        <div className="col-3 h-75">
                          <Field
                            className="form-control"
                            type="date"
                            name="endDate"
                            id="endDate"
                          />
                          <div className="my-2" style={{ height: "16px" }}>
                            <ErrorMessage
                              className="text-danger"
                              name="endDate"
                              component="small"
                            />
                          </div>
                        </div>
                        <div className="col-2 h-75 mx-2">
                          <button
                            type="submit"
                            className="btn btn-outline-primary"
                          >
                            <AiOutlinePrinter className="mx-1" />
                            Xuất excel
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row justify-content-center py-3 text-danger"
                      style={{ height: "14px" }}
                    >
                      <small style={{ textAlign: "center" }}>{message}</small>
                    </div>
                    <div className=" col-12 my-5  justify-content-center">
                      <h5>Loại báo cáo</h5>
                      <div className="d-flex justify-content-center p-3">
                        <div className="mx-5">
                          <h5>Thu chi - Công nợ</h5>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="revenue"
                              value="revenue"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="revenue"
                            >
                              Báo cáo doanh thu
                            </label>
                          </div>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="profit"
                              value="profit"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="profit"
                            >
                              Báo cáo lợi nhuận
                            </label>
                          </div>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="debt"
                              value="debt"
                            />
                            <label className="form-check-label" htmlFor="debt">
                              Báo cáo công nợ
                            </label>
                          </div>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="saleDiary"
                              value="saleDiary"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="saleDiary"
                            >
                              Nhật kí bán hàng
                            </label>
                          </div>
                        </div>
                        <div className="mx-5 ">
                          <h5>Danh sách, phân tích</h5>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="medicineNeedMore"
                              value="medicineNeedMore"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="medicineNeedMore"
                            >
                              Báo cáo thuốc cần nhập thêm
                            </label>
                          </div>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="expireMedicine"
                              value="expireMedicine"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="expireMedicine"
                            >
                              Báo cáo thuốc sắp hết hạn
                            </label>
                          </div>
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="reportName"
                              id="bestSellerMedicine"
                              value="bestSellerMedicine"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="bestSellerMedicine"
                            >
                              100 thuốc bán chạy nhất
                            </label>
                            <ErrorMessage
                              className="text-danger"
                              name="reportName"
                              component="small"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="justify-content-center mx-auto"
                      style={{ width: "95%", height: "95%" }}
                    >
                      <Link
                        to={"/home"}
                        className="btn btn-outline-primary float-end mx-3"
                      >
                        <AiOutlineRollback className="mx-1" />
                        Trở về
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};
export default GeneralReport;
