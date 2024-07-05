import axios from "axios";
import cookie from "js-cookie";
import {
  GET_ALL_DEPARTMENTS_FAIL,
  GET_ALL_DEPARTMENTS_REQUEST,
  GET_ALL_DEPARTMENTS_SUCCESS,
  GET_POSITION_BY_DEPARTMENT_FAIL,
  GET_POSITION_BY_DEPARTMENT_REQUEST,
  GET_POSITION_BY_DEPARTMENT_SUCCESS,
  ADMIN_CREATE_DEPARTMENT_FAIL,
  ADMIN_CREATE_DEPARTMENT_REQUEST,
  ADMIN_CREATE_DEPARTMENT_SUCCESS,
  ADMIN_DELETE_DEPARTMENT_BY_ID_FAIL,
  ADMIN_DELETE_DEPARTMENT_BY_ID_REQUEST,
  ADMIN_DELETE_DEPARTMENT_BY_ID_SUCCESS,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_FAIL,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_REQUEST,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_SUCCESS,
} from "../types/department";

// import { cookieTokenValidFunc } from "./auth";

import { urlConfig } from "../util/config/config";

export const getAllDepartment =
  (page = 1, perPage = 2000) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({
        type: GET_ALL_DEPARTMENTS_REQUEST,
      });

      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/departments?page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: GET_ALL_DEPARTMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_DEPARTMENTS_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const getPositionsByDepartment = (id) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: GET_POSITION_BY_DEPARTMENT_REQUEST });
    const { data } = await axios.get(
      `${urlConfig.url.PROXYURL}api/positions/${id}`,
      config
    );
    dispatch({
      type: GET_POSITION_BY_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSITION_BY_DEPARTMENT_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminCreateDepartment = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: ADMIN_CREATE_DEPARTMENT_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`${urlConfig.url.PROXYURL}api/departments`, body, config);
    dispatch({
      type: ADMIN_CREATE_DEPARTMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_DEPARTMENT_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminUpdateDepartmentById =
  (departId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({
        type: ADMIN_UPDATE_DEPARTMENT_BY_ID_REQUEST,
      });
      const body = JSON.stringify(formData);
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/departments/${departId}`,
        body,
        config
      );
      dispatch({
        type: ADMIN_UPDATE_DEPARTMENT_BY_ID_SUCCESS,
      });
      dispatch(getAllDepartment());
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_DEPARTMENT_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteDepartmentById = (departId) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: ADMIN_DELETE_DEPARTMENT_BY_ID_REQUEST,
    });
    await axios.delete(
      `${urlConfig.url.PROXYURL}api/departments/${departId}`,
      config
    );
    dispatch({
      type: ADMIN_DELETE_DEPARTMENT_BY_ID_SUCCESS,
    });
    dispatch(getAllDepartment());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_DEPARTMENT_BY_ID_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
