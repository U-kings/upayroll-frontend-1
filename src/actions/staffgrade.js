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
import { cookieTokenValidFunc } from "./auth";
import { hrGetSalaryLevelsFunc } from "./salarylevel";
import { hrGetSalaryStepsFunc } from "./salarysteps";
import axios from "axios";

export const hrGetAllStaffGradesFunc = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: HR_GET_STAFFGRADE_REQUEST });
    const { data } = await axios.get(`/api/salarygrade`);
    dispatch({ type: HR_GET_STAFFGRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_GET_STAFFGRADE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const hrCreateStaffGradeFunc = (FormData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: HR_CREATE_STAFFGRADE_REQUEST });
    const body = JSON.stringify(FormData);
    await axios.post(`/api/salarygrade`, body, config);
    dispatch({ type: HR_CREATE_STAFFGRADE_SUCCESS });
    dispatch(hrGetAllStaffGradesFunc());
    dispatch(hrGetSalaryStepsFunc());
    dispatch(hrGetSalaryLevelsFunc());
  } catch (error) {
    dispatch({
      type: HR_CREATE_STAFFGRADE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const hrUpdateStaffGradeFunc =
  (salaryGradeId, formData) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: HR_UPDATE_STAFFGRADE_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(`/api/salarygrade/${salaryGradeId}`, body, config);
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
    dispatch(cookieTokenValidFunc());

    try {
      dispatch({ type: HR_DELETE_STAFFGRADE_BY_ID_REQUEST });
      await axios.delete(`/api/salarygrade/${salaryGradeId}`);
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
