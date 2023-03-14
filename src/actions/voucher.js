import axios from "axios";
import {
  ACCOUNTANT_GET_APPROVED_VOUCHERS_FAIL,
  ACCOUNTANT_GET_APPROVED_VOUCHERS_REQUEST,
  ACCOUNTANT_GET_APPROVED_VOUCHERS_SUCCESS,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_FAIL,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_REQUEST,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_SUCCESS,
  ACCOUNTANT_GET_REJECTED_VOUCHERS_FAIL,
  ACCOUNTANT_GET_REJECTED_VOUCHERS_REQUEST,
  ACCOUNTANT_GET_REJECTED_VOUCHERS_SUCCESS,
  AUDITOR_GET_NOT_APPROVED_VOUCHERS_FAIL,
  AUDITOR_GET_NOT_APPROVED_VOUCHERS_REQUEST,
  AUDITOR_GET_NOT_APPROVED_VOUCHERS_SUCCESS,
  AUDITOR_PRE_APPROVE_VOUCHERS_FAIL,
  AUDITOR_PRE_APPROVE_VOUCHERS_REQUEST,
  AUDITOR_PRE_APPROVE_VOUCHERS_SUCCESS,
  CEO_GET_PRE_APPROVED_VOUCHERS_FAIL,
  CEO_GET_PRE_APPROVED_VOUCHERS_REQUEST,
  CEO_GET_PRE_APPROVED_VOUCHERS_SUCCESS,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_FAIL,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_REQUEST,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_SUCCESS,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_FAIL,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_REQUEST,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_SUCCESS,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_FAIL,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_REQUEST,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_SUCCESS,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_SUCCESS,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_REQUEST,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_FAIL,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_FAIL,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_REQUEST,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_SUCCESS,
} from "../types/voucher";
import { cookieTokenValidFunc } from "./auth";

export const accountGetApprovedVouchersFunc =
  (month, type = "") =>
  async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    if (type === "Rejected") {
      // dispatch rejected vouchers func
      dispatch(accountantGetRejectedVouchers(month));
    } else {
      try {
        dispatch({ type: ACCOUNTANT_GET_APPROVED_VOUCHERS_REQUEST });
        const { data } = await axios.get(
          `/api/vouchers/approved?month=${month}`
        );
        dispatch({
          type: ACCOUNTANT_GET_APPROVED_VOUCHERS_SUCCESS,
          payload: data?.approved,
        });
      } catch (error) {
        dispatch({
          type: ACCOUNTANT_GET_APPROVED_VOUCHERS_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    }
  };

export const accountantGetRejectedVouchers = (month) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNTANT_GET_REJECTED_VOUCHERS_REQUEST });
    const { data } = await axios.get(
      `/api/vouchers/rejected?month=${month}&statusLevel=not approved,pre approved`
    );
    dispatch({
      type: ACCOUNTANT_GET_REJECTED_VOUCHERS_SUCCESS,
      payload: data.rejectedBankVouchers,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTANT_GET_REJECTED_VOUCHERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const accountantCreateNotApprovedVouchersFunc =
  (approvedSalaryslips) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_REQUEST,
      });
      const body = JSON.stringify({
        approvedSalaryslipsArr: approvedSalaryslips,
      });
      await axios.post(`/api/vouchers/create/notapproved`, body, config);
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorGetnotApprovedVouchersFunc =
  (month) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    try {
      dispatch({ type: AUDITOR_GET_NOT_APPROVED_VOUCHERS_REQUEST });
      const { data } = await axios.get(
        `/api/vouchers/notapproved?month=${month}`
      );
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_VOUCHERS_SUCCESS,
        payload: data.notapproved,
      });
    } catch (error) {
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorPreApprovedVouchersFunc =
  (vouchersArr, month) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: AUDITOR_PRE_APPROVE_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        notApprovedBankVouchersArrIds: vouchersArr,
      });

      await axios.patch(`/api/vouchers/create/preapproved`, body, config);
      dispatch({ type: AUDITOR_PRE_APPROVE_VOUCHERS_SUCCESS });
      dispatch(auditorGetnotApprovedVouchersFunc(month));
    } catch (error) {
      dispatch({
        type: AUDITOR_PRE_APPROVE_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoGetPreApprovedVouchersFunc = (month) => async (dispatch) => {
  dispatch(cookieTokenValidFunc());

  try {
    dispatch({ type: CEO_GET_PRE_APPROVED_VOUCHERS_REQUEST });
    const { data } = await axios.get(
      `/api/vouchers/preapproved?month=${month}`
    );
    dispatch({
      type: CEO_GET_PRE_APPROVED_VOUCHERS_SUCCESS,
      payload: data?.preapproved,
    });
  } catch (error) {
    dispatch({
      type: CEO_GET_PRE_APPROVED_VOUCHERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const ceoApprovedVouchersFunc =
  (vouchersArr, month) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        preApprovedBankVouchersArrIds: vouchersArr,
      });
      await axios.patch(`/api/vouchers/create/approved`, body, config);
      dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_SUCCESS });
      dispatch(ceoGetPreApprovedVouchersFunc(month));
    } catch (error) {
      dispatch({
        type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorRejectNotApprovedVouchersFunc =
  (vouchersArrWithComment, month) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        bankVouchersArr: vouchersArrWithComment,
      });
      await axios.patch(`/api/vouchers/reject/notapproved`, body, config);
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_SUCCESS });
      dispatch(auditorGetnotApprovedVouchersFunc(month));
    } catch (error) {
      dispatch({
        type: AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoRejectPreApprovedVouchersFunc =
  (vouchersArrWithComment, month) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: CEO_REJECT_PRE_APPROVED_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        bankVouchersArr: vouchersArrWithComment,
      });
      await axios.patch(`/api/vouchers/reject/preapproved`, body, config);
      dispatch({ type: CEO_REJECT_PRE_APPROVED_VOUCHERS_SUCCESS });
      dispatch(ceoGetPreApprovedVouchersFunc(month));
    } catch (error) {
      dispatch({
        type: CEO_REJECT_PRE_APPROVED_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const accountantDeleteVoucherByIdFunc =
  (voucherId, month, type) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());

    try {
      dispatch({ type: ACCOUNTANT_DELETE_VOUCHER_BY_ID_REQUEST });
      await axios.delete(`/api/vouchers/${voucherId}`);
      dispatch({
        type: ACCOUNTANT_DELETE_VOUCHER_BY_ID_SUCCESS,
      });
      dispatch(accountGetApprovedVouchersFunc(month, type));
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_DELETE_VOUCHER_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const accountantDeleteBulkVoucherFunc =
  (voucherArrs, month, type) => async (dispatch) => {
    dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: ACCOUNTANT_DELETE_BULK_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        bankVoucherArrIds: voucherArrs,
      });

      await axios.patch(`/api/vouchers/delete-bulk`, body, config);
      dispatch({
        type: ACCOUNTANT_DELETE_BULK_VOUCHERS_SUCCESS,
      });
      dispatch(accountGetApprovedVouchersFunc(month, type));
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_DELETE_BULK_VOUCHERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
