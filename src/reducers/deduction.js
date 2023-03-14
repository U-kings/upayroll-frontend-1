import {
  ADMIN_GET_ALL_DEDUCTIONS_FAIL,
  ADMIN_GET_ALL_DEDUCTIONS_REQUEST,
  ADMIN_GET_ALL_DEDUCTIONS_RESET,
  ADMIN_GET_ALL_DEDUCTIONS_SUCCESS,
  ADMIN_CREATE_DEDUCTION_FAIL,
  ADMIN_CREATE_DEDUCTION_REQUEST,
  ADMIN_CREATE_DEDUCTION_RESET,
  ADMIN_CREATE_DEDUCTION_SUCCESS,
  ADMIN_DELETE_DEDUCTION_BY_ID_FAIL,
  ADMIN_DELETE_DEDUCTION_BY_ID_REQUEST,
  ADMIN_DELETE_DEDUCTION_BY_ID_RESET,
  ADMIN_DELETE_DEDUCTION_BY_ID_SUCCESS,
  ADMIN_UPDATE_DEDUCTION_BY_ID_FAIL,
  ADMIN_UPDATE_DEDUCTION_BY_ID_REQUEST,
  ADMIN_UPDATE_DEDUCTION_BY_ID_RESET,
  ADMIN_UPDATE_DEDUCTION_BY_ID_SUCCESS,
} from "../types/deduction";

export const adminGetAllDeductionReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_GET_ALL_DEDUCTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GET_ALL_DEDUCTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deductions: payload.deductions,
        error: null,
      };

    case ADMIN_GET_ALL_DEDUCTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GET_ALL_DEDUCTIONS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateDeductionReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_DEDUCTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_CREATE_DEDUCTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_DEDUCTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_DEDUCTION_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateDeductionByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_UPDATE_DEDUCTION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_DEDUCTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_DEDUCTION_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_DEDUCTION_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteDeductionByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_DEDUCTION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_DEDUCTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_DEDUCTION_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_DEDUCTION_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
