import {
  HR_CREATE_LOAN_FAIL,
  HR_CREATE_LOAN_REQUEST,
  HR_CREATE_LOAN_RESET,
  HR_CREATE_LOAN_SUCCESS,
  HR_DELETE_LOAN_FAIL,
  HR_DELETE_LOAN_REQUEST,
  HR_DELETE_LOAN_RESET,
  HR_DELETE_LOAN_SUCCESS,
  HR_GET_ALL_LOAN_FAIL,
  HR_GET_ALL_LOAN_REQUEST,
  HR_GET_ALL_LOAN_SUCCESS,
  HR_UPDATE_LOAN_FAIL,
  HR_UPDATE_LOAN_REQUEST,
  HR_UPDATE_LOAN_RESET,
  HR_UPDATE_LOAN_SUCCESS,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_FAIL,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_REQUEST,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_RESET,
  HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_SUCCESS,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_FAIL,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_REQUEST,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_RESET,
  HR_UPDATE_MANAGEMENT_CAR_LOAN_SUCCESS,
} from "../types/loan";

export const hrGetAllLoansReducer = (state = {}, action) => {
  const { type, payload } = state;

  switch (type) {
    case HR_GET_ALL_LOAN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_GET_ALL_LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loans: payload,
      };

    case HR_GET_ALL_LOAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const hrCreateLoanReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_CREATE_LOAN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_CREATE_LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_LOAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_CREATE_LOAN_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateLoanReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_LOAN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_LOAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_LOAN_RESET:
      return {};

    default:
      return state;
  }
};

export const hrDeleteLoanReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_DELETE_LOAN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_DELETE_LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_DELETE_LOAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_DELETE_LOAN_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateRepaymentPercentageReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_ALL_LOANS_REPAYMENT_PERCENTAGE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateManagementCarAmountReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_MANAGEMENT_CAR_LOAN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_MANAGEMENT_CAR_LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_MANAGEMENT_CAR_LOAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_MANAGEMENT_CAR_LOAN_RESET:
      return {};

    default:
      return state;
  }
};
