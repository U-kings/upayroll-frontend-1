import {
  HR_GET_STEPS_REQUEST,
  HR_GET_STEPS_SUCCESS,
  HR_GET_STEPS_FAIL,
  HR_GET_STEPS_RESET,
  HR_CREATE_STEPS_REQUEST,
  HR_CREATE_STEPS_SUCCESS,
  HR_CREATE_STEPS_FAIL,
  HR_CREATE_STEPS_RESET,
  HR_UPDATE_STEPS_BY_ID_REQUEST,
  HR_UPDATE_STEPS_BY_ID_SUCCESS,
  HR_UPDATE_STEPS_BY_ID_FAIL,
  HR_UPDATE_STEPS_BY_ID_RESET,
  HR_DELETE_STEPS_BY_ID_REQUEST,
  HR_DELETE_STEPS_BY_ID_SUCCESS,
  HR_DELETE_STEPS_BY_ID_FAIL,
  HR_DELETE_STEPS_BY_ID_RESET,
  HR_GET_STEPS_BY_SALARYLEVEL_FAIL,
  HR_GET_STEPS_BY_SALARYLEVEL_REQUEST,
  HR_GET_STEPS_BY_SALARYLEVEL_RESET,
  HR_GET_STEPS_BY_SALARYLEVEL_SUCCESS,
} from "../types/salarysteps";

export const hrGetStepsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_GET_STEPS_REQUEST:
    case HR_GET_STEPS_BY_SALARYLEVEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_GET_STEPS_SUCCESS:
    case HR_GET_STEPS_BY_SALARYLEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        salarySteps: payload.salarySteps,
        error: null,
      };

    case HR_GET_STEPS_FAIL:
    case HR_GET_STEPS_BY_SALARYLEVEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_GET_STEPS_RESET:
    case HR_GET_STEPS_BY_SALARYLEVEL_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateStepsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_CREATE_STEPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HR_CREATE_STEPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_STEPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_CREATE_STEPS_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateStepsByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_STEPS_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_STEPS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_STEPS_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_STEPS_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const hrDeleteStepsByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_DELETE_STEPS_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_DELETE_STEPS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_DELETE_STEPS_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_DELETE_STEPS_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
