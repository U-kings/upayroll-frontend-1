import axios from "axios";
import {
  HR_CREATE_LOAN_FAIL,
  HR_CREATE_LOAN_REQUEST,
  HR_CREATE_LOAN_SUCCESS,
  HR_DELETE_LOAN_REQUEST,
  HR_DELETE_LOAN_FAIL,
  HR_DELETE_LOAN_SUCCESS,
  HR_GET_ALL_LOAN_FAIL,
  HR_GET_ALL_LOAN_REQUEST,
  HR_GET_ALL_LOAN_SUCCESS,
  HR_UPDATE_LOAN_FAIL,
  HR_UPDATE_LOAN_REQUEST,
  HR_UPDATE_LOAN_SUCCESS,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_FAIL,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_REQUEST,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_SUCCESS,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_FAIL,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_REQUEST,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_SUCCESS,
} from "../types/loan";
import { cookieTokenValidFunc } from "../actions/auth";

export const hrGetAllLoansFunc = () => async (dispatch) => {
  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: HR_GET_ALL_LOAN_REQUEST });
    const { data } = await axios.get(`/api/loan`);
    dispatch({ type: HR_GET_ALL_LOAN_SUCCESS, payload: data.loans });
  } catch (error) {
    dispatch({
      type: HR_GET_ALL_LOAN_FAIL,
      payload:
        error.response && error.response?.data?.detail
          ? error.response?.data?.detail
          : error.message,
    });
  }
};

export const hrCreateLoanFunc = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch(cookieTokenValidFunc());

  try {
    dispatch({ type: HR_CREATE_LOAN_REQUEST });
    const body = JSON.stringify(formData);
    await axios.post(`/api/loan`, body, config);
    dispatch({
      type: HR_CREATE_LOAN_SUCCESS,
    });
    dispatch(hrGetAllLoansFunc());
  } catch (error) {
    dispatch({
      type: HR_CREATE_LOAN_FAIL,
      payload:
        error.response && error.response?.data?.detail
          ? error.response?.data?.detail
          : error.message,
    });
  }
};

export const hrUpdateLoanFunc = (loanId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch(cookieTokenValidFunc());
  const body = JSON.stringify(formData);
  try {
    dispatch({ type: HR_UPDATE_LOAN_REQUEST });
    await axios.patch(`/api/loan/${loanId}`, body, config);
    dispatch({ type: HR_UPDATE_LOAN_SUCCESS });
    dispatch(hrGetAllLoansFunc());
  } catch (error) {
    dispatch({
      type: HR_UPDATE_LOAN_FAIL,
      payload:
        error.response && error.response?.data?.detail
          ? error.response?.data?.detail
          : error.message,
    });
  }
};

export const hrDeleteLoanFunc = (loanId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch(cookieTokenValidFunc());
  try {
    dispatch({ type: HR_DELETE_LOAN_REQUEST });
    await axios.delete(`/api/loan/${loanId}`, config);
    dispatch({ type: HR_DELETE_LOAN_SUCCESS });
    dispatch(hrGetAllLoansFunc());
  } catch (error) {
    dispatch({
      type: HR_DELETE_LOAN_FAIL,
      payload:
        error.response && error.response?.data?.detail
          ? error.response?.data?.detail
          : error.message,
    });
  }
};

export const hrUpdateRepaymentPercentFunc = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(cookieTokenValidFunc());
  const body = JSON.stringify(formData);

  try {
    dispatch({ type: HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_REQUEST });
    await axios.patch(`/api/loan/update-repayment-percentage`, body, config);
    dispatch({ type: HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_FAIL,
      payload:
        error.response && error.response?.data?.detail
          ? error.response?.data?.detail
          : error.message,
    });
  }
};

export const hrUpdateManagementCarAmountFunc =
  (loanId, formData) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(cookieTokenValidFunc());
    const body = JSON.stringify(formData);
    try {
      dispatch({ type: HR_UPDATE_MANAGEMENT_CAR_LOAN_REQUEST });
      await axios.patch(
        `/api/loan/${loanId}/update-management-car-loan`,
        body,
        config
      );

      dispatch({ type: HR_UPDATE_MANAGEMENT_CAR_LOAN_SUCCESS });
      dispatch(hrGetAllLoansFunc());
    } catch (error) {
      dispatch({
        type: HR_UPDATE_MANAGEMENT_CAR_LOAN_FAIL,
        payload:
          error.response && error.response?.data?.detail
            ? error.response?.data?.detail
            : error.message,
      });
    }
  };
