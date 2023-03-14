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
import axios from "axios";
import { cookieTokenValidFunc } from "./auth";

export const hrGetSalaryLevelsFunc =
  (salaryGradeId = "") =>
  async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    if (salaryGradeId) {
      dispatch(hrGetSalaryLevelBySalaryGradeFunc(salaryGradeId));
    } else {
      try {
        dispatch({ type: HR_GET_SALARYLEVEL_REQUEST });
        const { data } = await axios.get(`/api/salarylevel`);
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
    try {
      dispatch({ type: HR_GET_SALARYLEVEL_BY_SALARYGRADE_REQUEST });
      const { data } = await axios.get(
        `/api/salarylevel/${salaryGradeId}/grade`
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
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: HR_CREATE_SALARYLEVEL_REQUEST });
      const body = JSON.stringify(formData);
      await axios.post(
        `/api/salarylevel/${salaryGradeId}/create`,
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
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: HR_UPDATE_SALARYLEVEL_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(
        `/api/salarylevel/${salaryLevelId}/${salaryGradeId}`,
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
    dispatch(cookieTokenValidFunc());

    try {
      dispatch({ type: HR_DELETE_SALARYLEVEL_BY_ID_REQUEST });
      await axios.delete(`/api/salarylevel/${salaryLevelId}`);
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
