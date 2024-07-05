import axios from "axios";
import cookie from "js-cookie";
import {
  HR_GET_STAFFGRADE_FAIL,
  HR_GET_STAFFGRADE_REQUEST,
  HR_GET_STAFFGRADE_SUCCESS,
  HR_CREATE_STAFFGRADE_FAIL,
  HR_CREATE_STAFFGRADE_REQUEST,
  HR_CREATE_STAFFGRADE_SUCCESS,
  HR_DELETE_STAFFGRADE_BY_ID_FAIL,
  HR_DELETE_STAFFGRADE_BY_ID_REQUEST,
  HR_DELETE_STAFFGRADE_BY_ID_SUCCESS,
  HR_UPDATE_STAFFGRADE_BY_ID_FAIL,
  HR_UPDATE_STAFFGRADE_BY_ID_REQUEST,
  HR_UPDATE_STAFFGRADE_BY_ID_SUCCESS,
} from "../types/staffgrade";
// import { cookieTokenValidFunc } from "./auth";
import { hrGetSalaryLevelsFunc } from "./salarylevel";
import { hrGetSalaryStepsFunc } from "./salarysteps";

import { urlConfig } from "../util/config/config";

export const hrGetAllStaffGradesFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: HR_GET_STAFFGRADE_REQUEST });
    const { data } = await axios.get(`${urlConfig.url.PROXYURL}api/salarygrade`, config);
    dispatch({ type: HR_GET_STAFFGRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_GET_STAFFGRADE_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const hrCreateStaffGradeFunc = (FormData) => async (dispatch) => {
  const token = cookie.get("token");
  const companyId = cookie.get("companyId");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: HR_CREATE_STAFFGRADE_REQUEST });
    const body = JSON.stringify({...FormData, companyId : companyId});
    await axios.post(`${urlConfig.url.PROXYURL}api/salarygrade`, body, config);
    dispatch({ type: HR_CREATE_STAFFGRADE_SUCCESS });
    dispatch(hrGetAllStaffGradesFunc());
    dispatch(hrGetSalaryStepsFunc());
    dispatch(hrGetSalaryLevelsFunc());
  } catch (error) {
    dispatch({
      type: HR_CREATE_STAFFGRADE_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const hrUpdateStaffGradeFunc =
  (salaryGradeId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_UPDATE_STAFFGRADE_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/salarygrade/${salaryGradeId}`,
        body,
        config
      );
      dispatch({ type: HR_UPDATE_STAFFGRADE_BY_ID_SUCCESS });
      dispatch(hrGetAllStaffGradesFunc());
      dispatch(hrGetSalaryStepsFunc());
      dispatch(hrGetSalaryLevelsFunc());
    } catch (error) {
      dispatch({
        type: HR_UPDATE_STAFFGRADE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrDeleteStaffGradeByIdFunc =
  (salaryGradeId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_DELETE_STAFFGRADE_BY_ID_REQUEST });
      await axios.delete(
        `${urlConfig.url.PROXYURL}api/salarygrade/${salaryGradeId}`,
        config
      );
      dispatch({ type: HR_DELETE_STAFFGRADE_BY_ID_SUCCESS });
      dispatch(hrGetAllStaffGradesFunc());
      dispatch(hrGetSalaryStepsFunc());
      dispatch(hrGetSalaryLevelsFunc());
    } catch (error) {
      dispatch({
        type: HR_DELETE_STAFFGRADE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
