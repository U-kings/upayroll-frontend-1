import axios from "axios";
import cookie from "js-cookie";
import {
  GENERATE_PAYSLIP_FAIL,
  GENERATE_PAYSLIP_SUCCESS,
  GENERATE_PAYSLIP_REQUEST,
  GET_ALL_GENERATED_PAYSLIP_FAIL,
  GET_ALL_GENERATED_PAYSLIP_SUCCESS,
  GET_ALL_GENERATED_PAYSLIP_REQUEST,
  DELETE_GENERATED_PAYSLIP_BY_ID_FAIL,
  DELETE_GENERATED_PAYSLIP_BY_ID_REQUEST,
  DELETE_GENERATED_PAYSLIP_BY_ID_SUCCESS,
  ADMIN_GENERATE_BULK_PAYSLIPS_FAIL,
  ADMIN_GENERATE_BULK_PAYSLIPS_REQUEST,
  ADMIN_GENERATE_BULK_PAYSLIPS_SUCCESS,
  ADMIN_DELETE_BULK_PAYSLIPS_FAIL,
  ADMIN_DELETE_BULK_PAYSLIPS_REQUEST,
  ADMIN_DELETE_BULK_PAYSLIPS_SUCCESS,
  HR_GET_REJECTED_PAYSLIPS_FAIL,
  HR_GET_REJECTED_PAYSLIPS_REQUEST,
  HR_GET_REJECTED_PAYSLIPS_SUCCESS,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_FAIL,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_REQUEST,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_SUCCESS,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_FAIL,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_REQUEST,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_SUCCESS,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_FAIL,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_REQUEST,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_SUCCESS,
  CEO_GET_APPROVED_SALARYSLIPS_FAIL,
  CEO_GET_APPROVED_SALARYSLIPS_REQUEST,
  CEO_GET_APPROVED_SALARYSLIPS_SUCCESS,
  CEO_GET_PRE_APPROVED_SALARYSLIPS_FAIL,
  CEO_GET_PRE_APPROVED_SALARYSLIPS_REQUEST,
  CEO_GET_PRE_APPROVED_SALARYSLIPS_SUCCESS,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_FAIL,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_REQUEST,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_SUCCESS,
  ACCOUNTANT_GET_APPROVED_SALARYSLIPS_FAIL,
  ACCOUNTANT_GET_APPROVED_SALARYSLIPS_REQUEST,
  ACCOUNTANT_GET_APPROVED_SALARYSLIPS_SUCCESS,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_REQUEST,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_FAIL,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_SUCCESS,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_FAIL,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_REQUEST,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_SUCCESS,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_FAIL,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_REQUEST,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_SUCCESS,
  ADMIN_GENERATE_BULK_PAYSLIPS_ALL_REQUEST,
  ADMIN_GENERATE_BULK_PAYSLIPS_ALL_SUCCESS,
  ADMIN_GENERATE_BULK_PAYSLIPS_ALL_FAIL,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_ALL_REQUEST,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_ALL_SUCCESS,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_ALL_FAIL,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_ALL_REQUEST,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_ALL_SUCCESS,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_ALL_FAIL,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_ALL_REQUEST,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_ALL_SUCCESS,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_ALL_FAIL,
} from "../types/payslip";

import { urlConfig } from "../util/config/config";

