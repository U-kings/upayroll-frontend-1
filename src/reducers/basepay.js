import {
  HR_GET_BASEPAY_REQUEST,
  HR_GET_BASEPAY_SUCCESS,
  HR_GET_BASEPAY_FAIL,
  // HR_GET_BASEPAY_RESET,
  HR_CREATE_BASEPAY_REQUEST,
  HR_CREATE_BASEPAY_SUCCESS,
  HR_CREATE_BASEPAY_FAIL,
  HR_CREATE_BASEPAY_RESET,
  HR_UPDATE_BASEPAY_BY_ID_REQUEST,
  HR_UPDATE_BASEPAY_BY_ID_SUCCESS,
  HR_UPDATE_BASEPAY_BY_ID_FAIL,
  HR_UPDATE_BASEPAY_BY_ID_RESET,
} from "../types/basepay";

export const hrGetBasePayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_GET_BASEPAY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_GET_BASEPAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        basePays: payload.basePays,
        error: null,
      };

    case HR_GET_BASEPAY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    // case HR_GET_BASEPAY_RESET:
    //   return {};

    default:
      return state;
  }
};

export const hrCreateBasePayReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_CREATE_BASEPAY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HR_CREATE_BASEPAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_BASEPAY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_CREATE_BASEPAY_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUpdateBasePayByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPDATE_BASEPAY_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPDATE_BASEPAY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPDATE_BASEPAY_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_UPDATE_BASEPAY_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
