import axios from "axios";
import cookie from "js-cookie";
import {
  ACCOUNTANT_CREATE_BANKSCHEDULE_FAIL,
  ACCOUNTANT_CREATE_BANKSCHEDULE_REQUEST,
  ACCOUNTANT_CREATE_BANKSCHEDULE_SUCCESS,
  ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_FAIL,
  ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_REQUEST,
  ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_SUCCESS,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_REQUEST,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_FAIL,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_SUCCESS,
  ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_FAIL,
  ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_REQUEST,
  ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_SUCCESS,
  CEO_APPROVE_BANKSCHEDULES_FAIL,
  CEO_APPROVE_BANKSCHEDULES_SUCCESS,
  CEO_APPROVE_BANKSCHEDULES_REQUEST,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_FAIL,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_REQUEST,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_SUCCESS,
} from "../types/bankschedules";
// import { cookieTokenValidFunc } from "./auth";
import { accountGetApprovedVouchersFunc } from "./voucher";

import { urlConfig } from "../util/config/config";

export const ceoGetNotApprovedBankSchedulesFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: CEO_GET_NOT_APPROVED_BANKSCHEDULES_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/bankschedule/notapproved?month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: CEO_GET_NOT_APPROVED_BANKSCHEDULES_SUCCESS,
        payload: data,
        // payload: data.notApprovedBankSchedules,
      });
    } catch (error) {
      dispatch({
        type: CEO_GET_NOT_APPROVED_BANKSCHEDULES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoApproveBankSchedulesFunc =
  (notApprovedBankSchedules, month) => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: CEO_APPROVE_BANKSCHEDULES_REQUEST });
      const body = JSON.stringify({
        notApprovedBankSchedulesArr: notApprovedBankSchedules,
      });
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/bankschedule/approve`,
        body,
        config
      );
      dispatch({
        type: CEO_APPROVE_BANKSCHEDULES_SUCCESS,
      });
      dispatch(ceoGetNotApprovedBankSchedulesFunc(month));
    } catch (error) {
      dispatch({
        type: CEO_APPROVE_BANKSCHEDULES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const accountantGetApprovedScheduleVouchersFunc =
  () => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/vouchers/approved-asschedule`,
        config
      );
      dispatch({
        type: ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_SUCCESS,
        payload: data.approvedVouchersAsSchedule,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const accountantCreateBankscheduleFunc =
  (approvedVoucherArrs, bankName, paymentType, month, scheduleData) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: ACCOUNTANT_CREATE_BANKSCHEDULE_REQUEST });
      const body = JSON.stringify({
        approvedVouchers: approvedVoucherArrs,
        scheduleData: scheduleData,
      });
      await axios.post(
        `${urlConfig.url.PROXYURL}api/bankschedule?bankName=${bankName}&paymentType=${paymentType}`,
        body,
        config
      );
      dispatch({ type: ACCOUNTANT_CREATE_BANKSCHEDULE_SUCCESS });
      dispatch(accountGetApprovedVouchersFunc(month, "Approved"));
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_CREATE_BANKSCHEDULE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const accountantCreateBankscheduleAllFunc =
  ( bankName, paymentType, month, scheduleData) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: ACCOUNTANT_CREATE_BANKSCHEDULE_REQUEST });
      const body = JSON.stringify({
        // approvedVouchers: approvedVoucherArrs,
        scheduleData: scheduleData,
      });
      await axios.post(
        `${urlConfig.url.PROXYURL}api/bankschedule/all?month=${month}&bankName=${bankName}&paymentType=${paymentType}`,
        body,
        config
      );
      dispatch({ type: ACCOUNTANT_CREATE_BANKSCHEDULE_SUCCESS });
      dispatch(accountGetApprovedVouchersFunc(month, "Approved"));
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_CREATE_BANKSCHEDULE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const accountantGetMonthlyBankschedulesFunc =
  (bankName = "", page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/bankschedule${
          bankName
            ? `?bankName=${bankName}&page=${page}&perPage=${perPage}`
            : `?page=${page}&perPage=${perPage}`
        }`,
        config
      );
      dispatch({
        type: ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_SUCCESS,
        payload: data,
        // payload: data?.bankSchedules,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const accountantDeleteBankscheduleByIdFunc =
  (id, bankName) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_REQUEST });
      await axios.delete(`${urlConfig.url.PROXYURL}api/bankschedule/${id}`, config);
      dispatch({ type: ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_SUCCESS });
      dispatch(accountantGetMonthlyBankschedulesFunc(bankName));
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
