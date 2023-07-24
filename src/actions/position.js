import axios from "axios";
import cookie from "js-cookie";
import {
  ADMIN_CREATE_BULK_POSITION_FAIL,
  ADMIN_CREATE_BULK_POSITION_REQUEST,
  ADMIN_CREATE_BULK_POSITION_SUCCESS,
  ADMIN_CREATE_POSITION_FAIL,
  ADMIN_CREATE_POSITION_REQUEST,
  ADMIN_CREATE_POSITION_SUCCESS,
  ADMIN_DELETE_POSITION_BY_ID_FAIL,
  ADMIN_DELETE_POSITION_BY_ID_REQUEST,
  ADMIN_DELETE_POSITION_BY_ID_SUCCESS,
  ADMIN_GET_ALL_POSITION_FAIL,
  ADMIN_GET_ALL_POSITION_REQUEST,
  ADMIN_GET_ALL_POSITION_SUCCESS,
  ADMIN_UPDATE_POSITION_BY_ID_FAIL,
  ADMIN_UPDATE_POSITION_BY_ID_REQUEST,
  ADMIN_UPDATE_POSITION_BY_ID_SUCCESS,
} from "../types/position";

import { urlConfig } from "../util/config/config";

export const adminGetAllPosition =
  (page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_GET_ALL_POSITION_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/positions?page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({ type: ADMIN_GET_ALL_POSITION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_GET_ALL_POSITION_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const adminCreatePosition = (departId, formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_POSITION_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/positions/${departId}/create`,
      body,
      config
    );
    dispatch({
      type: ADMIN_CREATE_POSITION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_POSITION_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminCreateBulkPosition = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_BULK_POSITION_REQUEST,
    });
    const body = formData;
    await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/positions/create-bulk`,
      body,
      config
    );
    dispatch({
      type: ADMIN_CREATE_BULK_POSITION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_BULK_POSITION_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminUpdatePositionById =
  (postId, departId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({
        type: ADMIN_UPDATE_POSITION_BY_ID_REQUEST,
      });
      const body = JSON.stringify(formData);
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/positions/${postId}/${departId}/update`,
        body,
        config
      );
      dispatch({
        type: ADMIN_UPDATE_POSITION_BY_ID_SUCCESS,
      });
      dispatch(adminGetAllPosition());
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_POSITION_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeletePositionById = (postId) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: ADMIN_DELETE_POSITION_BY_ID_REQUEST,
    });
    await axios.delete(`${urlConfig.proxyUrl.PROXYURL}api/positions/${postId}`, config);
    dispatch({
      type: ADMIN_DELETE_POSITION_BY_ID_SUCCESS,
    });
    dispatch(adminGetAllPosition());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_POSITION_BY_ID_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
