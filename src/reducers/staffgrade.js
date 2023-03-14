import {
  HR_GET_STAFFGRADE_REQUEST,
  HR_GET_STAFFGRADE_SUCCESS,
  HR_GET_STAFFGRADE_FAIL,
  HR_GET_STAFFGRADE_RESET,
  HR_CREATE_STAFFGRADE_REQUEST,
  HR_CREATE_STAFFGRADE_SUCCESS,
  HR_CREATE_STAFFGRADE_FAIL,
  HR_CREATE_STAFFGRADE_RESET,
  HR_UPDATE_STAFFGRADE_BY_ID_REQUEST,
  HR_UPDATE_STAFFGRADE_BY_ID_SUCCESS,
  HR_UPDATE_STAFFGRADE_BY_ID_FAIL,
  HR_UPDATE_STAFFGRADE_BY_ID_RESET,
  HR_DELETE_STAFFGRADE_BY_ID_REQUEST,
  HR_DELETE_STAFFGRADE_BY_ID_SUCCESS,
  HR_DELETE_STAFFGRADE_BY_ID_FAIL,
  HR_DELETE_STAFFGRADE_BY_ID_RESET,
} from "../types/staffgrade";

export const hrGetStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_GET_STAFFGRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_GET_STAFFGRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        salaryGrades: payload.salaryGrades,
        error: null,
      };

    case HR_GET_STAFFGRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_GET_STAFFGRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_CREATE_STAFFGRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HR_CREATE_STAFFGRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_STAFFGRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_CREATE_STAFFGRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateStaffGradeByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_STAFFGRADE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_STAFFGRADE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_STAFFGRADE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_STAFFGRADE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const hrDeleteStaffGradeByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_DELETE_STAFFGRADE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_DELETE_STAFFGRADE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_DELETE_STAFFGRADE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_DELETE_STAFFGRADE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
