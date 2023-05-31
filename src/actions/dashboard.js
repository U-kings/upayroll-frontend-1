import axios from "axios";
import cookie from "js-cookie";
import {
  GET_DASHBOARD_REPORTS_RESULT_FAIL,
  GET_DASHBOARD_REPORTS_RESULT_REQUEST,
  GET_DASHBOARD_REPORTS_RESULT_SUCCESS,
} from "../types/dashboard";

const proxyUrl = process.env.REACT_APP_PROXY_URL;

// import { cookieTokenValidFunc } from "./auth";
export const getDashboardReportSummaryFunc = () => async (dispatch) => {
  const token = cookie.get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: GET_DASHBOARD_REPORTS_RESULT_REQUEST });
    const { data } = await axios.get(`${proxyUrl}/api/dashboard`, config);
    dispatch({
      type: GET_DASHBOARD_REPORTS_RESULT_SUCCESS,
      payload: data?.reports,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_REPORTS_RESULT_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