export const adminGetAllGeneratedPayslips =
  (month, type = "", page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (type === "Rejected") {
      dispatch(hrGetRejectedPayslipsFunc(month));
    } else {
      try {
        dispatch({ type: GET_ALL_GENERATED_PAYSLIP_REQUEST });
        const { data } = await axios.get(
          `${urlConfig.proxyUrl.PROXYURL}api/payslips/generatedslips?month=${month}&page=${page}&perPage=${perPage}`,
          config
        );
        dispatch({ type: GET_ALL_GENERATED_PAYSLIP_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_ALL_GENERATED_PAYSLIP_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    }
  };

export const hrGetRejectedPayslipsFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({
        type: HR_GET_REJECTED_PAYSLIPS_REQUEST,
      });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/rejected?statusLevel=not approved,pre approved&month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: HR_GET_REJECTED_PAYSLIPS_SUCCESS,
        payload: data,
        // payload: { paySlips: data?.rejectedPaySlips },
      });
    } catch (error) {
      dispatch({
        type: HR_GET_REJECTED_PAYSLIPS_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const hrSetToNotApprovedSalaryslips =
  (salarySlipsIds, month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        paySlipsArr: salarySlipsIds,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/create/notapproved`,
        body,
        config
      );
      dispatch({ type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_SUCCESS });
      dispatch(adminGetAllGeneratedPayslips(month));
    } catch (error) {
      dispatch({
        type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrSetToNotApprovedSalaryslipsAll =
  // (salarySlipsIds, month) => async (dispatch) => {
  (month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_ALL_REQUEST });
      const body = JSON.stringify({
        // paySlipsArr: salarySlipsIds,
      });
      const { data } = await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/create/notapproved/all?month=${month}`,
        body,
        config
      );
      dispatch({
        type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_ALL_SUCCESS,
        payload: data,
      });
      dispatch(adminGetAllGeneratedPayslips(month));
    } catch (error) {
      dispatch({
        type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_ALL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoGetApprovedSalaryslipsFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: CEO_GET_APPROVED_SALARYSLIPS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/approved?month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: CEO_GET_APPROVED_SALARYSLIPS_SUCCESS,
        payload: data,
        // payload: data.approvedSalaryslips,
      });
    } catch (error) {
      dispatch({
        type: CEO_GET_APPROVED_SALARYSLIPS_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const ceoGetPreApprovedSalaryslipsFunc =
  (month, type = "", page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (type === "Approved") {
      // dispatch approved func
      dispatch(ceoGetApprovedSalaryslipsFunc(month, page, perPage));
    } else {
      try {
        dispatch({ type: CEO_GET_PRE_APPROVED_SALARYSLIPS_REQUEST });
        const { data } = await axios.get(
          `${urlConfig.proxyUrl.PROXYURL}api/payslips/preapproved?month=${month}&page=${page}&perPage=${perPage}`,
          config
        );
        dispatch({
          type: CEO_GET_PRE_APPROVED_SALARYSLIPS_SUCCESS,
          payload: data,
          // payload: data.preapproved,
        });
      } catch (error) {
        dispatch({
          type: CEO_GET_PRE_APPROVED_SALARYSLIPS_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    }
  };

export const ceoSetApprovedSalaryslipsFunc =
  (salarySlipsIds, month) => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        paySlipsArr: salarySlipsIds,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/create/approved`,
        body,
        config
      );
      dispatch({ type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_SUCCESS });
      dispatch(ceoGetPreApprovedSalaryslipsFunc(month));
    } catch (error) {
      dispatch({
        type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoSetApprovedSalaryslipsAllFunc = (month) => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_ALL_REQUEST });
    const body = JSON.stringify({
      // paySlipsArr: salarySlipsIds,
    });
    const { data } = await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/payslips/create/approved/all?month=${month}`,
      body,
      config
    );
    dispatch({
      type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_ALL_SUCCESS,
      payload: data,
    });
    dispatch(ceoGetPreApprovedSalaryslipsFunc(month));
  } catch (error) {
    dispatch({
      type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_ALL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const accountantGetApprovedSalaryslispFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({
        type: ACCOUNTANT_GET_APPROVED_SALARYSLIPS_REQUEST,
      });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/approved?month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: ACCOUNTANT_GET_APPROVED_SALARYSLIPS_SUCCESS,
        payload: data,
        // payload: data.approvedSalaryslips,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTANT_GET_APPROVED_SALARYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorGetNotApprovedSalaryslipsFunc =
  (month, page = 1, perPage = 100) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/notapproved?month=${month}&page=${page}&perPage=${perPage}`,
        config
      );
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_SUCCESS,
        payload: data,
        // payload: data,
      });
    } catch (error) {
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorRejectNotApprovedPayslipsFunc =
  (salaryArrIdswithComments, month, companyId, userRole) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        paySlipsArr: salaryArrIdswithComments,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/reject/notapproved?companyId=${companyId}&role=${userRole}`,
        body,
        config
      );
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_SUCCESS });
      dispatch(auditorGetNotApprovedSalaryslipsFunc(month));
    } catch (error) {
      dispatch({
        type: AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorAndCeoRejectExcelPayslipsFunc =
  (salaryArrIdswithComments, salarySlips, type, month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        rejectedSlipsArr: salaryArrIdswithComments,
        paySlipsArr: salarySlips,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/reject/excelbulk?type=${type}`,
        body,
        config
      );
      dispatch({ type: AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_SUCCESS });
      if (type.toLowerCase() === "not approved") {
        dispatch(auditorGetNotApprovedSalaryslipsFunc(month));
      } else {
        dispatch(ceoGetPreApprovedSalaryslipsFunc(month, "pre approved"));
      }
    } catch (error) {
      dispatch({
        type: AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoRejectPreApprovedPayslipsFunc =
  (salaryArrIdswithComments, month, companyId, userRole) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: CEO_REJECT_PRE_APPROVED_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        paySlipsArr: salaryArrIdswithComments,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/reject/preapproved?companyId=${companyId}?role=${userRole}`,
        body,
        config
      );
      dispatch({
        type: CEO_REJECT_PRE_APPROVED_PAYSLIPS_SUCCESS,
      });
      dispatch(ceoGetPreApprovedSalaryslipsFunc(month));
    } catch (error) {
      dispatch({
        type: CEO_REJECT_PRE_APPROVED_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminGeneratePayslip =
  (slipData, employeeId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: GENERATE_PAYSLIP_REQUEST });
      const body = JSON.stringify(slipData);
      await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/generate/slip/${employeeId}`,
        body,
        config
      );
      dispatch({
        type: GENERATE_PAYSLIP_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: GENERATE_PAYSLIP_FAIL,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const adminGenerateBulkPayslips = (bulkSlips) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_GENERATE_BULK_PAYSLIPS_REQUEST });
    const body = JSON.stringify({
      paySlipsArr: bulkSlips,
    });
    await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/payslips/generate-bulk`,
      body,
      config
    );
    dispatch({ type: ADMIN_GENERATE_BULK_PAYSLIPS_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_GENERATE_BULK_PAYSLIPS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminGenerateBulkPayslipsAll = (month) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_GENERATE_BULK_PAYSLIPS_ALL_REQUEST });
    const body = JSON.stringify({
      // paySlipsArr: bulkSlips,
    });
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/payslips/generate-bulk/all?month=${month}`,
      body,
      config
    );
    dispatch({ type: ADMIN_GENERATE_BULK_PAYSLIPS_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GENERATE_BULK_PAYSLIPS_ALL_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminDeleteGeneratedPayslip =
  (slipId, month, type = "") =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: DELETE_GENERATED_PAYSLIP_BY_ID_REQUEST });
      await axios.delete(`${urlConfig.proxyUrl.PROXYURL}api/payslips/${slipId}`, config);
      dispatch({ type: DELETE_GENERATED_PAYSLIP_BY_ID_SUCCESS });
      dispatch(adminGetAllGeneratedPayslips(month, type));
    } catch (error) {
      dispatch({
        type: DELETE_GENERATED_PAYSLIP_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteBulkPayslips =
  (paySlipIds, month, type = "") =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: ADMIN_DELETE_BULK_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        paySlipsArrIds: paySlipIds,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/delete-bulk`,
        body,
        config
      );
      dispatch({ type: ADMIN_DELETE_BULK_PAYSLIPS_SUCCESS });
      dispatch(adminGetAllGeneratedPayslips(month, type));
    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_BULK_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorSetPreApprovedPayslipsFunc =
  (salarySlipsIds, month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_REQUEST });
      const body = JSON.stringify({
        paySlipsArr: salarySlipsIds,
      });
      await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/create/preapproved`,
        body,
        config
      );
      dispatch({ type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_SUCCESS });
      dispatch(auditorGetNotApprovedSalaryslipsFunc(month));
    } catch (error) {
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorSetPreApprovedPayslipsAllFunc =
  (month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_ALL_REQUEST,
      });
      const body = JSON.stringify({
        // paySlipsArr: salarySlipsIds,
      });
      const { data } = await axios.patch(
        `${urlConfig.proxyUrl.PROXYURL}api/payslips/create/preapproved/all?month=${month}`,
        body,
        config
      );
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_ALL_SUCCESS,
        payload: data,
      });
      dispatch(auditorGetNotApprovedSalaryslipsFunc(month));
    } catch (error) {
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_ALL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
