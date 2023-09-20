import axios from "axios";

export const getReport = async (reportName, validateDto) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/report/general?reportName=" + reportName,
      validateDto
    );
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getRevenue = async (validateDto) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/report/chart/revenue",
      validateDto
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getProfit = async (validateDto) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/report/chart/profit",
      validateDto
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};
