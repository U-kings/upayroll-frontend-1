import axios from "axios";
import cookie from "js-cookie";
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

const proxyUrl = process.env.REACT_APP_PROXY_URL;

export const hrGetAllLoansFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: HR_GET_ALL_LOAN_REQUEST });
    const { data } = await axios.get(`${proxyUrl}/api/loan`, config);
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
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: HR_CREATE_LOAN_REQUEST });
    const body = JSON.stringify(formData);
    await axios.post(`${proxyUrl}/api/loan`, body, config);
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
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // dispatch(cookieTokenValidFunc());
  const body = JSON.stringify(formData);
  try {
    dispatch({ type: HR_UPDATE_LOAN_REQUEST });
    await axios.patch(`${proxyUrl}/api/loan/${loanId}`, body, config);
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
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: HR_DELETE_LOAN_REQUEST });
    await axios.delete(`${proxyUrl}/api/loan/${loanId}`, config);
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
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const body = JSON.stringify(formData);

  try {
    dispatch({ type: HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_REQUEST });
    await axios.patch(
      `${proxyUrl}/api/loan/update-repayment-percentage`,
      body,
      config
    );
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
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify(formData);
    try {
      dispatch({ type: HR_UPDATE_MANAGEMENT_CAR_LOAN_REQUEST });
      await axios.patch(
        `${proxyUrl}/api/loan/${loanId}/update-management-car-loan`,
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
