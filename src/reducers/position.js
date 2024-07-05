import {
  ADMIN_CREATE_POSITION_FAIL,
  ADMIN_CREATE_POSITION_REQUEST,
  ADMIN_CREATE_POSITION_RESET,
  ADMIN_CREATE_POSITION_SUCCESS,
  ADMIN_DELETE_POSITION_BY_ID_FAIL,
  ADMIN_DELETE_POSITION_BY_ID_REQUEST,
  ADMIN_DELETE_POSITION_BY_ID_RESET,
  ADMIN_DELETE_POSITION_BY_ID_SUCCESS,
  ADMIN_GET_ALL_POSITION_REQUEST,
  ADMIN_GET_ALL_POSITION_FAIL,
  ADMIN_GET_ALL_POSITION_SUCCESS,
  ADMIN_UPDATE_POSITION_BY_ID_FAIL,
  ADMIN_UPDATE_POSITION_BY_ID_REQUEST,
  ADMIN_UPDATE_POSITION_BY_ID_RESET,
  ADMIN_UPDATE_POSITION_BY_ID_SUCCESS,
  ADMIN_GET_ALL_POSITION_RESET,
  ADMIN_CREATE_BULK_POSITION_REQUEST,
  ADMIN_CREATE_BULK_POSITION_SUCCESS,
  ADMIN_CREATE_BULK_POSITION_FAIL,
  ADMIN_CREATE_BULK_POSITION_RESET,
} from "../types/position";

export const adminGetAllPositionReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GET_ALL_POSITION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GET_ALL_POSITION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        positions: payload,
        error: null,
      };

    case ADMIN_GET_ALL_POSITION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GET_ALL_POSITION_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreatePositionReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_POSITION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_POSITION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_POSITION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_POSITION_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateBulkPositionReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_BULK_POSITION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_BULK_POSITION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_BULK_POSITION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_BULK_POSITION_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdatePositionByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_UPDATE_POSITION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_POSITION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_POSITION_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_POSITION_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeletePositionByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_POSITION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_POSITION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_POSITION_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_POSITION_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};
