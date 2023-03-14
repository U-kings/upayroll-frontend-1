import {
  HR_GET_BASEPAY_FAIL,
  HR_GET_BASEPAY_REQUEST,
  HR_GET_BASEPAY_SUCCESS,
  HR_CREATE_BASEPAY_FAIL,
  HR_CREATE_BASEPAY_REQUEST,
  HR_CREATE_BASEPAY_SUCCESS,
  HR_UPDATE_BASEPAY_BY_ID_FAIL,
  HR_UPDATE_BASEPAY_BY_ID_REQUEST,
  HR_UPDATE_BASEPAY_BY_ID_SUCCESS,
} from "../types/basepay";

import axios from "axios";

import { cookieTokenValidFunc } from "../actions/auth";
import {
  hrGetSalaryStepsFunc,
} from "./salarysteps";

export const hrGetBasePayFunc = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  try {
    dispatch({ type: HR_GET_BASEPAY_REQUEST });
    const { data } = await axios.get(`/api/basepay`);
    dispatch({ type: HR_GET_BASEPAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_GET_BASEPAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const hrCreateBasePayFunc = (formData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({ type: HR_CREATE_BASEPAY_REQUEST });
    const body = JSON.stringify(formData);
    await axios.post(`/api/basepay`, body, config);
    dispatch({ type: HR_CREATE_BASEPAY_SUCCESS });
    dispatch(hrGetBasePayFunc());
  } catch (error) {
    dispatch({
      type: HR_CREATE_BASEPAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const hrUpdateBasePayFunc =
  (basePayId, formData) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: HR_UPDATE_BASEPAY_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(`/api/basepay/${basePayId}`, body, config);
      dispatch({ type: HR_UPDATE_BASEPAY_BY_ID_SUCCESS });
      dispatch(hrGetBasePayFunc());
      dispatch(hrGetSalaryStepsFunc());
    } catch (error) {
      dispatch({
        type: HR_UPDATE_BASEPAY_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
