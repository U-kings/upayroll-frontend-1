import axios from "axios";
import cookie from "js-cookie";
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

const proxyUrl = process.env.REACT_APP_PROXY_URL;

export const adminGetAllStaffLevels = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: ADMIN_GET_ALL_STAFFLEVEL_REQUEST,
    });
    const { data } = await axios.get(`${proxyUrl}/api/stafflevel`, config);
    dispatch({ type: ADMIN_GET_ALL_STAFFLEVEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_STAFFLEVEL_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminCreateStaffLevel = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_STAFFLEVEL_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`${proxyUrl}/api/stafflevel`, body, config);
    dispatch({ type: ADMIN_CREATE_STAFFLEVEL_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_STAFFLEVEL_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminUpdateStaffLevel = (formData, id) => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: ADMIN_UPDATE_STAFFLEVEL_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.patch(`${proxyUrl}/api/stafflevel/${id}`, body, config);
    dispatch({ type: ADMIN_UPDATE_STAFFLEVEL_SUCCESS });
    dispatch(adminGetAllStaffLevels());
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_STAFFLEVEL_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminDeleteStaffLevel = (id) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: ADMIN_DELETE_STAFFLEVEL_REQUEST,
    });

    await axios.delete(`${proxyUrl}/api/stafflevel/${id}`, config);
    dispatch({ type: ADMIN_DELETE_STAFFLEVEL_SUCCESS });
    dispatch(adminGetAllStaffLevels());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_STAFFLEVEL_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
