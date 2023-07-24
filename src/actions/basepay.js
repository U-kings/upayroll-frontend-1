import axios from "axios";
import cookie from "js-cookie";
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

// import { cookieTokenValidFunc } from "../actions/auth";
import { hrGetSalaryStepsFunc } from "./salarysteps";

import { urlConfig } from "../util/config/config";

export const hrGetBasePayFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: HR_GET_BASEPAY_REQUEST });
    const { data } = await axios.get(`${urlConfig.proxyUrl.PROXYURL}api/basepay`, config);
    dispatch({ type: HR_GET_BASEPAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HR_GET_BASEPAY_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const hrCreateBasePayFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const companyId = cookie.get("companyId");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: HR_CREATE_BASEPAY_REQUEST });
    const body = JSON.stringify({ ...formData, companyId: companyId });
    await axios.post(`${urlConfig.proxyUrl.PROXYURL}api/basepay`, body, config);
    dispatch({ type: HR_CREATE_BASEPAY_SUCCESS });
    dispatch(hrGetBasePayFunc());
  } catch (error) {
    dispatch({
      type: HR_CREATE_BASEPAY_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const hrUpdateBasePayFunc =
  (basePayId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const companyId = cookie.get("companyId");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: HR_UPDATE_BASEPAY_BY_ID_REQUEST });
      const body = JSON.stringify({ ...formData, companyId: companyId });
      await axios.patch(`${urlConfig.proxyUrl.PROXYURL}api/basepay/${basePayId}`, body, config);
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
