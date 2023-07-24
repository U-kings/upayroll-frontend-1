import axios from "axios";
import cookie from "js-cookie";
import {
  HR_CREATE_STEPS_FAIL,
  HR_CREATE_STEPS_REQUEST,
  HR_CREATE_STEPS_SUCCESS,
  HR_DELETE_STEPS_BY_ID_FAIL,
  HR_DELETE_STEPS_BY_ID_REQUEST,
  HR_DELETE_STEPS_BY_ID_SUCCESS,
  HR_GET_STEPS_FAIL,
  HR_GET_STEPS_REQUEST,
  HR_GET_STEPS_SUCCESS,
  HR_GET_STEPS_BY_SALARYLEVEL_FAIL,
  HR_GET_STEPS_BY_SALARYLEVEL_REQUEST,
  HR_GET_STEPS_BY_SALARYLEVEL_SUCCESS,
} from "../types/salarysteps";

import { urlConfig } from "../util/config/config";

export const hrGetSalaryStepsFunc =
  (salaryLevelId = "") =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (salaryLevelId) {
      dispatch(hrGetSalaryStepBySalaryLevelFunc(salaryLevelId));
    } else {
      try {
        dispatch({ type: HR_GET_STEPS_REQUEST });
        const { data } = await axios.get(`${urlConfig.proxyUrl.PROXYURL}api/salarystep`, config);
        dispatch({ type: HR_GET_STEPS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: HR_GET_STEPS_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    }
  };

export const hrGetSalaryStepBySalaryLevelFunc =
  (salaryLevelId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: HR_GET_STEPS_BY_SALARYLEVEL_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/salarystep/${salaryLevelId}`,
        config
      );
      dispatch({ type: HR_GET_STEPS_BY_SALARYLEVEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: HR_GET_STEPS_BY_SALARYLEVEL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrCreateSalaryStepFunc =
  (salaryLevelId, salaryGradeId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_CREATE_STEPS_REQUEST });
      const body = JSON.stringify(formData);
      await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/salarystep/${salaryLevelId}/${salaryGradeId}`,
        body,
        config
      );
      dispatch({ type: HR_CREATE_STEPS_SUCCESS });
      dispatch(hrGetSalaryStepsFunc());
    } catch (error) {
      dispatch({
        type: HR_CREATE_STEPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrDeleteSalaryStepFunc = (salaryStepId) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: HR_DELETE_STEPS_BY_ID_REQUEST });
    await axios.delete(`${urlConfig.proxyUrl.PROXYURL}api/salarystep/${salaryStepId}`, config);
    dispatch({ type: HR_DELETE_STEPS_BY_ID_SUCCESS });
    dispatch(hrGetSalaryStepsFunc());
  } catch (error) {
    dispatch({
      type: HR_DELETE_STEPS_BY_ID_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
