import {
  ADMIN_CREATE_STAFFLEVEL_FAIL,
  ADMIN_CREATE_STAFFLEVEL_REQUEST,
  ADMIN_CREATE_STAFFLEVEL_SUCCESS,
  ADMIN_CREATE_STAFFLEVEL_RESET,
  ADMIN_GET_ALL_STAFFLEVEL_FAIL,
  ADMIN_GET_ALL_STAFFLEVEL_REQUEST,
  ADMIN_GET_ALL_STAFFLEVEL_SUCCESS,
  ADMIN_UPDATE_STAFFLEVEL_FAIL,
  ADMIN_UPDATE_STAFFLEVEL_REQUEST,
  ADMIN_UPDATE_STAFFLEVEL_RESET,
  ADMIN_UPDATE_STAFFLEVEL_SUCCESS,
  ADMIN_DELETE_STAFFLEVEL_FAIL,
  ADMIN_DELETE_STAFFLEVEL_REQUEST,
  ADMIN_DELETE_STAFFLEVEL_SUCCESS,
  ADMIN_DELETE_STAFFLEVEL_RESET,
  ADMIN_GET_ALL_STAFFLEVEL_RESET,
} from "../types/stafflevel";

export const adminGetAllStafflevelReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GET_ALL_STAFFLEVEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GET_ALL_STAFFLEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffLevels: payload.staffLevels,
        error: null,
      };

    case ADMIN_GET_ALL_STAFFLEVEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GET_ALL_STAFFLEVEL_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateStaffLevelReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_STAFFLEVEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_STAFFLEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_STAFFLEVEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_STAFFLEVEL_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateStaffLevelReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_UPDATE_STAFFLEVEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_STAFFLEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_STAFFLEVEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_STAFFLEVEL_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteStaffLevelReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_STAFFLEVEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_STAFFLEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_STAFFLEVEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_STAFFLEVEL_RESET:
      return {};

    default:
      return state;
  }
};
