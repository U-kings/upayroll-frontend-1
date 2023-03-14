import {
  ADMIN_CREATE_MONTHLYPAYHEADS_FAIL,
  ADMIN_CREATE_MONTHLYPAYHEADS_REQUEST,
  ADMIN_CREATE_MONTHLYPAYHEADS_RESET,
  ADMIN_CREATE_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_DELETE_MONTHLYPAYHEADS_FAIL,
  ADMIN_DELETE_MONTHLYPAYHEADS_REQUEST,
  ADMIN_DELETE_MONTHLYPAYHEADS_RESET,
  ADMIN_DELETE_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_GET_MONTHLYPAYHEADS_FAIL,
  ADMIN_GET_MONTHLYPAYHEADS_REQUEST,
  ADMIN_GET_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_UPDATE_MONTHLYPAYHEADS_FAIL,
  ADMIN_UPDATE_MONTHLYPAYHEADS_REQUEST,
  ADMIN_UPDATE_MONTHLYPAYHEADS_RESET,
  ADMIN_UPDATE_MONTHLYPAYHEADS_SUCCESS,
  ADMIN_GET_MONTHLYPAYHEADS_RESET,
} from "../types/monthlypayheads";

export const adminGetAllMonthlyPayheadsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GET_MONTHLYPAYHEADS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GET_MONTHLYPAYHEADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        monthlyPayheads: payload.allMonthlyPayHeads,
        error: null,
      };

    case ADMIN_GET_MONTHLYPAYHEADS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GET_MONTHLYPAYHEADS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateMonthlyPayheadsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_MONTHLYPAYHEADS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_MONTHLYPAYHEADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_MONTHLYPAYHEADS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_MONTHLYPAYHEADS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateMonthlyPayheadsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_UPDATE_MONTHLYPAYHEADS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_MONTHLYPAYHEADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_MONTHLYPAYHEADS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_MONTHLYPAYHEADS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteMonthlyPayheadsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_MONTHLYPAYHEADS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_MONTHLYPAYHEADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_MONTHLYPAYHEADS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_MONTHLYPAYHEADS_RESET:
      return {};

    default:
      return state;
  }
};
