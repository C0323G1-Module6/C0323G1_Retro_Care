import axios from "axios";

export const getReport = async (startDate, endDate, reportName) => {
  const result = await axios.get(
    `http://localhost:8080/api/report/general/?startDate=${startDate}&endDate=${endDate}&reportName=${reportName}`
  );
  return result.data;
};

export const getRevenue = async (startDate, endDate) => {
  const result = await axios.get(
    `http://localhost:8080/api/report/chart/revenue/?startDate=${startDate}&endDate=${endDate}`
  );
  return result.data;
};

export const getProfit = async (startDate, endDate) => {
  const result = await axios.get(
    `http://localhost:8080/api/report/chart/profit/?startDate=${startDate}&endDate=${endDate}`
  );
  console.log(result.data);
  return result.data;
};

export const getSumReport = async (startDate, endDate) => {
  const result = await axios.get(
    `http://localhost:8080/api/report/sum/?startDate=${startDate}&endDate=${endDate}`
  );
  console.log(result.data);
  return result.data;
};
