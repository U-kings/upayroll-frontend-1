import axios from "axios";
import cookie from "js-cookie";
import {
  HR_CREATE_JUNIOR_STAFF_GRADE_FAIL,
  HR_CREATE_JUNIOR_STAFF_GRADE_REQUEST,
  HR_CREATE_JUNIOR_STAFF_GRADE_SUCCESS,
  HR_CREATE_MIDDLE_STAFF_GRADE_FAIL,
  HR_CREATE_MIDDLE_STAFF_GRADE_REQUEST,
  HR_CREATE_MIDDLE_STAFF_GRADE_SUCCESS,
  HR_CREATE_SENIOR_STAFF_GRADE_FAIL,
  HR_CREATE_SENIOR_STAFF_GRADE_REQUEST,
  HR_CREATE_SENIOR_STAFF_GRADE_SUCCESS,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_FAIL,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_REQUEST,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_SUCCESS,
  HR_CREATE_CONTRACT_STAFF_GRADE_REQUEST,
  HR_CREATE_CONTRACT_STAFF_GRADE_SUCCESS,
  HR_CREATE_CONTRACT_STAFF_GRADE_FAIL,
} from "../types/salarystructrue";

import { urlConfig } from "../util/config/config";

export const hrCreateJuniorStaffGradeFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: HR_CREATE_JUNIOR_STAFF_GRADE_REQUEST });
    const body = formData;
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/salarygrade/junior-grade-paystructure/bulk`,
      body,
      config
    );
    dispatch({ type: HR_CREATE_JUNIOR_STAFF_GRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_CREATE_JUNIOR_STAFF_GRADE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const hrCreateMiddleStaffGradeFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: HR_CREATE_MIDDLE_STAFF_GRADE_REQUEST });
    const body = formData;
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/salarygrade/middle-grade-paystructure/bulk`,
      body,
      config
    );
    dispatch({ type: HR_CREATE_MIDDLE_STAFF_GRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_CREATE_MIDDLE_STAFF_GRADE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const hrCreateSeniorStaffGradeFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: HR_CREATE_SENIOR_STAFF_GRADE_REQUEST });
    const body = formData;
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/salarygrade/senior-grade-paystructure/bulk`,
      body,
      config
    );
    dispatch({ type: HR_CREATE_SENIOR_STAFF_GRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_CREATE_SENIOR_STAFF_GRADE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const hrCreateManagementStaffGradeFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: HR_CREATE_MANAGEMENT_STAFF_GRADE_REQUEST });
      const body = formData;
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/salarygrade/management-grade-paystructure/bulk`,
        body,
        config
      );
      dispatch({
        type: HR_CREATE_MANAGEMENT_STAFF_GRADE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HR_CREATE_MANAGEMENT_STAFF_GRADE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrCreateContractStaffGradeFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: HR_CREATE_CONTRACT_STAFF_GRADE_REQUEST });
      const body = formData;
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/salarygrade/contract-grade-paystructure/bulk`,
        body,
        config
      );
      dispatch({
        type: HR_CREATE_CONTRACT_STAFF_GRADE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HR_CREATE_CONTRACT_STAFF_GRADE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
