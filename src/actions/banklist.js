import axios from "axios";
import cookie from "js-cookie";
import {
  ACCOUNTANT_CREATE_BANK_FAIL,
  ACCOUNTANT_CREATE_BANK_REQUEST,
  ACCOUNTANT_CREATE_BANK_SUCCESS,
  ACCOUNTANT_UPDATE_BANK_BY_ID_FAIL,
  ACCOUNTANT_UPDATE_BANK_BY_ID_REQUEST,
  ACCOUNTANT_UPDATE_BANK_BY_ID_SUCCESS,
  GET_ALL_BANK_LISTS_FAIL,
  GET_ALL_BANK_LISTS_REQUEST,
  GET_ALL_BANK_LISTS_SUCCESS,
  GET_ALL_BANK_NAMES_FAIL,
  GET_ALL_BANK_NAMES_REQUEST,
  GET_ALL_BANK_NAMES_SUCCESS,
} from "../types/banklist";
// import { cookieTokenValidFunc } from "./auth";
import { urlConfig } from "../util/config/config";

export const getAllBankNamesFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: GET_ALL_BANK_NAMES_REQUEST });
    const { data } = await axios.get(
      `${urlConfig.url.PROXYURL}api/paystack/getbanks`,
      config
    );
    dispatch({ type: GET_ALL_BANK_NAMES_SUCCESS, payload: data?.banks });
  } catch (error) {
    dispatch({
      type: GET_ALL_BANK_NAMES_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminGetAllBanksFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: GET_ALL_BANK_LISTS_REQUEST });
    const { data } = await axios.get(`${urlConfig.url.PROXYURL}api/bank`, config);
    dispatch({ type: GET_ALL_BANK_LISTS_SUCCESS, payload: data?.banks });
  } catch (error) {
    dispatch({
      type: GET_ALL_BANK_LISTS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const accountantCreateBankFunc = (FormData) => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({ type: ACCOUNTANT_CREATE_BANK_REQUEST });
    const body = JSON.stringify(FormData);
    await axios.post(`${urlConfig.url.PROXYURL}api/bank`, body, config);
    dispatch({ type: ACCOUNTANT_CREATE_BANK_SUCCESS });
    dispatch(adminGetAllBanksFunc());
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_CREATE_BANK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const accountantUpdateBankByIdFunc =
  (id, formData) => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: ACCOUNTANT_UPDATE_BANK_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(`${urlConfig.url.PROXYURL}api/bank/${id}`, body, config);
      dispatch({ type: ACCOUNTANT_UPDATE_BANK_BY_ID_SUCCESS });
      dispatch(adminGetAllBanksFunc());
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_UPDATE_BANK_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
