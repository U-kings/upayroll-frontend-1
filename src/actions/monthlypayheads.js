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
import axios from "axios";
import { cookieTokenValidFunc } from "./auth";

export const adminGetAllMonthlyPayheads = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  try {
    dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_REQUEST });
    const { data } = await axios.get(`/api/monthlypayhead`);
    dispatch({ type: ADMIN_GET_MONTHLYPAYHEADS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_MONTHLYPAYHEADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminCreateMonthlyPayhead = (formData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_REQUEST });
    const body = JSON.stringify(formData);
    await axios.post(`/api/monthlypayhead`, body, config);
    dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_MONTHLYPAYHEADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateMonthlyPayheadById =
  (id, formData) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: ADMIN_UPDATE_MONTHLYPAYHEADS_REQUEST });
      const body = JSON.stringify(formData);
      await axios.patch(`/api/monthlypayhead/${id}`, body, config);
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
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: ADMIN_DELETE_MONTHLYPAYHEADS_REQUEST });

    await axios.delete(`/api/monthlypayhead/${id}`);
    dispatch({ type: ADMIN_DELETE_MONTHLYPAYHEADS_SUCCESS });
    dispatch(adminGetAllMonthlyPayheads());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_MONTHLYPAYHEADS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
