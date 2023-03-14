import axios from "axios";
import {
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
import { cookieTokenValidFunc } from "./auth";

export const adminGetAllPosition = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  try {
    dispatch({ type: ADMIN_GET_ALL_POSITION_REQUEST });
    const { data } = await axios.get(`/api/positions`);
    dispatch({ type: ADMIN_GET_ALL_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_POSITION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminCreatePosition = (departId, formData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_POSITION_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`/api/positions/${departId}/create`, body, config);
    dispatch({
      type: ADMIN_CREATE_POSITION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_POSITION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdatePositionById =
  (postId, departId, formData) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({
        type: ADMIN_UPDATE_POSITION_BY_ID_REQUEST,
      });
      const body = JSON.stringify(formData);
      await axios.patch(
        `/api/positions/${postId}/${departId}/update`,
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
  dispatch(cookieTokenValidFunc());

  try {
    dispatch({
      type: ADMIN_DELETE_POSITION_BY_ID_REQUEST,
    });
    await axios.delete(`/api/positions/${postId}`);
    dispatch({
      type: ADMIN_DELETE_POSITION_BY_ID_SUCCESS,
    });
    dispatch(adminGetAllPosition());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_POSITION_BY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
