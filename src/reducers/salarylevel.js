import {
  HR_GET_SALARYLEVEL_REQUEST,
  HR_GET_SALARYLEVEL_SUCCESS,
  HR_GET_SALARYLEVEL_FAIL,
  HR_GET_SALARYLEVEL_RESET,
  HR_CREATE_SALARYLEVEL_REQUEST,
  HR_CREATE_SALARYLEVEL_SUCCESS,
  HR_CREATE_SALARYLEVEL_FAIL,
  HR_CREATE_SALARYLEVEL_RESET,
  HR_UPDATE_SALARYLEVEL_BY_ID_REQUEST,
  HR_UPDATE_SALARYLEVEL_BY_ID_SUCCESS,
  HR_UPDATE_SALARYLEVEL_BY_ID_FAIL,
  HR_UPDATE_SALARYLEVEL_BY_ID_RESET,
  HR_DELETE_SALARYLEVEL_BY_ID_REQUEST,
  HR_DELETE_SALARYLEVEL_BY_ID_SUCCESS,
  HR_DELETE_SALARYLEVEL_BY_ID_FAIL,
  HR_DELETE_SALARYLEVEL_BY_ID_RESET,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_FAIL,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_REQUEST,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_RESET,
  HR_GET_SALARYLEVEL_BY_SALARYGRADE_SUCCESS,
} from "../types/salarylevel";

export const hrGetSalaryLevelReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_GET_SALARYLEVEL_REQUEST:
    case HR_GET_SALARYLEVEL_BY_SALARYGRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_GET_SALARYLEVEL_SUCCESS:
    case HR_GET_SALARYLEVEL_BY_SALARYGRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        salaryLevels: payload.salaryLevels,
        error: null,
      };

    case HR_GET_SALARYLEVEL_FAIL:
    case HR_GET_SALARYLEVEL_BY_SALARYGRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_GET_SALARYLEVEL_RESET:
    case HR_GET_SALARYLEVEL_BY_SALARYGRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateSalaryLevelReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_CREATE_SALARYLEVEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HR_CREATE_SALARYLEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_SALARYLEVEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_CREATE_SALARYLEVEL_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateSalaryLevelByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_SALARYLEVEL_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_SALARYLEVEL_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_SALARYLEVEL_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_SALARYLEVEL_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const hrDeleteSalaryLevelByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_DELETE_SALARYLEVEL_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_DELETE_SALARYLEVEL_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_DELETE_SALARYLEVEL_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_DELETE_SALARYLEVEL_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
