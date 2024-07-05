import axios from "axios";
import cookie from "js-cookie";
import {
  SUPER_ADMIN_DELETE_USER_FAIL,
  SUPER_ADMIN_DELETE_USER_REQUEST,
  SUPER_ADMIN_DELETE_USER_SUCCESS,
  SUPER_ADMIN_GET_ALL_LOGS_FAIL,
  SUPER_ADMIN_GET_ALL_LOGS_REQUEST,
  SUPER_ADMIN_GET_ALL_LOGS_SUCCESS,
  SUPER_ADMIN_GET_ALL_USERS_FAIL,
  SUPER_ADMIN_GET_ALL_USERS_REQUEST,
  SUPER_ADMIN_GET_ALL_USERS_SUCCESS,
  SUPER_ADMIN_UPDATE_USER_FAIL,
  SUPER_ADMIN_UPDATE_USER_REQUEST,
  SUPER_ADMIN_UPDATE_USER_ROLE_FAIL,
  SUPER_ADMIN_UPDATE_USER_ROLE_REQUEST,
  SUPER_ADMIN_UPDATE_USER_ROLE_SUCCESS,
  SUPER_ADMIN_UPDATE_USER_SUCCESS,
} from "../types/users";
import { urlConfig } from "../util/config/config";

export const superAdminGetAllUsers =
  (page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: SUPER_ADMIN_GET_ALL_USERS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/super-admin/users?page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({ type: SUPER_ADMIN_GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUPER_ADMIN_GET_ALL_USERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const superAdminUpdateUser = (formData, userId) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: SUPER_ADMIN_UPDATE_USER_REQUEST });
    const body = JSON.stringify(formData);
    const { data } = await axios.patch(
      `${urlConfig.url.PROXYURL}api/super-admin/${userId}`,
      body,
      config
    );
    dispatch({ type: SUPER_ADMIN_UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUPER_ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const superAdminUpdateUserRole =
  (formData, userId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: SUPER_ADMIN_UPDATE_USER_ROLE_REQUEST });
      const body = JSON.stringify(formData);
      const { data } = await axios.patch(
        `${urlConfig.url.PROXYURL}api/super-admin/update/role/${userId}`,
        body,
        config
      );
      dispatch({ type: SUPER_ADMIN_UPDATE_USER_ROLE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUPER_ADMIN_UPDATE_USER_ROLE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const superAdminDeleteUser = (id) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: SUPER_ADMIN_DELETE_USER_REQUEST });
    // const body = JSON.stringify(formData);
    const { data } = await axios.delete(
      `${urlConfig.url.PROXYURL}api/super-admin/${id}`,
      // body,
      config
    );
    dispatch({ type: SUPER_ADMIN_DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUPER_ADMIN_DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const superAdminBulkDeleteUser = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: SUPER_ADMIN_DELETE_USER_REQUEST });
    const body = JSON.stringify({ usersArr: formData });
    const { data } = await axios.patch(
      `${urlConfig.url.PROXYURL}api/super-admin/delete/bulk-users`,
      body,
      config
    );
    dispatch({ type: SUPER_ADMIN_DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUPER_ADMIN_DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const superAdminGetAllLogs =
  (page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: SUPER_ADMIN_GET_ALL_LOGS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/super-admin/logs?page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({ type: SUPER_ADMIN_GET_ALL_LOGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUPER_ADMIN_GET_ALL_LOGS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
