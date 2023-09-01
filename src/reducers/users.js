import {
  SUPER_ADMIN_BULK_DELETE_USERS_FAIL,
  SUPER_ADMIN_BULK_DELETE_USERS_REQUEST,
  SUPER_ADMIN_BULK_DELETE_USERS_RESET,
  SUPER_ADMIN_BULK_DELETE_USERS_SUCCESS,
  SUPER_ADMIN_DELETE_USER_FAIL,
  SUPER_ADMIN_DELETE_USER_REQUEST,
  SUPER_ADMIN_DELETE_USER_RESET,
  SUPER_ADMIN_DELETE_USER_SUCCESS,
  SUPER_ADMIN_GET_ALL_LOGS_FAIL,
  SUPER_ADMIN_GET_ALL_LOGS_REQUEST,
  SUPER_ADMIN_GET_ALL_LOGS_RESET,
  SUPER_ADMIN_GET_ALL_LOGS_SUCCESS,
  SUPER_ADMIN_GET_ALL_USERS_FAIL,
  SUPER_ADMIN_GET_ALL_USERS_REQUEST,
  SUPER_ADMIN_GET_ALL_USERS_RESET,
  SUPER_ADMIN_GET_ALL_USERS_SUCCESS,
  SUPER_ADMIN_UPDATE_USER_FAIL,
  SUPER_ADMIN_UPDATE_USER_REQUEST,
  SUPER_ADMIN_UPDATE_USER_RESET,
  SUPER_ADMIN_UPDATE_USER_ROLE_FAIL,
  SUPER_ADMIN_UPDATE_USER_ROLE_REQUEST,
  SUPER_ADMIN_UPDATE_USER_ROLE_RESET,
  SUPER_ADMIN_UPDATE_USER_ROLE_SUCCESS,
  SUPER_ADMIN_UPDATE_USER_SUCCESS,
} from "../types/users";

export const superAdminGetAllUsersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUPER_ADMIN_GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUPER_ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
        error: null,
      };

    case SUPER_ADMIN_GET_ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SUPER_ADMIN_GET_ALL_USERS_RESET:
      return {};

    default:
      return state;
  }
};
export const superAdminUpdateUserReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUPER_ADMIN_UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUPER_ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.detail,
        error: null,
      };

    case SUPER_ADMIN_UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SUPER_ADMIN_UPDATE_USER_RESET:
      return {};

    default:
      return state;
  }
};
export const superAdminUpdateUserRoleReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUPER_ADMIN_UPDATE_USER_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUPER_ADMIN_UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.detail,
        error: null,
      };

    case SUPER_ADMIN_UPDATE_USER_ROLE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SUPER_ADMIN_UPDATE_USER_ROLE_RESET:
      return {};

    default:
      return state;
  }
};

export const superAdminDeleteUserReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUPER_ADMIN_DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUPER_ADMIN_DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.detail,
        error: null,
      };

    case SUPER_ADMIN_DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SUPER_ADMIN_DELETE_USER_RESET:
      return {};

    default:
      return state;
  }
};

export const superAdminBulkDeleteUsersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUPER_ADMIN_BULK_DELETE_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUPER_ADMIN_BULK_DELETE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.message,
        error: null,
      };

    case SUPER_ADMIN_BULK_DELETE_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SUPER_ADMIN_BULK_DELETE_USERS_RESET:
      return {};

    default:
      return state;
  }
};

export const superAdminGetAllLogsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUPER_ADMIN_GET_ALL_LOGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUPER_ADMIN_GET_ALL_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logs: payload,
        error: null,
      };

    case SUPER_ADMIN_GET_ALL_LOGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SUPER_ADMIN_GET_ALL_LOGS_RESET:
      return {};

    default:
      return state;
  }
};
