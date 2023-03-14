import axios from "axios";
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

import { cookieTokenValidFunc } from "./auth";

export const getAllDepartment = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({
      type: GET_ALL_DEPARTMENTS_REQUEST,
    });

    const { data } = await axios.get(`/api/departments`);
    dispatch({
      type: GET_ALL_DEPARTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_DEPARTMENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPositionsByDepartment = (id) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: GET_POSITION_BY_DEPARTMENT_REQUEST });
    const { data } = await axios.get(`/api/positions/${id}`);
    dispatch({
      type: GET_POSITION_BY_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSITION_BY_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminCreateDepartment = (formData) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: ADMIN_CREATE_DEPARTMENT_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`/api/departments`, body, config);
    dispatch({
      type: ADMIN_CREATE_DEPARTMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateDepartmentById =
  (departId, formData) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({
        type: ADMIN_UPDATE_DEPARTMENT_BY_ID_REQUEST,
      });
      const body = JSON.stringify(formData);
      await axios.patch(`/api/departments/${departId}`, body, config);
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
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({
      type: ADMIN_DELETE_DEPARTMENT_BY_ID_REQUEST,
    });
    await axios.delete(`/api/departments/${departId}`);
    dispatch({
      type: ADMIN_DELETE_DEPARTMENT_BY_ID_SUCCESS,
    });
    dispatch(getAllDepartment());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_DEPARTMENT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
