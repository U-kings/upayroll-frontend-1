import axios from "axios";
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
} from "../types/banklist";
import { cookieTokenValidFunc } from "./auth";

export const adminGetAllBanksFunc = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: GET_ALL_BANK_LISTS_REQUEST });
    const { data } = await axios.get(`/api/bank`);
    dispatch({ type: GET_ALL_BANK_LISTS_SUCCESS, payload: data.banks });
  } catch (error) {
    dispatch({
      type: GET_ALL_BANK_LISTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const accountantCreateBankFunc = (FormData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({ type: ACCOUNTANT_CREATE_BANK_REQUEST });
    const body = JSON.stringify(FormData);
    await axios.post(`/api/bank`, body, config);
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
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: ACCOUNTANT_UPDATE_BANK_BY_ID_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(`/api/bank/${id}`, body, config);
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
