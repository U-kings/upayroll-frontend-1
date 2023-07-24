import axios from "axios";
import cookie from "js-cookie";
import {
  HR_GET_SALARYLEVEL_FAIL,
  HR_GET_SALARYLEVEL_REQUEST,
  HR_GET_SALARYLEVEL_SUCCESS,
  HR_CREATE_SALARYLEVEL_FAIL,
  HR_CREATE_SALARYLEVEL_REQUEST,
  HR_CREATE_SALARYLEVEL_SUCCESS,
  HR_DELETE_SALARYLEVEL_BY_ID_FAIL,
  HR_DELETE_SALARYLEVEL_BY_ID_REQUEST,
  HR_DELETE_SALARYLEVEL_BY_ID_SUCCESS,
  HR_UPDATE_SALARYLEVEL_BY_ID_FAIL,
  HR_UPDATE_SALARYLEVEL_BY_ID_REQUEST,
  HR_UPDATE_SALARYLEVEL_BY_ID_SUCCESS,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_FAIL,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_REQUEST,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_SUCCESS,
} from "../types/salarylevel";
// import { cookieTokenValidFunc } from "./auth";

import { urlConfig } from "../util/config/config";

export const hrGetSalaryLevelsFunc =
  (salaryGradeId = "") =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (salaryGradeId) {
      dispatch(hrGetSalaryLevelBySalaryGradeFunc(salaryGradeId));
    } else {
      try {
        dispatch({ type: HR_GET_SALARYLEVEL_REQUEST });
        const { data } = await axios.get(`${urlConfig.proxyUrl.PROXYURL}api/salarylevel`, config);
        dispatch({ type: HR_GET_SALARYLEVEL_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: HR_GET_SALARYLEVEL_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    }
  };

export const hrGetSalaryLevelBySalaryGradeFunc =
  (salaryGradeId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: HR_GET_SALARYLEVEL_BY_SALARYGRADE_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/salarylevel/${salaryGradeId}/grade`,
        config
      );
      dispatch({
        type: HR_GET_SALARYLEVEL_BY_SALARYGRADE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HR_GET_SALARYLEVEL_BY_SALARYGRADE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrCreateSalaryLevelFunc =
  (salaryGradeId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_CREATE_SALARYLEVEL_REQUEST });
      const body = JSON.stringify(formData);
      await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/salarylevel/${salaryGradeId}/create`,
        body,
        config
      );
      dispatch({ type: HR_CREATE_SALARYLEVEL_SUCCESS });
      dispatch(hrGetSalaryLevelsFunc());
    } catch (error) {
      dispatch({
        type: HR_CREATE_SALARYLEVEL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrUpdateSalaryLevelFunc =
  (salaryLevelId, salaryGradeId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_UPDATE_SALARYLEVEL_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/salarylevel/${salaryLevelId}/${salaryGradeId}`,
        body,
        config
      );
      dispatch({ type: HR_UPDATE_SALARYLEVEL_BY_ID_SUCCESS });
      dispatch(hrGetSalaryLevelsFunc());
    } catch (error) {
      dispatch({
        type: HR_UPDATE_SALARYLEVEL_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrDeleteSalaryLevelByIdFunc =
  (salaryLevelId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_DELETE_SALARYLEVEL_BY_ID_REQUEST });
      await axios.delete(
        `${urlConfig.proxyUrl.PROXYURL}api/salarylevel/${salaryLevelId}`,
        config
      );
      dispatch({ type: HR_DELETE_SALARYLEVEL_BY_ID_SUCCESS });
      dispatch(hrGetSalaryLevelsFunc());
    } catch (error) {
      dispatch({
        type: HR_DELETE_SALARYLEVEL_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
