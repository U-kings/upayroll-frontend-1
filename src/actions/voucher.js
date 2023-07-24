import axios from "axios";
import cookie from "js-cookie";
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
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_REQUEST,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_SUCCESS,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_FAIL,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_REQUEST,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_SUCCESS,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_FAIL,
} from "../types/voucher";
// import { cookieTokenValidFunc } from "./auth";

import { urlConfig } from "../util/config/config";

export const accountGetApprovedVouchersFunc =
  (month, type = "", page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (type === "Rejected") {
      // dispatch rejected vouchers func
      dispatch(accountantGetRejectedVouchers(month));
    } else {
      try {
        dispatch({ type: ACCOUNTANT_GET_APPROVED_VOUCHERS_REQUEST });
        const { data } = await axios.get(
          `${urlConfig.proxyUrl.PROXYURL}api/vouchers/approved?month=${month}&page=${page}&perPage=${perPage}`,
          config
        );
        dispatch({
          type: ACCOUNTANT_GET_APPROVED_VOUCHERS_SUCCESS,
          payload: data,
          // payload: data?.approved,
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

export const accountantGetRejectedVouchers =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ACCOUNTANT_GET_REJECTED_VOUCHERS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/rejected?month=${month}&statusLevel=not approved,pre approved&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: ACCOUNTANT_GET_REJECTED_VOUCHERS_SUCCESS,
        payload: data,
        // payload: data.rejectedBankVouchers,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_GET_REJECTED_VOUCHERS_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const accountantCreateNotApprovedVouchersFunc =
  (approvedSalaryslips) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
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
      await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/create/notapproved`,
        body,
        config
      );
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
export const accountantCreateNotApprovedVouchersAllFunc =
  (month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_REQUEST,
      });
      const body = JSON.stringify({
        // approvedSalaryslipsArr: approvedSalaryslips,
      });
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/create/notapproved/all?month=${month}`,
        body,
        config
      );
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorGetnotApprovedVouchersFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: AUDITOR_GET_NOT_APPROVED_VOUCHERS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/notapproved?month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_VOUCHERS_SUCCESS,
        payload: data,
        // payload: data.notapproved,
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
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: AUDITOR_PRE_APPROVE_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        notApprovedBankVouchersArrIds: vouchersArr,
      });

      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/create/preapproved`,
        body,
        config
      );
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

export const auditorPreApprovedVouchersAllFunc =
  (month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: AUDITOR_PRE_APPROVE_VOUCHERS_ALL_REQUEST });
      const body = JSON.stringify({
        // notApprovedBankVouchersArrIds: vouchersArr,
      });

      const { data } = await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/create/preapproved/all?month=${month}`,
        body,
        config
      );
      dispatch({
        type: AUDITOR_PRE_APPROVE_VOUCHERS_ALL_SUCCESS,
        payload: data,
      });
      dispatch(auditorGetnotApprovedVouchersFunc(month));
    } catch (error) {
      dispatch({
        type: AUDITOR_PRE_APPROVE_VOUCHERS_ALL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoGetPreApprovedVouchersFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: CEO_GET_PRE_APPROVED_VOUCHERS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/preapproved?month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: CEO_GET_PRE_APPROVED_VOUCHERS_SUCCESS,
        payload: data,
        // payload: data?.preapproved,
      });
    } catch (error) {
      dispatch({
        type: CEO_GET_PRE_APPROVED_VOUCHERS_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const ceoApprovedVouchersFunc =
  (vouchersArr, month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        preApprovedBankVouchersArrIds: vouchersArr,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/create/approved`,
        body,
        config
      );
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

export const ceoApprovedVouchersAllFunc = (month) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_REQUEST });
    const body = JSON.stringify({
      // preApprovedBankVouchersArrIds: vouchersArr,
    });
    const { data } = await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/vouchers/create/approved/all?month=${month}`,
      body,
      config
    );
    dispatch({
      type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_SUCCESS,
      payload: data,
    });
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
  (vouchersArrWithComment, month, companyId, userRole) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        bankVouchersArr: vouchersArrWithComment,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/reject/notapproved?companyId=${companyId}&role=${userRole}`,
        body,
        config
      );
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
  (vouchersArrWithComment, month, companyId, userRole) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: CEO_REJECT_PRE_APPROVED_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        bankVouchersArr: vouchersArrWithComment,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/reject/preapproved?companyId=${companyId}&role=${userRole}`,
        body,
        config
      );
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
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: ACCOUNTANT_DELETE_VOUCHER_BY_ID_REQUEST });
      await axios.delete(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/${voucherId}`,
        config
      );
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
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: ACCOUNTANT_DELETE_BULK_VOUCHERS_REQUEST });
      const body = JSON.stringify({
        bankVoucherArrIds: voucherArrs,
      });

      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/vouchers/delete-bulk`,
        body,
        config
      );
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
