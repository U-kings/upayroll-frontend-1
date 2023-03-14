import {
  ADMIN_GET_ALL_ALLOWANCES_FAIL,
  ADMIN_GET_ALL_ALLOWANCES_REQUEST,
  ADMIN_GET_ALL_ALLOWANCES_RESET,
  ADMIN_GET_ALL_ALLOWANCES_SUCCESS,
  ADMIN_CREATE_ALLOWANCE_FAIL,
  ADMIN_CREATE_ALLOWANCE_REQUEST,
  ADMIN_CREATE_ALLOWANCE_RESET,
  ADMIN_CREATE_ALLOWANCE_SUCCESS,
  ADMIN_DELETE_ALLOWANCE_BY_ID_FAIL,
  ADMIN_DELETE_ALLOWANCE_BY_ID_REQUEST,
  ADMIN_DELETE_ALLOWANCE_BY_ID_RESET,
  ADMIN_DELETE_ALLOWANCE_BY_ID_SUCCESS,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_FAIL,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_REQUEST,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_RESET,
  ADMIN_UPDATE_ALLOWANCE_BY_ID_SUCCESS,
} from "../types/allowance";

export const adminGetAllAllowanceReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_GET_ALL_ALLOWANCES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GET_ALL_ALLOWANCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allowances: payload.allowances,
        error: null,
      };

    case ADMIN_GET_ALL_ALLOWANCES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GET_ALL_ALLOWANCES_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateAllowanceReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_CREATE_ALLOWANCE_REQUEST:
      return { ...state, isLoading: true };

    case ADMIN_CREATE_ALLOWANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_ALLOWANCE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_ALLOWANCE_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateAllowanceByIdReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_UPDATE_ALLOWANCE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_ALLOWANCE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_ALLOWANCE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_ALLOWANCE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteAllowanceByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_ALLOWANCE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_ALLOWANCE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_ALLOWANCE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_ALLOWANCE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
