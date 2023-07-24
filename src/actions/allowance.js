import axios from "axios";
import cookie from "js-cookie";
import { urlConfig } from "../util/config/config";
import {
  ADMIN_GET_ALL_ALLOWANCES_FAIL,
  ADMIN_GET_ALL_ALLOWANCES_SUCCESS,
  ADMIN_GET_ALL_ALLOWANCES_REQUEST,
  ADMIN_CREATE_ALLOWANCE_FAIL,
  ADMIN_CREATE_ALLOWANCE_REQUEST,
  ADMIN_CREATE_ALLOWANCE_SUCCESS,
  ADMIN_DELETE_ALLOWANCE_BY_ID_FAIL,
  ADMIN_DELETE_ALLOWANCE_BY_ID_SUCCESS,
  ADMIN_DELETE_ALLOWANCE_BY_ID_REQUEST,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_FAIL,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_REQUEST,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_SUCCESS,
} from "../types/allowance";


// import { urlConfig } from "../util/config/config";

export const adminGetAllAllowance = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_GET_ALL_ALLOWANCES_REQUEST });
    const { data } = await axios.get(`${urlConfig.proxyUrl.PROXYURL}api/allowances`, config);
    dispatch({ type: ADMIN_GET_ALL_ALLOWANCES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_ALLOWANCES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminCreateAllowance = (formdata) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: ADMIN_CREATE_ALLOWANCE_REQUEST,
    });
    const body = JSON.stringify(formdata);
    await axios.post(`${urlConfig.proxyUrl.PROXYURL}api/allowances`, body, config);
    dispatch({
      type: ADMIN_CREATE_ALLOWANCE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_ALLOWANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateAllowanceById =
  (allowanceId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({
        type: ADMIN_UPDATE_ALLOWANCE_BY_ID_REQUEST,
      });
      const body = JSON.stringify(formData);
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/allowances/${allowanceId}`,
        body,
        config
      );
      dispatch({
        type: ADMIN_UPDATE_ALLOWANCE_BY_ID_SUCCESS,
      });
      dispatch(adminGetAllAllowance());
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_ALLOWANCE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteAllowanceById = (allowanceId) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: ADMIN_DELETE_ALLOWANCE_BY_ID_REQUEST,
    });
    await axios.delete(`${urlConfig.proxyUrl.PROXYURL}api/allowances/${allowanceId}`, config);
    dispatch({
      type: ADMIN_DELETE_ALLOWANCE_BY_ID_SUCCESS,
    });
    dispatch(adminGetAllAllowance());
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_ALLOWANCE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
