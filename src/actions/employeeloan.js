import axios from "axios";
import cookie from "js-cookie";
import {
  AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_FAIL,
  AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_REQUEST,
  AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_SUCCESS,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_FAIL,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_REQUEST,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_SUCCESS,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_FAIL,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_REQUEST,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_GET_APPROVED_GENERATED_LOANS_FAIL,
  CEO_GET_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_GET_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_GET_PRE_APPROVED_GENERATED_LOANS_FAIL,
  CEO_GET_PRE_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_GET_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_FAIL,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_SET_APPROVED_GENERATED_LOANS_FAIL,
  CEO_SET_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_SET_APPROVED_GENERATED_LOANS_SUCCESS,
  EMPLOYEE_ASK_FOR_LOAN_FAIL,
  EMPLOYEE_ASK_FOR_LOAN_REQUEST,
  EMPLOYEE_ASK_FOR_LOAN_SUCCESS,
  EMPLOYEE_GET_GENERATED_LOANS_FAIL,
  EMPLOYEE_GET_GENERATED_LOANS_REQUEST,
  EMPLOYEE_GET_GENERATED_LOANS_SUCCESS,
  HR_APPROVES_GENERATED_LOANS_FAIL,
  HR_APPROVES_GENERATED_LOANS_REQUEST,
  HR_APPROVES_GENERATED_LOANS_SUCCESS,
  HR_BULK_DELETE_EMPLOYEE_LOANS_FAIL,
  HR_BULK_DELETE_EMPLOYEE_LOANS_REQUEST,
  HR_BULK_DELETE_EMPLOYEE_LOANS_SUCCESS,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_FAIL,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_REQUEST,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_SUCCESS,
  HR_GET_ALL_GENERATED_LOANS_FAIL,
  HR_GET_ALL_GENERATED_LOANS_REQUEST,
  HR_GET_ALL_GENERATED_LOANS_SUCCESS,
  HR_GET_REJECTED_GENERATED_LOANS_FAIL,
  HR_GET_REJECTED_GENERATED_LOANS_REQUEST,
  HR_GET_REJECTED_GENERATED_LOANS_SUCCESS,
} from "../types/employeeloan";
// import { cookieTokenValidFunc } from "./auth";

import { urlConfig } from "../util/config/config";

