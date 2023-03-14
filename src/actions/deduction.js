import axios from "axios";
import {
  ADMIN_GET_ALL_DEDUCTIONS_FAIL,
  ADMIN_GET_ALL_DEDUCTIONS_REQUEST,
  ADMIN_GET_ALL_DEDUCTIONS_SUCCESS,
  ADMIN_CREATE_DEDUCTION_FAIL,
  ADMIN_CREATE_DEDUCTION_REQUEST,
  ADMIN_CREATE_DEDUCTION_SUCCESS,
  ADMIN_DELETE_DEDUCTION_BY_ID_FAIL,
  ADMIN_DELETE_DEDUCTION_BY_ID_REQUEST,
  ADMIN_DELETE_DEDUCTION_BY_ID_SUCCESS,
  ADMIN_UPDATE_DEDUCTION_BY_ID_FAIL,
  ADMIN_UPDATE_DEDUCTION_BY_ID_REQUEST,
  ADMIN_UPDATE_DEDUCTION_BY_ID_SUCCESS,
} from "../types/deduction";

import { cookieTokenValidFunc } from "./auth";

export const adminGetAllDeduction = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({
      type: ADMIN_GET_ALL_DEDUCTIONS_REQUEST,
    });
    const { data } = await axios.get(`/api/deductions`);
    dispatch({
      type: ADMIN_GET_ALL_DEDUCTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_DEDUCTIONS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminCreateDeduction = (formData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_DEDUCTION_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`/api/deductions`, body, config);
    dispatch({
      type: ADMIN_CREATE_DEDUCTION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_DEDUCTION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateDeductionById =
  (deductionId, formData) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({
        type: ADMIN_UPDATE_DEDUCTION_BY_ID_REQUEST,
      });

      const body = JSON.stringify(formData);
      await axios.patch(`/api/deductions/${deductionId}`, body, config);
      dispatch({
        type: ADMIN_UPDATE_DEDUCTION_BY_ID_SUCCESS,
      });
      dispatch(adminGetAllDeduction());
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_DEDUCTION_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteDeductionById = (deductionId) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({
      type: ADMIN_DELETE_DEDUCTION_BY_ID_REQUEST,
    });
    await axios.delete(`/api/deductions/${deductionId}`);
    dispatch({
      type: ADMIN_DELETE_DEDUCTION_BY_ID_SUCCESS,
    });
    dispatch(adminGetAllDeduction());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_DEDUCTION_BY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
