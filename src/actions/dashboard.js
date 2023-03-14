import axios from "axios";
import {
  GET_DASHBOARD_REPORTS_RESULT_FAIL,
  GET_DASHBOARD_REPORTS_RESULT_REQUEST,
  GET_DASHBOARD_REPORTS_RESULT_SUCCESS,
} from "../types/dashboard";
import { cookieTokenValidFunc } from "./auth";
export const getDashboardReportSummaryFunc = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: GET_DASHBOARD_REPORTS_RESULT_REQUEST });
    const { data } = await axios.get(`/api/dashboard`);
    dispatch({
      type: GET_DASHBOARD_REPORTS_RESULT_SUCCESS,
      payload: data?.reports,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_REPORTS_RESULT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