export const hrGetGeneratedEmployeeLoansFunc =
  (month = "", type = "") =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (type === "Rejected") {
        // dispatch action
        dispatch(hrGetRejectedEmployeeLoansFunc(month));
      } else {
        dispatch({ type: HR_GET_ALL_GENERATED_LOANS_REQUEST });
        const { data } = await axios.get(
          `${urlConfig.url.PROXYURL}api/employeeloan${month && `?month=${month}`}`,
          config
        );
        dispatch({
          type: HR_GET_ALL_GENERATED_LOANS_SUCCESS,
          payload: data?.allGeneratedLoans,
        });
      }
    } catch (error) {
      dispatch({
        type: HR_GET_ALL_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrApprovesEmployeeRequestLoanFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({
      generatedLoansArr: formData,
    });

    // dispatch(cookieTokenValidFunc());

    try {
      dispatch({ type: HR_APPROVES_GENERATED_LOANS_REQUEST });
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/employeeloan/create/notapproved`,
        body,
        config
      );
      dispatch({ type: HR_APPROVES_GENERATED_LOANS_SUCCESS });
    } catch (error) {
      dispatch({
        type: HR_APPROVES_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrGetRejectedEmployeeLoansFunc = (month) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: HR_GET_REJECTED_GENERATED_LOANS_REQUEST });
    const { data } = await axios.get(
      `${urlConfig.url.PROXYURL}api/employeeloan/rejected?statusLevel=not approved,pre approved&month=${month}`,
      config
    );
    dispatch({
      type: HR_GET_REJECTED_GENERATED_LOANS_SUCCESS,
      payload: data?.rejectedEmployeeLoans,
    });
  } catch (error) {
    dispatch({
      type: HR_GET_REJECTED_GENERATED_LOANS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const auditorGetNotApprovedGeneratedEmployeeLoansFunc =
  (month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/employeeloan/notapproved?month=${month}`,
        config
      );
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_SUCCESS,
        payload: data?.notApprovedEmployeeLoans,
      });
    } catch (error) {
      dispatch({
        type: AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorSetPreApprovedGeneratedEmployeeLoanFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // dispatch(cookieTokenValidFunc());
    const body = JSON.stringify({
      notApprovedEmployeeLoansArr: formData,
    });
    try {
      dispatch({ type: AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_REQUEST });
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/employeeloan/create/preapproved`,
        body,
        config
      );
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const auditorRejectNotApprovedEmployeeLoansFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({
      notApprovedEmployeeLoansArr: formData,
    });

    // dispatch(cookieTokenValidFunc());
    try {
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_REQUEST });
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/employeeloan/reject/notapproved`,
        body,
        config
      );
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_SUCCESS });
    } catch (error) {
      dispatch({
        type: AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoGetPreApprovedGeneratedEmployeeLoansFunc =
  () => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: CEO_GET_PRE_APPROVED_GENERATED_LOANS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/employeeloan/preapproved`,
        config
      );
      dispatch({
        type: CEO_GET_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
        payload: data?.preApprovedEmployeeLoans,
      });
    } catch (error) {
      dispatch({
        type: CEO_GET_PRE_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoGetApprovedGeneratedEmployeeLoansFunc =
  () => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: CEO_GET_APPROVED_GENERATED_LOANS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/employeeloan/approved`,
        config
      );
      dispatch({
        type: CEO_GET_APPROVED_GENERATED_LOANS_SUCCESS,
        payload: data?.approvedEmployeeLoans,
      });
    } catch (error) {
      dispatch({
        type: CEO_GET_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoSetApprovedGeneratedEmployeeLoansFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({
      preApprovedEmployeeLoansArr: formData,
    });
    try {
      dispatch({ type: CEO_SET_APPROVED_GENERATED_LOANS_REQUEST });
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/employeeloan/create/approved`,
        body,
        config
      );
      dispatch({ type: CEO_SET_APPROVED_GENERATED_LOANS_SUCCESS });
    } catch (error) {
      dispatch({
        type: CEO_SET_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const ceoRejectPreApprovedEmployeeLoansFunc =
  (formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify({
      preApprovedEmployeeLoansArr: formData,
    });
    try {
      dispatch({ CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_REQUEST });

      await axios.patch(
        `${urlConfig.url.PROXYURL}api/employeeloan/reject/preapproved`,
        body,
        config
      );
      dispatch({ type: CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_SUCCESS });
    } catch (error) {
      dispatch({
        type: CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrDeleteGeneratedEmployeeLoanById =
  (empLoanId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: HR_DELETE_EMPLOYEE_LOAN_BY_ID_REQUEST });
      await axios.delete(`${urlConfig.url.PROXYURL}api/employeeloan/${empLoanId}`, config);
      dispatch({ type: HR_DELETE_EMPLOYEE_LOAN_BY_ID_SUCCESS });
    } catch (error) {
      dispatch({
        type: HR_DELETE_EMPLOYEE_LOAN_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const hrBulkDeleteGeneratedEmployeeLoans =
  (generatedLoansArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({
      employeeLoansArr: generatedLoansArr,
    });

    try {
      dispatch({ type: HR_BULK_DELETE_EMPLOYEE_LOANS_REQUEST });
      await axios.patch(
        `${urlConfig.url.PROXYURL}api/employeeloan/delete-bulk`,
        body,
        config
      );
      dispatch({ type: HR_BULK_DELETE_EMPLOYEE_LOANS_SUCCESS });
    } catch (error) {
      dispatch({
        type: HR_BULK_DELETE_EMPLOYEE_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const employeeGetAllGeneratedLoansRequestFunc =
  () => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: EMPLOYEE_GET_GENERATED_LOANS_REQUEST });
      const { data } = await axios.get(
        `${urlConfig.url.PROXYURL}api/employeeloan/generated-loans/employee`,
        config
      );
      dispatch({
        type: EMPLOYEE_GET_GENERATED_LOANS_SUCCESS,
        payload: data?.employeeLoans,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_GET_GENERATED_LOANS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const employeeAskForLoanRequestFunc =
  (loanId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify(formData);
    try {
      dispatch({ type: EMPLOYEE_ASK_FOR_LOAN_REQUEST });
      await axios.post(
        `${urlConfig.url.PROXYURL}api/employeeloan/${loanId}/create`,
        body,
        config
      );
      dispatch({ type: EMPLOYEE_ASK_FOR_LOAN_SUCCESS });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_ASK_FOR_LOAN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
