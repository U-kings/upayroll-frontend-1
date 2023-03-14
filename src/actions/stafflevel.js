import axios from "axios";
import {
  ADMIN_CREATE_STAFFLEVEL_FAIL,
  ADMIN_CREATE_STAFFLEVEL_REQUEST,
  ADMIN_CREATE_STAFFLEVEL_SUCCESS,
  ADMIN_GET_ALL_STAFFLEVEL_FAIL,
  ADMIN_GET_ALL_STAFFLEVEL_REQUEST,
  ADMIN_GET_ALL_STAFFLEVEL_SUCCESS,
  ADMIN_UPDATE_STAFFLEVEL_FAIL,
  ADMIN_UPDATE_STAFFLEVEL_REQUEST,
  ADMIN_UPDATE_STAFFLEVEL_SUCCESS,
  ADMIN_DELETE_STAFFLEVEL_FAIL,
  ADMIN_DELETE_STAFFLEVEL_REQUEST,
  ADMIN_DELETE_STAFFLEVEL_SUCCESS,
} from "../types/stafflevel";
import { cookieTokenValidFunc } from "./auth";

export const adminGetAllStaffLevels = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_ALL_STAFFLEVEL_REQUEST,
    });
    const { data } = await axios.get(`/api/stafflevel`);
    dispatch({ type: ADMIN_GET_ALL_STAFFLEVEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_STAFFLEVEL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminCreateStaffLevel = (formData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_STAFFLEVEL_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`/api/stafflevel`, body, config);
    dispatch({ type: ADMIN_CREATE_STAFFLEVEL_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_STAFFLEVEL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateStaffLevel = (formData, id) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    dispatch({
      type: ADMIN_UPDATE_STAFFLEVEL_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.patch(`/api/stafflevel/${id}`, body, config);
    dispatch({ type: ADMIN_UPDATE_STAFFLEVEL_SUCCESS });
    dispatch(adminGetAllStaffLevels());
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_STAFFLEVEL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminDeleteStaffLevel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_STAFFLEVEL_REQUEST,
    });

    await axios.delete(`/api/stafflevel/${id}`);
    dispatch({ type: ADMIN_DELETE_STAFFLEVEL_SUCCESS });
    dispatch(adminGetAllStaffLevels());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_STAFFLEVEL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
