import axios from "axios";
import cookie from "js-cookie";
import {
  ADMIN_CREATE_MONTHLYPAYHEADS_FAIL,
  ADMIN_CREATE_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_CREATE_MONTHLYPAYHEADS_REQUEST,
  ADMIN_DELETE_MONTHLYPAYHEADS_FAIL,
  ADMIN_DELETE_MONTHLYPAYHEADS_REQUEST,
  ADMIN_DELETE_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_UPDATE_MONTHLYPAYHEADS_FAIL,
  ADMIN_UPDATE_MONTHLYPAYHEADS_REQUEST,
  ADMIN_UPDATE_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_GET_MONTHLYPAYHEADS_FAIL,
  ADMIN_GET_MONTHLYPAYHEADS_REQUEST,
  ADMIN_GET_MONTHLYPAYHEADS_SUCCESS,
} from "../types/monthlypayheads";
// import { cookieTokenValidFunc } from "./auth";

const proxyUrl = process.env.REACT_APP_PROXY_URL;

export const adminGetAllMonthlyPayheads = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_REQUEST });
    const { data } = await axios.get(`${proxyUrl}/api/monthlypayhead`, config);
    dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_MONTHLYPAYHEADS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminCreateMonthlyPayhead = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_REQUEST });
    const body = JSON.stringify(formData);
    await axios.post(`${proxyUrl}/api/monthlypayhead`, body, config);
    dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_MONTHLYPAYHEADS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminUpdateMonthlyPayheadById =
  (id, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: ADMIN_UPDATE_MONTHLYPAYHEADS_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(`${proxyUrl}/api/monthlypayhead/${id}`, body, config);
      dispatch({ type: ADMIN_UPDATE_MONTHLYPAYHEADS_SUCCESS });
      dispatch(adminGetAllMonthlyPayheads());
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_MONTHLYPAYHEADS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteMonthlyPayheadById = (id) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: ADMIN_DELETE_MONTHLYPAYHEADS_REQUEST });
    await axios.delete(`${proxyUrl}/api/monthlypayhead/${id}`, config);
    dispatch({ type: ADMIN_DELETE_MONTHLYPAYHEADS_SUCCESS });
    dispatch(adminGetAllMonthlyPayheads());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_MONTHLYPAYHEADS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
